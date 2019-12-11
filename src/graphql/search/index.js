// @ts-check

import gql from "graphql-tag";
import client from "../client";

const paperQuery = gql`
  query Papers($keyword: String!, $page: Int, $perPage: Int) {
    Papers(params: $keyword, page: $page, perPage: $perPage) {
      id
      title
      authors {
        id
        name
      }
      keywords
      nCitation
      year
      abstract
    }
  }
`

const scholarQuery = gql`
  query Scholars($name: String!, $page: Int, $perPage: Int) {
    Scholars(params: $name, page: $page, perPage: $perPage) {
      id
      name
      avatar
      userId
      researchField
    }
  }
`

async function spotlight(keyword, page, perPage) {
  const paperQueryResults = await client.query({ query: paperQuery, variables: { keyword, page, perPage } });
  const scholarQueryResults = await client.query({ query: scholarQuery, variables: { name: keyword, page, perPage } });
  return {
    papers: paperQueryResults,
    scholars: scholarQueryResults
  };
}

export { spotlight };
