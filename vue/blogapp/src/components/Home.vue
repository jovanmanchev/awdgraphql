<template>

    <h1>Home Page</h1>
    
    <div class = 'container'>
       <div v-if="loading">Loading...</div> 
       <PostForm />
       <div class = 'row'>
      <div class = 'col-md-12 col-lg-12' v-for="post in result.getPosts" :key = "post.id" v-if="!loading">
        <PostCard :body="post.body" :username="post.username" :createdAt="post.createdAt" :comments="post.comments" :likes="post.likes" :id="post.id" />
    </div>  
</div>   
    </div>
</template>

<script>
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';

import PostCard from './PostCard.vue';
import PostForm from './PostForm.vue'
const FETCH_POST_QUERY = gql`query getPosts{
    getPosts{
        id
        body
        createdAt
        username
        likes{ username }
        comments{
            id username createdAt
        }
    }
}`


    export default{
      components: {
        PostCard,
        PostForm
      },
      setup(){
        const {result, loading, error} = useQuery(FETCH_POST_QUERY);
    
        return {
            result, loading, error
        }
      }
    }

</script>

<style scoped></style>