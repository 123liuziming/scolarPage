import client from "../client";
import gql from "graphql-tag";

const paperQuery = gql`
  query searchPapersByScholarId($scholarId:ID){
    searchPapersByScholarId(scholarId:$scholarId) {
      id
      title
      authors{
        id
        name
      }
      year
      volume
      abstract
      venue
      nCitation
      keywords
      createdAt
      lang
      doi
  }
}`;

const isFollowingQuery = gql`
  query isFollowing($scholarId:ID){
    isFollowing(scholarId:$scholarId)
  }
`;

const findScholarQuery = gql`
  query findScholarById($scholarId:ID){
    findScholarById(scholarId:$scholarId){
      scholar{
        name
        orgs
        tags{
          id
          t
          w
        }
        bulletin
        coauthors{
          scholarId
        }
        nPubs
        nCitations
        hIndex
      }
      isFollowing
    }
  }
`;

function findScholarById(scholarId){
  return client.query({
    query: findScholarQuery,
    variables: { scholarId },
  });
}

function getPaperById(scholarId) {
  return client.query({
    query: paperQuery,
    variables: { scholarId },
  });
}

function isFollowing(scholarId){
  return client.query({
    query:isFollowingQuery,
    variables:{scholarId},
  });
}

export { getPaperById, isFollowing, findScholarById }
