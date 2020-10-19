import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const client = new ApolloClient({
  uri: "http://192.168.0.23:4000/",
  cache: new InMemoryCache(),
  // link: auth
});

export default client