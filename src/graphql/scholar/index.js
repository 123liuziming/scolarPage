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
        active
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

const findScholarQuery = gql`
  query findScholarById($scholarId:ID){
    findScholarById(scholarId:$scholarId){
      scholar{
        avatar
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
          h_index
          n_citation
          n_pubs
          orgs
          name
         papers{
          title
          paperId
         }
        }
        nPubs
        nCitations
        hIndex,
        userId
       
      }
      isFollowing
    }
  }
`;

const followScholarMutation = gql`
  mutation followScholarMutation($scholarId:ID){
    follow(scholarId:$scholarId){
      id
    }
  }
`;

const sendMessageMutation = gql`
  mutation sendMessageMutation($receiverId:ID, $content:String){
    sendAMessage(params:{receiverId:$receiverId, content:$content}){
      id
    }
  }
`;

const updateBulletinMutation = gql`
  mutation updateBulletin($scholarId:ID, $bulletin:String){
    updateBulletin(scholarId:$scholarId, bulletin:$bulletin){
      id
  }
 }
`;

const addTagMutation = gql`
  mutation addTags($scholarId:ID, $t:String, $w:Float){
    addTags(params:{scholarId:$scholarId, tags:{t:$t, w:$w}}){
      id
    }
  }
`;

const removeTagMutation = gql`
  mutation removeTags($scholarId:ID, $t:String, $w:Float){
    removeTags(params:{scholarId:$scholarId, tags:{t:$t, w:$w}}){
      id
    }
   }
`;

const createAuthMutation = gql`
  mutation createAuthentication($scholarId:ID, $content:String){
    createAuthentication(scholarId:$scholarId, content:$content){
      id
  }
 }
`;

function createAuthentication(scholarId, content) {

  return client.mutate({
    mutation: createAuthMutation,
    variables: {scholarId, content}
  });
}

function addTag(scholarId, t, w) {
  return client.mutate({
    mutation: addTagMutation,
    variables: {scholarId, t, w}
  });
}

function removeTag(scholarId, t, w) {
  return client.mutate({
    mutation: removeTagMutation,
    variables: {scholarId, t, w}
  });
}

function updateBulletin(scholarId, bulletin) {
  return client.mutate({
    mutation: updateBulletinMutation,
    variables: {scholarId, bulletin},
  })
}

function sendMessage(receiverId, content) {
  return client.mutate({
    mutation: sendMessageMutation,
    variables: {receiverId, content},
  });
}

function followScholarOp(scholarId) {
  return client.mutate({
    mutation: followScholarMutation,
    variables: {scholarId},
  });
}

function findScholarById(scholarId) {
  return client.query({
    query: findScholarQuery,
    variables: {scholarId},
  });
}

function getPaperById(scholarId) {
  return client.query({
    query: paperQuery,
    variables: {scholarId},
  });
}

export {
  getPaperById,
  findScholarById,
  followScholarOp,
  sendMessage,
  updateBulletin,
  addTag,
  removeTag,
  createAuthentication
}
