require("dotenv").config();
const { ApolloServer } = require("apollo-server");

const typeDefs = gql`
 type Query
 type Mutation
`

const schema = makeExecutableSchema({ typeDefs: [typeDefs, movieScheme.typeDefs, tvSerieScheme.typeDefs], resolvers: [movieScheme.resolvers, tvSerieScheme.resolvers] })

const server = new ApolloServer({

});

const PORT = process.env.PORT || 4000;

server.listen(PORT).then(({ url }) => {
  console.log(`Graphql server is listening at ${url}`);
});