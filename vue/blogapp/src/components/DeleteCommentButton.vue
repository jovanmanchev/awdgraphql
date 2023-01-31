<template>
    <a class="card-link" @click="deleteComment">
      <img src="../assets/delete_FILL0_wght400_GRAD0_opsz48.png">
   </a>
</template>

<script>
import gql from 'graphql-tag';
import { provideApolloClient, useMutation } from '@vue/apollo-composable';


const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      
    }
  }
`;

export default{
    name: "DeleteCommentButton",
    props:['postId', 'commentId'],
    methods: {
        deleteComment(){
            console.log(this.postId)
            console.log(this.commentId)
            const {mutate: deletePost} = useMutation(DELETE_COMMENT_MUTATION,
                {variables: {postId: this.postId, commentId: this.commentId}});
                
                deletePost().then(data => {
                    console.log(data)
                }).catch(err => console.log(err))
        }
    }
}

</script>