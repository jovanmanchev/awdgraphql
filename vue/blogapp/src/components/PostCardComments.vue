<template>

  <div>
    <div v-for="comment in comments">
      <p>{{ comment.username }}</p>
      <p>{{ comment.body }}</p>
      <DeleteCommentButton v-if="comment.username == currentUser" :postId = "id" :commentId = "comment.id"/>
    </div>
  </div>

</template>

<script>
import gql from 'graphql-tag';
import { useQuery, provideApolloClient } from '@vue/apollo-composable';
import { createHttpLink } from 'apollo-link-http';


import DeleteCommentButton from './DeleteCommentButton.vue';


    export default{
    name: "PostCardComments",
    props: ["id", "comments", "username", "body"],
    data() {
        return {
            post: null,
            currentUser: localStorage.getItem('username'),
            loading: null
        };
    },
    components: { DeleteCommentButton }
}
</script>