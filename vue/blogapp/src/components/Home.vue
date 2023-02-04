<template>



  <div class='container'>
    <div v-if="loading">Loading...</div>
    <form @submit="handleSelection">
      <div class = 'form-group row mt-3 ml-3'>
       
        <select name="selectCategory" id="selectCategory" v-model="selection" class = 'form-control col-lg-4'>
        <option value="" disabled>Search by category</option>  
        <option value="technology">Technology</option>
        <option value="politics">Politics</option>
        <option value="sport">Sport</option>  
        <option value="other">Other</option>  
      </select>
      <button type="submit" class = 'btn btn-dark mb-5 ml-3'>Filter</button>
      </div>
     
    </form>
    <PostForm />
    <div class='row'>
    
      <div v-if="!selectedCategory">

        <div class='col-md-12 col-lg-12' v-for="(post, idx) in result.getPosts" :key="post.id" v-if="!loading">
          
          <PostCard v-if="(Math.floor(idx / 5) === page)" @showComments="showComments" :body="post.body" :username="post.username"
            :createdAt="post.createdAt" :comments="post.comments" :likes="post.likes" :id="post.id"
            :category="post.category" />
        </div>
      </div>
      <div v-if="selectedCategory">
        <div class='col-md-12 col-lg-12' v-for="(post, idx) in result.getPostsByCategory" :key="post.id" v-if="!loading">

          <PostCard v-if="(selectedCategory === null || selectedCategory === post.category) &&
          (Math.floor(idx / 5) === page)" @showComments="showComments" :body="post.body" :username="post.username"
            :createdAt="post.createdAt" :comments="post.comments" :likes="post.likes" :id="post.id"
            :category="post.category" />
        </div>
      </div>
    </div>

    <PagesPanel :selectedPage="page"  :length="result.getPosts.length" v-if="!loading && !selectedCategory" @pageChanged=changePage />
    <PagesPanel :selectedPage="page"  :length="result.getPostsByCategory.length" v-if="!loading && selectedCategory"
      @pageChanged=changePage  />
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
const FETCH_POST_QUERY_CATEGORY = gql`query getPostsByCategory($category: String!){
    getPostsByCategory(category: $category){
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

export default {
  components: {
    PostCard,
    PostForm,
    PagesPanel
  },
  data() {
    return {
      selectedCategory: localStorage.getItem('category'),
      page: parseInt(localStorage.getItem('currentPage')),
      currentPage: 0,
      selection: ''
    }
  },
  methods: {

    showComments() {
      this.showComments = true
    },
    changePage(evt) {
   
      console.log(evt.page)
      localStorage.setItem('currentPage', evt.page);
      this.page = localStorage.getItem('currentPage');
      location.reload()
    },
    handleSelection(evt) {
      evt.preventDefault()
      if(!this.selection)
        localStorage.removeItem('category')
      localStorage.setItem('category', this.selection);
      location.reload()
    }
  },
  setup() {

    const category = localStorage.getItem('category')

    if (category) {
      const { result, loading, error } = useQuery(FETCH_POST_QUERY_CATEGORY, { category });
      console.log(result)
      return {
        result, loading, error
      }
    } else {
      const { result, loading, error } = useQuery(FETCH_POST_QUERY);
      return {
        result, loading, error
      }
    }

  },
  beforeMount(){
    let page = localStorage.getItem('currentPage');
    if(!page){
      localStorage.setItem('currentPage', 0)
    }
  }
}

</script>

<style scoped>

</style>