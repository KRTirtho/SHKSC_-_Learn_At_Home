import mongoose from "mongoose";
import { ApolloServer } from "apollo-server";
import Packer from "./GraphQL/index"
import config from "./config"
import jwtHelpers from "./helpers/jwt.helper";


mongoose.connect(config.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
    if(err){
         console.log("Mongoose Error:", err)
         throw err
        }
    console.log("mongo connection established to DB: SHKSC")
})

// Deprecation bypass
mongoose.set( 'useCreateIndex', true)
mongoose.set( 'useFindAndModify', false)

const server = new ApolloServer({
    typeDefs: Packer.typeDefs,
    resolvers: Packer.resolvers,
    async context({req}){
    
    try {
        const {authorization} = req.headers
        const accessToken = authorization?.split(" ")[1]
        const verifyAccessToken = await jwtHelpers.verifyAccessToken(accessToken)
        if(verifyAccessToken){
            return {
                isAuthenticated: true,
                refresh: false,
                user: verifyAccessToken
            }
        }
        
    } catch (error) {
        console.log('AUTHORIZATION ERROR: ', error.message)
        // If expired then we check the refresh token and generate a new access token
        const refresh = req.headers.refresh
        const refreshToken = refresh?.split(" ")[1]
        console.log(refresh)
        
        if(error.message==="jwt expired" && refresh && refreshToken){
            
            try {
                const verifyRefreshToken = await jwtHelpers.verifyRefreshToken(refreshToken)
                
                if(verifyRefreshToken){
                    return {
                        isAuthenticated: false,
                        refresh: true,
                        user: verifyRefreshToken
                    }
                }
                
            } catch (error) {
                // This time we finally give an error result
                return {
                    isAuthenticated: false,
                    refresh: false,
                    user: null
                }
            }
        }
        else if(error.message==="jwt expired" && !refresh && !refreshToken){
            console.log("NO REFRESH TOKEN")
            
            return {
                isAuthenticated: false,
                refresh: false,
                user: null,
                expired: true
            }
        }
        else{
            return {
                isAuthenticated: false,
                refresh: false,
                user: null
            }
        }
    }
    
}})

server.listen(4000).then(({url})=>{
    console.log("Server Started on Port "+url)
}).catch(err=>console.log("ServerError: ", err))
