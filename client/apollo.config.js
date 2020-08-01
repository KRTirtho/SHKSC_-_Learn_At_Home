module.exports = {
    client: {
        clientSchemaDirectives: ["client"],
        service: {
            name: "my-server", 
            url: "http://localhost:4000",
        },
        excludes: ["./src/schema/local/*.ts"]
    }
}