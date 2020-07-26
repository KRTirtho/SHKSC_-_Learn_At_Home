import { userResolvers, userTypes } from "./Modules/user";
import {postType, postResolvers} from "./Modules/post"
import {Packer} from "../utils/pack"


export default new Packer({
  typeDefs: [userTypes, postType],
  resolvers: [userResolvers, postResolvers]
})