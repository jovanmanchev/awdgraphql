

<script >


export default {
name: 'App',
components: {
  
},
computed: {
            getUser(){
                console.log(this.$store.getters.getUser)
                return this.$store.getters.getUser
            }
        },

        methods: {
          logout(){
            this.$store.dispatch('logoutUser');
          }
        }

}

</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <router-link class="navbar-brand" to="/">Blog App</router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ml-auto">
    
      <li class="nav-item" v-if="!getUser">
        <router-link class="nav-link" to="/Login">Login</router-link>
      </li>
      <li class="nav-item" v-if="!getUser">
        <router-link class="nav-link" to="/register">Register</router-link>
      </li>
      <li class="nav-item" v-if="getUser">
        <button class="nav-link" @click="logout">Logout</button>
      </li>

    </ul>
  </div>
</nav>
  <router-view></router-view>

</template>

<style scoped>


</style>
