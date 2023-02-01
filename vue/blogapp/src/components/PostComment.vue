<template>


    <img src="../assets/comment.png" 
        @click="checkAuth" >

    <form v-if="showForm" @submit="postComment">
        <div class="form-group">
            <label for="message-text" class="col-form-label">Comment:</label>
            <textarea v-model="comment" class="form-control" id="message-text"></textarea>
        </div>
        <button class = 'btn btn-dark' type = "submit">Comment</button>
    </form>

</template>

<script>
import gql from 'graphql-tag';
import { provideApolloClient, useMutation } from '@vue/apollo-composable';
import { createHttpLink } from 'apollo-link-http';
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

export default {
    name: 'PostComment',
    props: ['postId'],
    data() {
        return {
            comment: '',
            showForm: false
        }
    },
    methods: {
        postComment(evt) {
            evt.preventDefault();
            console.log(localStorage.getItem('username'))
            if (!localStorage.getItem('username')) {
                this.$router.push('/login');
            }

            const { mutate: comment } = useMutation(SUBMIT_COMMENT_MUTATION,
                { variables: { postId: this.postId, body: this.comment } });

            comment().then(data => {
                console.log(data)
                location.reload()

            }).catch(err => {
                console.log(err)
            })

        },
        checkAuth() {
            if (!localStorage.getItem('username')) {
                this.$router.push('/login');
            }
            this.showForm = !this.showForm
        }
    }

}
</script>