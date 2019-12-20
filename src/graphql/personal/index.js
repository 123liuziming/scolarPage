import client from "../client";
import gql from "graphql-tag";

const getFavoritePapers = gql`
  query allFavorites{
    allFavorites{
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

const changePwd = gql`
mutation changePwd($oldPassword: String!,$newPassword:String!){
  changePassword(oldPassword:$oldPassword,newPassword:$newPassword){
    id,
  }
}
`;

const updateUserInfo = gql`
  mutation updateUserInfo($name:String!){
    updateUserInfo(name:$name){
      id
    }
  }
`;

const updateUserAvatar = gql`
  mutation updateUserInfo($avatar:String!){
    updateUserInfo(avatar:$avatar){
      id
    }
  }
`;

const getOwnScholar = gql`
  query getOwnScholar{
    getOwnScholar{
      id
    }
  }
`;

function gql_getScholar() {
  return client.query({
    query: getOwnScholar,
    fetchPolicy: "network-only",
  });
}

function gql_getFavoritePapers() {
  return client.query({
    query: getFavoritePapers,
  });
}

function gql_getFollows() {
  return client.query({
    query: getFollows,
  });
}

function gql_changePassword(oldPassword, newPassword) {
  return client.mutate({
    mutation: changePwd,
    variables: { oldPassword, newPassword },
  });
}

function gql_updateUserInfo(name) {
  return client.mutate({
    mutation: updateUserInfo,
    variables: { name },
  });
}

function gql_updateUserAvatar(avatar) {
  return client.mutate({
    mutation: updateUserAvatar,
    variables: { avatar },
  });
}

export { gql_getFavoritePapers, gql_getFollows, gql_changePassword, gql_updateUserInfo, gql_updateUserAvatar ,gql_getScholar}