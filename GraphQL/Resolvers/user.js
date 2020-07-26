import User from "../../Model/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { AuthenticationError } from "apollo-server"

export const signUp = (_, args)=>{
    return bcrypt.hash(args.user.password, 12).then(hashed=>{
        const newUser = new User({
            ...args.user,
            password: hashed
        })
        return newUser.save().then(user=>{
            if(!user)throw new Error("Failed to create User")
            return {...user._doc, password: null, token: "test"}
        })
        .catch(err=>{
            console.error("SIGNUP ERROR: ", err)
            throw err
        })
    })
}

/* For Development Purpose */
export const queryUser = (_, __, {isAuthenticated})=>{
    if(!isAuthenticated)throw new AuthenticationError("Unauthorized")
        return User.find().exec()
        .then(user=>{
            return user;
        })
        .catch(err=>{
            throw err
        })
    
}

export const login = (_, args)=>{
    return User.findOne({email: args.credentials.email}).exec()
        .then(user=>{
            if(!user)throw new Error("User Doesn't exist")
            // Compare Hashed password
            return bcrypt.compare(args.credentials.password, user.password)
                .then(isSame=>{
                    if(!isSame)throw new Error("Password doesn't match ")
                    // If matches then simply sign jwt
                    const token = jwt.sign({_id: user.id, email: user.email}, "SECRETFORDEVELOPMENT", {expiresIn: "10h"})
                    return {...user._doc, token, password: null}
                })
                .catch(err=>{
                    console.error("LOGIN ERROR: ", err)
                    throw err
                })
            })
        .catch(err=>{
            console.error("LOGIN ERROR: ", err)
            throw err
        })
}

export const authorize = (_, args, context)=>{
    if(context.isAuthenticated){
        return User.findById(context.user._id).select("-password").exec()
                .then(user=>{
                    if(!user)throw new Error("Failed to authorize use. No user found")
                    return {login:true, credentials:  {...user._doc}}
                })
                .catch(err=>{throw err})
    }
    else {
        return {login: false}
    }
}