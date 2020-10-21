import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, makeVar, gql } from '@apollo/client';


export const userToken = makeVar(null);

export const GET_USER_TOKEN = gql`
  query {
    userToken @client
  }
`;

export const getUsername = makeVar("");

export const GET_USERNAME = gql`
  query {
    getUsername @client
  }
`;

export const getEmail = makeVar("");

export const GET_EMAIL = gql`
  query {
    getEmail @client
  }
`;

const client = new ApolloClient({
  uri: "http://192.168.0.23:4000/",
  cache: new InMemoryCache({ typePolicies: {
    Query: {
      fields: {
        userToken: {
          read() {
            return userToken()
          }
        },
        getUsername: {
          read() {
            return getUsername()
          }
        },
        getEmail: {
          read() {
            return getEmail()
          }
        }
      }
    }
  } }),
});

export default client