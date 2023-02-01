<template>
  <a class="card-link" @click="deleteComment">
    <img src="../assets/delete_FILL0_wght400_GRAD0_opsz48.png">
  </a>
</template>

<script>
import gql from 'graphql-tag';
import { provideApolloClient, useMutation } from '@vue/apollo-composable';
import { createHttpLink } from 'apollo-link-http';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { setContext } from 'apollo-link-context';


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

export default {
  name: "DeleteCommentButton",
  props: ['postId', 'commentId'],
  methods: {
    deleteComment() {
      const httpLink = createHttpLink({
      uri: 'http://localhost:5000'
    })
    
    const authLink = setContext(() => {
      const token = localStorage.getItem('jwtToken');

      return {
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      }
    })

    const cache = new InMemoryCache()


    const apolloClient = new ApolloClient({
      cache,
      link: authLink.concat(httpLink)
    })
    
    provideApolloClient(apolloClient);


      console.log(this.postId)
      console.log(this.commentId)
      const { mutate: deletePost } = useMutation(DELETE_COMMENT_MUTATION,
        { variables: { postId: this.postId, commentId: this.commentId } });

      deletePost().then(data => {
        console.log(data)
      }).catch(err => console.log(err))
    }
  }
}

</script>