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
      nCititation
      keywords
      createdAt
      lang
      doi
  }
}`;

function getPaperById(scholarId) {
  return client.query({
    query: paperQuery,
    variables: { scholarId },
  });
}

export { getPaperById }
