
const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server");
const foodSchema = require("./schemas/food");
// const axios = require("axios");

const userScheme = require("./schemas/user.js");

const cart = require("./schemas/cart")

const typeDefs = gql`
  type Query
  type Mutation
`;


const schema = makeExecutableSchema({ typeDefs: [typeDefs, cart.typeDefs, userScheme.typeDefs, foodSchema.typeDefs], resolvers: [cart.resolvers, userScheme.resolvers, foodSchema.resolvers] });


// using apollo-server 2.x

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    try {
      const access_token = req.headers.access_token || '';

      let { data } = await axios({
        method: "POST",
        url: `http://localhost:4010/authentication`,
        headers: {
          access_token
        }
      })
      let user = data
      return { user };

    } catch (error) {
      // console.log(error);
    }


  },
});

const PORT = process.env.PORT || 4000;

server.listen(PORT).then(({ url }) => {
  console.log(`Graphql server is listening at ${url}`);
});
