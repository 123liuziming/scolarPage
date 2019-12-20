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
          active
          name
        }
        keywords
        nCitation
        year
        abstract
        venue
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
        nCitations
        tags {
          t
        }
        hIndex
        orgs
        bulletin
      }
      numOfPages
    }
  }
`

async function searchPapers(keyword, page, perPage) {
  const response = await client.query({ query: paperQuery, variables: { keyword, page, perPage } });
  return response.data.Papers;
}

async function searchScholars(name, page, perPage) {
  const response = await client.query({ query: scholarQuery, variables: { name, page, perPage } });
  return response.data.Scholars;
}

export { searchPapers, searchScholars };
