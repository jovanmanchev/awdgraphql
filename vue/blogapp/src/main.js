import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createHttpLink} from 'apollo-link-http'
import router from './router'


import App from './App.vue'
const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
})

const cache = new InMemoryCache()


const apolloClient = new ApolloClient({
    cache,
    link: httpLink
  })
const app = createApp({
    setup () {
      provide(DefaultApolloClient, apolloClient)
    },
  
    render: () => h(App),
  })
app.use(router).mount('#app');
﻿
