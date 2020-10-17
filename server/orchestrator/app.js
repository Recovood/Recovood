const { ApolloServer, makeExecutableSchema, gql } = require("apollo-server");
const axios = require("axios");

const userScheme = require("./schemas/user.js");

const typeDefs = gql`
 type Query
 type Mutation
`

const schema = makeExecutableSchema({ typeDefs: [typeDefs, userScheme.typeDefs], resolvers: [userScheme.resolvers] });

// using apollo-server 2.x
const server = new ApolloServer({
  schema
});

const PORT = process.env.PORT || 4000;

server.listen(PORT).then(({ url }) => {
  console.log(`Graphql server is listening at ${url}`);
});