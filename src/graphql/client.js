import ApolloClient from "apollo-boost";

const defaultClient = new ApolloClient({
  uri: "https://vian.im/gql",
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
