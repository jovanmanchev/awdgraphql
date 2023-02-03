<template>

    
    
    <div class = 'container'>
       <div v-if="loading">Loading...</div> 
       <form>
          <select name="selectCategory" id="selectCategory" v-model="selectedCategory">
            <option value="technology">Technology</option>
           <option value="politics">Politics</option>
           
          </select>
         
       </form>
       <PostForm />
       <div class = 'row'>
      <div class = 'col-md-12 col-lg-12' v-for="(post, idx) in result.getPosts" :key = "post.id" v-if="!loading">
      
        <PostCard v-if="(selectedCategory === null || selectedCategory === post.category) &&
        (Math.floor(idx / 5) === page )" @showComments = "showComments" :body="post.body" :username="post.username" :createdAt="post.createdAt" :comments="post.comments" :likes="post.likes" :id="post.id" :category="post.category" />
    </div>  
</div>  
<PagesPanel :length="result.getPosts.length" v-if="!loading" @pageChanged = changePage /> 
    </div>
  
</template>

<script>
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';

import PostCard from './PostCard.vue';
import PostForm from './PostForm.vue'
import PagesPanel from './PagesPanel.vue';
const FETCH_POST_QUERY = gql`query getPosts{
    getPosts{
        id
        body
        createdAt
        username
        category
        likes{ username }
        comments{
            id body username createdAt
        }
    }
}`


    export default{
      components: {
        PostCard,
        PostForm,
        PagesPanel
      },
      data(){
        return{
            selectedCategory: localStorage.getItem('category'),
            page: 0
        }
      },
      methods: {

        showComments(){
            this.showComments = true
        },
        changePage(evt){
          this.page = evt.page;
        }
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