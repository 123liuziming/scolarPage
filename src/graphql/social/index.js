import client from "../client";
import gql from "graphql-tag";

const sendMessageMutation = gql`
  mutation sendMessageMutation($receiverId:ID, $content:String){
    sendAMessage(params:{receiverId:$receiverId, content:$content}){
      id
    }
  }
`;

function sendMessage(receiverId, content){
  return client.mutate({
    mutation:sendMessageMutation,
    variables:{receiverId, content},
  });
}