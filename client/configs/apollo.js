<<<<<<< HEAD
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// const httpLink = createHttpLink({
//   credentials: "same-origin",
// });

// const authLink = setContext ((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpZCI6MSwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjAyOTI5NDU4fQ.Wx1VBiiNXbR7MzXyYwtxsdAS5CNgrO-slEcRW3qbfhQ" ? `Bearer ${token}` : "",    // change token with localStorage.access_token for dynamic
//     }
//   }
// });

// const setAuthorizationLink = setContext((request, previousContext) => ({
//   headers: {access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpZCI6MSwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjAyOTI5NDU4fQ.Wx1VBiiNXbR7MzXyYwtxsdAS5CNgrO-slEcRW3qbfhQ"}
// }));

// const auth = new ApolloLink((operation, forward) => {
//   const access_token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpZCI6MSwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjAyOTI5NDU4fQ.Wx1VBiiNXbR7MzXyYwtxsdAS5CNgrO-slEcRW3qbfhQ"

//   operation.setContext({
//     headers: {
//       access_token
//     }
//   })

//   return forward(operation)

// })

const client = new ApolloClient({
  uri: "http://192.168.0.198:4000/",
  cache: new InMemoryCache(),
  // link: auth
=======
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
  uri: "http://192.168.1.74:4000/",
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
>>>>>>> origin/navigation-guard
});

export default client;
