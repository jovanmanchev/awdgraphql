<template>
    <form @submit = "postBlog">
  <div class="form-row align-items-center">

    <div class="col-8">
      <label class="sr-only" for="inlineFormInputGroup">Say someting</label>
      <div class="form-group mb-5">
     
        <textarea v-model="post" type="text" class="form-control form-control-lg" id="inlineFormInputGroup" placeholder="Say something..."></textarea>
      </div>
    </div>

    <div class="col-auto">
      <button type="submit" class="btn btn-primary mb-2">Post</button>
    </div>
  </div>

  <div v-if="error">
    {{ error }}
</div>

</form>

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

const CREATE_POST_MUTATION = gql`
mutation createPost($body: String!){
  createPost(body: $body){
    id
    body
    createdAt
    username
  }
}
`;



    export default {
        name: 'PostForm',
        data(){
            return {
                post: '',
                error: null
            }
        },
        methods: {
            postBlog(evt){
                evt.preventDefault();
                if(this.post.trim().length <= 1){
                    this.error = "enter a post"
                    return
                }
                const {mutate: postBlog} = useMutation(CREATE_POST_MUTATION,
                {variables: {body: this.post}});
               
                postBlog().then(data => {
                   console.log(data);
                   this.error = null
                   location.reload()
                }).catch(err => {
                    console.log(err)
                })

            }
        }
    }
</script>