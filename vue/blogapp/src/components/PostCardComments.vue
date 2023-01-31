<template>
  <div class="container">
  
    <div class = "row">
        <h5 >{{ post.getPost.username }}</h5>
    </div>
   
   <div class = "row">
    <div class = "mt-5 mb-5">{{ post.getPost.body }}.</div>
    
   </div>
   <div v-for="comment in post.getPost.comments">
    <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">{{ comment.username }}</h5>
    <p class="card-text">{{ comment.body }}.</p>
  </div>
</div>
   </div>
  
</div>
</template>

<script>
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import { provideApolloClient, useMutation } from '@vue/apollo-composable';
import { createHttpLink} from 'apollo-link-http';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { setContext } from 'apollo-link-context';

import DeleteButton from './DeleteButton.vue';
import LikeButton from './LikeButton.vue';

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



const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likes {
        username
      }
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
        name: 'PostCardComments',
       
        props: ['id'],
        data(){
            return{
                post: null
            }
        },
        created(){
           
            const {result, loading, error} = useQuery(FETCH_POST_QUERY, {postId: this.id});
            this.post = result
            
        }
    }
</script>