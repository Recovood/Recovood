require("dotenv").config();
const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server");
const axios = require("axios");

const cart = require("./schemas/cart")

const typeDefs = gql`
 type Query
 type Mutation
`

const schema = makeExecutableSchema({ typeDefs: [typeDefs, cart.typeDefs], resolvers: [cart.resolvers] })

// using apollo-server 2.x

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    // Note! This example uses the `req` object to access headers,
    // but the arguments received by `context` vary by integration.
    // This means they will vary for Express, Koa, Lambda, etc.!
    //
    // To find out the correct arguments for a specific integration,
    // see the `context` option in the API reference for `apollo-server`:
    // https://www.apollographql.com/docs/apollo-server/api/apollo-server/

    // Get the user token from the headers.
    const access_token = req.headers.access_token || '';

    // try to retrieve a user with the token
    let user
    let { data } = await axios({
      method: "POST",
      url: `http://localhost:4010/authentication`,
      headers: {
        access_token
      }
    })
    user = data
    // add the user to the context
    return { user };
  },
});

const PORT = process.env.PORT || 4000;

server.listen(PORT).then(({ url }) => {
  console.log(`Graphql server is listening at ${url}`);
});