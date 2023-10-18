<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async doLogin() {
      try {
        const response = await this.axios.post('/api/login', {
          username: this.username,
          password: this.password
        })
        location.href = '/'
      } catch (error) {
        console.log('Error on Login.vue > doLogin()', error)
        alert("An error occurred.")
      }
    }
  },
  async mounted() {
    try {
      const response = await this.axios.post('/api/authorize')
      location.href = '/'
    } catch (error) {
      console.log('Error on mounted')
    }
  }
}
</script>
<template>
<div class="align-items-center d-flex flex-column justify-content-center" style="background-color: lightgray;">
  <h1 class="mb-5">Login</h1>
  <div class="input-group mb-3" style="max-width: 300px;">
    <span class="input-group-text" style="width: 100px;">Username</span>
    <input v-model="username" type="text" class="form-control" placeholder="">
  </div>
  <div class="input-group mb-4" style="max-width: 300px;">
    <span class="input-group-text" style="width: 100px;">Password</span>
    <input v-model="password" type="password" class="form-control" placeholder="">
  </div>
  <button @click="doLogin()" type="button" class="btn btn-lg btn-secondary">Login</button>
</div>
</template>
<style scoped>
</style>