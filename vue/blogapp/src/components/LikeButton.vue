<template>
       <a class="card-link" @click="likePost">
       <img src="../assets/likeFill.png" v-if="hasLiked">
       <img src="../assets/likenonfill.png" v-if="!hasLiked">
<span>{{ likesCount}}</span>
    </a>

</template>

<script>
import gql from 'graphql-tag';
import { provideApolloClient, useMutation } from '@vue/apollo-composable';
import { createHttpLink} from 'apollo-link-http';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { setContext } from 'apollo-link-context';
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



const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
    }
  }
`;
    export default {
        name: 'LikeButton',
        props: ['likes', 'postId'],
        data(){
           return{
                likesCount: this.likes.length,
                currentLikes: this.likes
                
           }
        },  
        methods: {
            likePost(){
                
                if(!localStorage.getItem('username')){
                    this.$router.push('/login');
                }
                const {mutate: like} = useMutation(LIKE_POST_MUTATION,
                {variables: {postId: this.postId}});
                
                like().then(data => {
                    this.likesCount = data.data.likePost.likes.length
                    this.currentLikes = data.data.likePost.likes;
                    
                }).catch(err => {
                    console.log(err)
                })
              
            }
        },
        computed: {
           hasLiked(){
            const username = localStorage.getItem('username');
                for(const like of this.currentLikes){
                    if(username === like.username){
                        return true;
                    }
                }
                return false;
           }
        }
    }

</script>
<style scoped>


</style>
