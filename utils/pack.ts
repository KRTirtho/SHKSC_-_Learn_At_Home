/**
 * @param typeDefs gqlTemplateStrings[]
 * @description This package takes two array of typeDefs & resolvers as parameters. It merges the gql`` with each others & also merges all the resolver's @Query & @Mutation properties inside one global which is accessible via returned props. 
 * @param resolvers resolvers[]
 * @returns typeDefs| Merged gql buildSchema
 * @returns resolvers| Merged resolvers
 * @version 0.0.2@alpha-build
 * @author KR.Tirtho
  */

import { userTypes, userResolvers } from "../GraphQL/Modules/user";
import { postType, postResolvers } from "../GraphQL/Modules/post";

interface IPacker{
  typeDefs: {
    definitions: object[]
    loc: {start: number, end: number}
  }
  resolvers: {
    Query: object,
    Mutation: object
  }
}

interface IDefStorage{
  definitions: Array<object>,
  loc: {start: number, end: number}
}

export class Packer implements IPacker {
  typeDefs;
  resolvers;
  constructor({ typeDefs, resolvers }) {
    /**
     * mapping through every gql & then achieving only the definitions
     * then spreading the all definitions property to a new definition
     */

    if(!typeDefs || !resolvers){
      console.log(new TypeError("No typeDefs or resolvers is provided"))
    }
    else if(typeof typeDefs !== "object" || typeof resolvers !== "object"){
      console.log(new TypeError("typeDefs & resolvers must be a type of object"))
    }
    let defStorage: IDefStorage = {
      definitions: [],
      loc:{start: 0, end: null}
    };
    /* Storing only the first typesDefs's key */
    for (const keys in typeDefs[0]) {
      if (keys !== "definitions") {
        defStorage[keys] = typeDefs[0][keys];
      }
    }
    /* Have to increment the loc:{end:Number} count for the parser */
    /* But if one element passed then only use this */
    if(typeDefs.length>1){
      defStorage.loc.end = typeDefs.reduce((prev, now) => {
        return prev.loc.end + now.loc.end;
      });
    }
    else {
      defStorage.loc.end = typeDefs[0].loc.end
    }

    /* Pushing all the  definitions*/
    typeDefs.map((defs) => {
      /* Mapping over the individual definitions */
      defs.definitions.map((definition) => {
        defStorage.definitions.push(definition);
      });
    });

    this.typeDefs = defStorage;
    this.resolvers = {
      Query: {},
      Mutation: {},
    };
    // As so many resolvers thats why map over them and setting the values
    if (typeof resolvers === "object")
      for (const resolvents of resolvers) {
        // Now mapping through the object keys
        /**
         * TODO: First Check if the keys are Query/Mutation
         * TODO: IF not Query/Mutation then append it to the resolver
         * TODO: Else push to Query/Mutation
          */
         const otherProps = Object.keys(resolvents).filter(keys=> keys!=="Query" && keys!=="Mutation")

         for(const prop of otherProps){
           this.resolvers[prop] = resolvents[prop]
         }

         Object.keys(resolvents.Query).map(keys=>{
           this.resolvers.Query[keys] = resolvents.Query[keys]
         })

         Object.keys(resolvents.Mutation).map(keys=>{
           this.resolvers.Mutation[keys] = resolvents.Mutation[keys]
         })

        }
  }
}

const x = new Packer({
  typeDefs: [userTypes, postType],
  resolvers: [userResolvers, postResolvers]
})