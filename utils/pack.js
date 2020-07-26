"use strict";
/**
 * @param typeDefs gqlTemplateStrings[]
 * @description This package takes two array of typeDefs & resolvers as parameters. It merges the gql`` with each others & also merges all the resolver's @Query & @Mutation properties inside one global which is accessible via returned props.
 * @param resolvers resolvers[]
 * @returns typeDefs| Merged gql buildSchema
 * @returns resolvers| Merged resolvers
 * @version 0.0.2@alpha-build
 * @author KR.Tirtho
  */
exports.__esModule = true;
exports.Packer = void 0;
var user_1 = require("../GraphQL/Modules/user");
var post_1 = require("../GraphQL/Modules/post");
var Packer = /** @class */ (function () {
    function Packer(_a) {
        /**
         * mapping through every gql & then achieving only the definitions
         * then spreading the all definitions property to a new definition
         */
        var _this = this;
        var typeDefs = _a.typeDefs, resolvers = _a.resolvers;
        if (!typeDefs || !resolvers) {
            console.log(new TypeError("No typeDefs or resolvers is provided"));
        }
        else if (typeof typeDefs !== "object" || typeof resolvers !== "object") {
            console.log(new TypeError("typeDefs & resolvers must be a type of object"));
        }
        var defStorage = {
            definitions: [],
            loc: { start: 0, end: null }
        };
        /* Storing only the first typesDefs's key */
        for (var keys in typeDefs[0]) {
            if (keys !== "definitions") {
                defStorage[keys] = typeDefs[0][keys];
            }
        }
        /* Have to increment the loc:{end:Number} count for the parser */
        /* But if one element passed then only use this */
        if (typeDefs.length > 1) {
            defStorage.loc.end = typeDefs.reduce(function (prev, now) {
                return prev.loc.end + now.loc.end;
            });
        }
        else {
            defStorage.loc.end = typeDefs[0].loc.end;
        }
        /* Pushing all the  definitions*/
        typeDefs.map(function (defs) {
            /* Mapping over the individual definitions */
            defs.definitions.map(function (definition) {
                defStorage.definitions.push(definition);
            });
        });
        this.typeDefs = defStorage;
        this.resolvers = {
            Query: {},
            Mutation: {}
        };
        // As so many resolvers thats why map over them and setting the values
        if (typeof resolvers === "object") {
            var _loop_1 = function (resolvents) {
                // Now mapping through the object keys
                /**
                 * TODO: First Check if the keys are Query/Mutation
                 * TODO: IF not Query/Mutation then append it to the resolver
                 * TODO: Else push to Query/Mutation
                  */
                var otherProps = Object.keys(resolvents).filter(function (keys) { return keys !== "Query" && keys !== "Mutation"; });
                for (var _i = 0, otherProps_1 = otherProps; _i < otherProps_1.length; _i++) {
                    var prop = otherProps_1[_i];
                    this_1.resolvers[prop] = resolvents[prop];
                }
                Object.keys(resolvents.Query).map(function (keys) {
                    _this.resolvers.Query[keys] = resolvents.Query[keys];
                });
                Object.keys(resolvents.Mutation).map(function (keys) {
                    _this.resolvers.Mutation[keys] = resolvents.Mutation[keys];
                });
            };
            var this_1 = this;
            for (var _i = 0, resolvers_1 = resolvers; _i < resolvers_1.length; _i++) {
                var resolvents = resolvers_1[_i];
                _loop_1(resolvents);
            }
        }
    }
    return Packer;
}());
exports.Packer = Packer;
var x = new Packer({
    typeDefs: [user_1.userTypes, post_1.postType],
    resolvers: [user_1.userResolvers, post_1.postResolvers]
});
