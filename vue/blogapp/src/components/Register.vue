<template>

    <h1>Register Page</h1>
    <div class ='container'>
    <form @submit="register">
        <div class="form-group">
            <label for="username" >Username</label>
        <input type="text" v-model="fields.username" class="form-control input-sm" id ='username'>
        </div>
        <div class="form-group">
            <label for="email" >Email</label>
        <input type="text" v-model="fields.email" class="form-control input-sm" id ='email'>
        </div>
        <div class="form-group">
            <label for="password" >Password</label>
        <input type="password" v-model="fields.password" class="form-control input-sm" id ='password'>
        </div>
        <div class="form-group">
            <label for="confirmPassword" >Confirm password</label>
        <input type="password" v-model="fields.confirmPassword" class="form-control input-sm" id ='confirmPassword'>
        </div>
        <input type="submit" class = 'btn btn-primary' value = "Register">
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

const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
})

const cache = new InMemoryCache()


const apolloClient = new ApolloClient({
    cache,
    link: httpLink
  })
provideApolloClient(apolloClient);

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

    export default{
        data(){
            return{
                fields:{
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                },
                errors: null
            }
        },
        methods:{
            register(evt){
                evt.preventDefault();
               const {mutate: register} = useMutation(REGISTER_USER,
               {variables: this.fields});

               register().then(data => {
                console.log(data);
                this.$router.push({ path: '/' });
               })
               .catch(err => {
            
                this.errors = err.graphQLErrors[0].extensions.errors
            });
            }
        }
         
    }

</script>

<style scoped></style>