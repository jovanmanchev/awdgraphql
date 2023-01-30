<template>
{{ result }}

</template>

<script>
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
const POSTS_QUERY = gql`
 query getPosts {
  getPosts {
    body
    username
  }
}
   
  `;
  export default{
    name: 'Post',
    setup (){
        
        const { result, loading, error } = useQuery(POSTS_QUERY);
        return {
        result,
        loading, 
        error
    }
    }
  }

</script>