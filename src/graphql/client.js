import ApolloClient from "apollo-boost";

const defaultClient = new ApolloClient({
  uri: "http://192.144.174.132/gql",
  fetchOptions: { credentials: 'include' },
  request: operation => {
    const token = localStorage.getItem("token");
    if (token)
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`,
        }
      });
  }
});

export default defaultClient;
