import client from "../client";
import gql from "graphql-tag";


// 获取对应论文的相关信息
const getAllArticle = gql`
  query getPaperById($paperId:ID){
    getPaperById(paperId:$paperId){
      currentPaper{
        title
        authors{
          name
          id
        }
        issue
        pdf
        url
        keywords
        lang
        venue
        nCitation
        year
        abstract
      }
      comments{
        author{
          avatar
          name
          id
          email
        }
        body
      }
      relatedWorks{
        title
      }
    }
  }
`;

// 写评论
const writeComment = gql`
  mutation createComment($commentInput:CommentInput){
     createComment(params:$commentInput){
        body
     }
  }
`;

//是否收藏过论文
const getFavorite = gql`
  query allFavorites{
    allFavorites{
      id
    }
  }
`;

//收藏论文
const favoriteArticleMutation = gql`
  mutation favoriteArticleMutation($paperId:ID){
    favorite(paperId:$paperId){
      id
    }
  }
`;

function favoriteArticleOp(paperId) {
  return client.mutate({
    mutation: favoriteArticleMutation,
    variables: { paperId },
  });
}

function getFavourite() {
  return client.query({
    query: getFavorite
  });
}

//写评论
function writeCommentOp(CommentInput) {
  return client.mutate({
    mutation: writeComment,
    variables: { commentInput: CommentInput }
  })
}

function getPaper(paperId) {
  return client.query({
    query: getAllArticle,
    variables: { paperId }
  })
}

export { getFavourite, favoriteArticleOp, writeCommentOp, getPaper }
