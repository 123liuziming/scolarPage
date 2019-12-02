import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://192.144.174.132:5123/graphql"
});

export default client;
