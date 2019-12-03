import client from "../client";
import gql from "graphql-tag";

const paperQuery = gql`
  query Papers($params: String!) {
    Papers(params:$params) {
      id
      title,
      authors{
        id,
        name
      }
  }
}`;

function getPaper(params) {
  return client.query({
      query: paperQuery,
      variables: {params},
    }
  )
}

export {getPaper }
