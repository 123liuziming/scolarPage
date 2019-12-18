import client from "../client";
import gql from "graphql-tag";

const getFavoritePapers = gql`
  query allFavorites{
    allFavorites{
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
`;

const getFollows = gql`
  query following{
    following{
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
  }
`;

async function gql_getFavoritePapers(){
  return client.query({
    query:getFavoritePapers,
  });
}

async function gql_getFollows(){
  return client.query({
    query:getFollows,
  });
}

export { gql_getFavoritePapers,gql_getFollows }