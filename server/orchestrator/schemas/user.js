const { gql } = require("apollo-server");
const axios = require("axios");

const userUrl = "http://localhost:3010"

const typeDefs = gql `

  type User {
    username: String
    email: String
    access_token: String
    role: String
  }

  type Message {
    message: String
  }

  input userRegister {
    username: String
    email: String
    password: String
    role: String
  }

  input userLogin {
    email: String
    password: String
  }
  
  extend type Query {
    getMessage: Message
  }

  extend type Mutation {
    register(user: userRegister): User
    login(user: userLogin): User
  }
`;

const resolvers = {
  Query: {
    getMessage: async(_, args) => {
      try {
        const { data } = await axios({
          url: userUrl,
          method: "GET"
        });
        return data;       
      } catch(err) {
        console.log(err, "<<<< error in getMessage");
      }
    }
  },
  Mutation: {
    register: async(_, args) => {
      try {
        const { user } = args;
        const { data } = await axios({
          url: `${userUrl}/register`,
          method: "POST",
          data: user
        });
        return data;
      } catch(err) {
        console.log(err, "<<<< error in register");
      }
    },
    login: async(_, args, context) => {
      try {
        const { user } = args;
        const { data } = await axios({
          url: `${userUrl}/login`,
          method: "POST",
          data: user
        });
        return data;
      } catch(err) {
        console.log(err, "<<<< error in login");
      }
    } 
  }
}

module.exports = { typeDefs, resolvers };