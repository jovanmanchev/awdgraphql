<template>


    <div class ='container'>
    <form @submit="register">
        
        <div class="form-group">
            <label for="username" >Username</label>
        <input type="text" v-model="fields.username" class="form-control input-sm" id ='username'>
        </div>
        <div class="form-group">
            <label for="password" >Password</label>
        <input type="password" v-model="fields.password" class="form-control input-sm" id ='password'>
        </div>
      
        <input type="submit" class = 'btn btn-primary' value = "Login">
    </form>
    <div v:if = "errors">
        <p v-for="(key,value) in errors">
            {{ key }}
        </p>
    </div>
</div>
</template>

<script>
import gql from 'graphql-tag';
import { provideApolloClient, useMutation } from '@vue/apollo-composable';
import { createHttpLink} from 'apollo-link-http'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { mapGetters } from 'vuex';

const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
})

const cache = new InMemoryCache()


const apolloClient = new ApolloClient({
    cache,
    link: httpLink
  })
provideApolloClient(apolloClient);

const LOGIN_USER = gql`
  mutation login(
    $username: String!
    $password: String!
  
  ) {
    login(
        username: $username
        password: $password
       
    ) {
      id
      email
      username
      token
    }
  }
`;

    export default{
        data(){
            return{
                fields:{
                    username: '',
                    password: '',
                   
                },
                errors: null
            }
        },
        methods:{
            register(evt){
                evt.preventDefault();
               const {mutate: register} = useMutation(LOGIN_USER,
               {variables: this.fields});

               register().then(data => {
                this.$store.dispatch('loginUser', data)
             
                this.$router.push({ path: '/' });
               })
               .catch(err => {
                console.log(err)
                this.errors = err.graphQLErrors[0].extensions.errors
            });
            }
        },
        computed: {
            getUser(){
                return this.$store.getters.getUser
            }
        },
        beforeMount(){
            const token = localStorage.getItem('jwtToken');
            console.log(token)
            if(token){
                this.$router.push("/")
            }
        }
         
    }

</script>

<style scoped></style>