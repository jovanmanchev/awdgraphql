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
    <DeleteCommentButton v-if="currentUser == comment.username" :postId = "post.getPost.id" :commentId="comment.id" />
  </div>
</div>
   </div>
  
</div>
</template>

<script>
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import DeleteCommentButton from './DeleteCommentButton.vue';
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
    name: "PostCardComments",
    props: ["id"],
    data() {
        return {
            post: null,
            currentUser: localStorage.getItem('username')
        };
    },
    created() {
        const { result, loading, error } = useQuery(FETCH_POST_QUERY, { postId: this.id });
        this.post = result;
    },
    components: { DeleteCommentButton }
}
</script>