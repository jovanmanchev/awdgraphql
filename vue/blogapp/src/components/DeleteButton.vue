<template>
     <a class="card-link" @click="deletePost">
       <img src="../assets/delete_FILL0_wght400_GRAD0_opsz48.png">
      
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

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;


    export default{
        name: "DeleteButton",
        props: ['postId'],
        methods:{
            deletePost(){
                console.log(this.postId)
                const {mutate: deletePost} = useMutation(DELETE_POST_MUTATION,
                {variables: {postId: this.postId}});
                
                deletePost().then(data => {
                    location.reload()
                }).catch(err => console.log(err))
            }
        }
    }
</script>