import client from "../client";
import gql from "graphql-tag";

const sendMessageMutation = gql`
  mutation sendAMessage($receiverId:ID, $content:String){
    sendAMessage(params:{receiverId:$receiverId, content:$content}){
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
  query messages($idA:ID,$idB:ID,$page:Int,$perpage:Int){
    messages(idA:$idA,idB:$idB,page:$page,perpage:$perpage){
      id,
      content,
      createdAt,
      senderId,
      receiverId
    }
  }
`;

function gql_sendMessage(receiverId, content){
  return client.mutate({
    mutation:sendMessageMutation,
    variables:{receiverId, content},
  });
}

function gql_getAllContacts(){
  return client.query({
    query:getAllContactsQuery,
  });
}

function gql_getAllMessage(){
  return client.query({
    query:getAllContactsQuery,
  });
}

export { gql_getAllContacts,gql_getAllMessage }