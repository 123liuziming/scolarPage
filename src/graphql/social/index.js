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
  query messages($idA:ID,$idB:ID,$page:Int,$perPage:Int){
    messages(idA:$idA,idB:$idB,page:$page,perPage:$perPage){
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

async function gql_getAllContacts(){
  return client.query({
    query:getAllContactsQuery,
  });
}

async function gql_getAllMessage(idA,idB,page,perPage){
  return client.query({
    query:getAllMessage,
    variables:{ idA,idB,page,perPage },
    fetchPolicy: "network-only",
  });
}

export { gql_getAllContacts,gql_getAllMessage,gql_sendMessage }