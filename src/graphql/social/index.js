import client from "../client";
import gql from "graphql-tag";

const sendMessageMutation = gql`
  mutation sendAMessage($receiverId:ID, $content:String,$type:String){
    sendAMessage(params:{receiverId:$receiverId, content:$content,type:$type}){
      id
    }
  }
`;

const getAllContactsQuery = gql`
  query recentContacts{
    recentContacts{
      id,
      name,
      avatar
    }
  }
`;

const getAllMessage = gql`
  query messages($idA:ID,$idB:ID,$page:Int,$perPage:Int){
    messages(idA:$idA,idB:$idB,page:$page,perPage:$perPage){
      id,
      content,
      createdAt,
      senderId,
      receiverId,
      type
    }
  }
`;

const getUserInfo = gql`
  query getUserInfo($id:ID){
    getUserInfo(id:$id){
      id,
      name,
      avatar
    }
  }
`;

function gql_sendMessage(receiverId, message) {
  var content, type = message.type;
  if (type === 'text')
    content = message.data.text;
  else if (type === 'emoji')
    content = message.data.emoji;
  return client.mutate({
    mutation: sendMessageMutation,
    variables: { receiverId, content, type },
  });
}

function gql_getAllContacts() {
  return client.query({
    query: getAllContactsQuery,
    fetchPolicy: 'network-only'
  });
}

function gql_getAllMessage(idA, idB, page, perPage) {
  return client.query({
    query: getAllMessage,
    variables: { idA, idB, page, perPage },
    fetchPolicy: "network-only",
  });
}

function gql_getUserInfo(id) {
  return client.query({
    query: getUserInfo,
    variables: { id },
    fetchPolicy: "network-only",
  });
}

export { gql_getAllContacts, gql_getAllMessage, gql_sendMessage, gql_getUserInfo }