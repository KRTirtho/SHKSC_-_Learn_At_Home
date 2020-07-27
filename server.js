import mongoose from "mongoose";
import { ApolloServer } from "apollo-server";
import jwt from "jsonwebtoken";
import Packer from "./GraphQL/index"
import config from "./config"


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
    context({req}){
    // Check for authorization
    
        const authHeader = req.headers.authorization
        // for no header of authorization
        if(authHeader){
            const token = authHeader.split(" ")[1]
            if(token!=="null" ){
                const match = jwt.verify(token, config.JWT_SECRET)
                if(match)return{
                    isAuthenticated: true,
                    user: {
                        _id: match._id,
                        email: match.email
                    }
                }
            }
        }
        else {
            return {
                isAuthenticated: false
            }
        }
    
}})

server.listen(4000).then(({url})=>{
    console.log("Server Started on Port "+url)
}).catch(err=>console.log("ServerError: ", err))
