import gql from "graphql-tag";
import client from "./client";

const spotlightQuery = gql`
  query spotlight($keyword: String!) {
    Papers(params: $keyword) {
      id
      title
    }
    Scholars(params: $keyword) {
      id
      name
    }
  }
`;

const SPOTLIGHT_SEARCH_RESULT_LENGTH_LIMIT = 5;

async function spotlightSearch(keyword) {
  try {
    const queryResult = await client.query({
      query: spotlightQuery,
      variables: { keyword }
    });
    const result = [];

    const papers = queryResult.data.Papers;
    for (
      let i = 0;
      i < SPOTLIGHT_SEARCH_RESULT_LENGTH_LIMIT && i < papers.length;
      ++i
    ) {
      result.push({ id: papers[i].id, title: papers[i].title, type: "paper" });
    }

    const scholars = queryResult.data.Scholars;
    for (
      let i = 0;
      i < SPOTLIGHT_SEARCH_RESULT_LENGTH_LIMIT && i < scholars.length;
      ++i
    ) {
      result.push({
        id: scholars[i].id,
        title: scholars[i].name,
        type: "scholar"
      });
    }

    return { result, length: papers.length + scholars.length };
  } catch (err) {
    throw err;
  }
}

export { spotlightSearch };
