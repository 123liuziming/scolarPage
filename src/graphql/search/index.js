import gql from "graphql-tag";
import client from "../client";

const paperQuery = gql`
  query Papers($keyword: String!, $page: Int, $perPage: Int) {
    Papers(params: $keyword, page: $page, perPage: $perPage) {
      papers {
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
      numOfPages
    }
  }
`

const scholarQuery = gql`
  query Scholars($name: String!, $page: Int, $perPage: Int) {
    Scholars(params: $name, page: $page, perPage: $perPage) {
      scholars {
        id
        name
        avatar
        userId
        nPubs
        nCitations
      }
      numOfPages
    }
  }
`

async function spotlight(keyword, page, perPage) {
  const paperQueryResults = await client.query({ query: paperQuery, variables: { keyword, page, perPage } });
  const scholarQueryResults = await client.query({ query: scholarQuery, variables: { name: keyword, page, perPage } });
  return {
    papersResponse: paperQueryResults.data.Papers,
    scholarsResponse: scholarQueryResults.data.Scholars
  };
}

export { spotlight };
