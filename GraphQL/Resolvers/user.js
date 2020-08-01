import User from "../../Model/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { AuthenticationError } from "apollo-server"
import config from "../../config"
import fs from "fs"
import jwtHelpers from "../../helpers/jwt.helper"

export const signUp = async (_, args)=>{
    // Checking for the user if it exists....
    const existUser = await User.findOne({ email: args.user.email }).select("email").exec()
    if (existUser)
        throw new Error("User with the provided email already exists")
    const hashed = await bcrypt.hash(args.user.password, 12)
    const newUser = new User({
        ...args.user,
        password: hashed
    })
    try {
        const user = await newUser.save()
        if (!user)
            throw new Error("Failed to create User")
        // Signing new auth token
        const tokenPayload = {_id: user.id, email: user.email}
        
        const accessToken = await jwtHelpers.generateAccessToken(tokenPayload)
        const refreshToken = await jwtHelpers.generateRefreshToken(tokenPayload)

        return { ...user._doc, password: null, tokens:{ accessToken, refreshToken } }
    }
    catch (err) {
        console.error("SIGNUP ERROR: ", err)
        throw err
    }
        }

/* For Development Purpose */
export const queryUser = async (_, __, {isAuthenticated})=>{
    if(!isAuthenticated)throw new AuthenticationError("Unauthorized")
        try {
        const user = await User.find().exec()
        return user
    }
    catch (err) {
        throw err
    }
    
}

export const login = async (_, args)=>{
    console.log(args)
    try {
        const user = await User.findOne({ email: args.credentials.email }).exec()
        if (!user)
            throw new Error("User Doesn't exist")
        try {
            const isSame = await bcrypt.compare(args.credentials.password, user.password)
            if (!isSame)
                throw new Error("Password doesn't match ")
            // If matches then simply sign jwt
            const tokenPayload = {_id: user.id, email: user.email}
        
            const accessToken = await jwtHelpers.generateAccessToken(tokenPayload)
            const refreshToken = await jwtHelpers.generateRefreshToken(tokenPayload)
            
            return { ...user._doc, tokens: {accessToken, refreshToken}, password: null }
        }
        catch (err) {
            console.error("LOGIN ERROR: ", err)
            throw err
        }
    }
    catch (err_1) {
        console.error("LOGIN ERROR: ", err_1)
        throw err_1
    }
}

export const authorize = (_, __, context)=>{
    
    if(context.isAuthenticated){
        return User.findById(context.user._id).select("-password").exec()
                .then(user=>{
                    if(!user)throw new Error("Failed to authorize use. No user found")
                    return {login:true, credentials:  {...user._doc}}
                })
                .catch(err=>{throw err})
            }
    else if(context.refresh){
        return User.findById(context.user._id).select("-password").exec()
        .then(async user=>{
            if(!user)throw new Error("Failed to authorize use. No user found")
            try {
                const tokenPayload = {_id: user.id, email: user.email}
                
                const accessToken = await jwtHelpers.generateAccessToken(tokenPayload)
                const refreshToken = await jwtHelpers.generateRefreshToken(tokenPayload)
                
                return {login:true, credentials:  {...user._doc}, tokens: {accessToken, refreshToken}}
            } catch (error) {
                throw error
            }
        })
        .catch(err=>{throw err})
                
    }
    else if(!context.refresh && context.expired){
        return {
            login: false,
            expired: true
        }
    }
    else {
        return {login: false}
    }
}

export const setAvatar = (_, {file}, context)=>{
    if(context.isAuthenticated || true){
        console.log(file)
        file.createReadStream(fileData=>{
            const newFile = fs.createWriteStream("./"+file.filename, {encoding: "binary"})           

            fs.writeFile(newFile, fileData, {encoding: "binary"})
        })
        
        return {
            mimetype: "img/png",
            size: 20039
        }
    }
}