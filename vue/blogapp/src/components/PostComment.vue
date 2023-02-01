<template>


<img src="../assets/comment.png"  data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add comment</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="message-text" class="col-form-label">Comment:</label>
            <textarea v-model="comment" class="form-control" id="message-text"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="postComment">Post comment</button>
      </div>
    </div>
  </div>
</div>

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
    console.log(token)
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



const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      
    }
  }
`;

    export default{
        name: 'PostComment',
        props: ['postId'],
        data(){
            return{
                comment: ''
            }
        },
        methods: {
            postComment(){
                if(!localStorage.getItem('username')){
                    this.$router.push('/login');
                }
                console.log(this.comment)
                const {mutate: comment} = useMutation(SUBMIT_COMMENT_MUTATION,
                {variables: {postId: this.postId, body: this.comment}});
                
                comment().then(data => {
                    console.log(data)
                    location.reload()
                    
                }).catch(err => {
                    console.log(err)
                })
              
            }
        }

    }
</script>