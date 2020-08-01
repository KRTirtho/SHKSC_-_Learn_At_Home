import jwt from "jsonwebtoken"
import config from "../config"

const jwtHelpers = {
    generateAccessToken: (payload)=>{
        return new Promise((resolve, reject)=>{
            if(!payload)reject(new TypeError("No payload passed in the argument"))
            try {
                const token = jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {expiresIn: "1h"})
                return resolve(token)
            } catch (error) {
                return reject(error)
            }
        })
    },
    verifyAccessToken: (token)=>{
        return new Promise((resolve, reject)=>{
            if(!token)reject(new TypeError("No token provided"))
            try {
                const match = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
                if(match){
                    return resolve(match)
                }
            } catch (error) {
                return reject(error)
            }
        })
    },
    generateRefreshToken: (payload)=>{
        return new Promise((resolve, reject)=>{
            if(!payload)reject(new TypeError("No payload provided"))
            try {
                const refreshToken = jwt.sign(payload, config.REFRESH_TOKEN_SECRET, {expiresIn: "1y"})
                if(refreshToken){
                    return resolve(refreshToken)
                }
            } catch (error) {
                reject(error)
            }
        })
    },
    verifyRefreshToken: (refreshToken)=>{
        return new Promise((resolve, reject)=>{
            if(!refreshToken)reject(new TypeError("No refreshToken provided"))
            try {
                const match = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);
                if(match){
                    return resolve(match)
                }
            } catch (error) {
                return reject(error)
            }
        })
    }
}
export default jwtHelpers