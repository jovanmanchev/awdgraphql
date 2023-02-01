

<script >


export default {
  name: 'App',
  components: {

  },
  computed: {
    getUser() {
     
      return localStorage.getItem('jwtToken');
    }
    
  },

  methods: {
    logout() {
      this.$router.push('/')
      this.$store.dispatch('logoutUser');
      location.reload()
    }
  }

}

</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" to="/">Blog app</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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
