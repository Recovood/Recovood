const { gql } = require("apollo-server");

const typeDefs = gql `
  extend type Query {

  }
  extend type Mutation {

  }
`;

const resolvers = {
  Query: {

  },
  Mutation: {

  }
}

module.exports = { typeDefs, resolvers };