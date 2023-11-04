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
        alert("Error on Login")
      }
    }
  },
  async mounted() {
    try {
      const response = await this.axios.post('/api/authorize')
      location.href = '/'
    } catch (error) {
      console.log('Error on mounted')
      // alert('Error on mounted')
    }
  }
}
</script>
<!-- <template>
<div class="align-items-center d-flex flex-column justify-content-center" style="background-color: lightgray;">
  <h1 class="mb-5">Logined</h1>
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
<style>
 background: linear-gradient(to bottom, #441515, #C59A2E, #0B2509);
</style> -->
<template>
  <link href="https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">

  <div class="login-container">
    <div class="logo-container">
      <!-- Add your image here -->
      <img src="../assets/oblation.png" alt="Logo" class="logo">
    </div>
    <div class="login-card">
      <div style="text-align:center;margin-bottom:30px">
      <img src="../assets/log.png" alt="log" class="log">
      </div>
      <h4 class="login-title">UP Theranostics Databank<br></h4>
      <div class="input-group login-input">
        <span class="input-group-text">Username</span>
        <input v-model="username" type="text" class="form-control" placeholder="Enter your username">
      </div>
      <div class="input-group login-input">
        <span class="input-group-text">Password</span>
        <input v-model="password" type="password" class="form-control" placeholder="Enter your password">
      </div>
      <button @click="doLogin()" type="button" class="btn login-btn">Log In</button>
    </div>
  </div>
</template>

<style scoped>

body {
  font-family: 'Tinos', serif;
}

.login-title, .form-control, .btn {
  font-family: 'Tinos', serif;
}
.login-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
  padding: 0 8.5%;
  background: linear-gradient(to bottom, #441515, #C59A2E, #0B2509);
}

.logo-container {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}

.logo {
  max-width: 100%;
  max-height: 100%;
}

.log{
  width:80px;
  height:80px;
  text-align:center;
}
.login-card {
  padding: 50px 20px;
  background: #441515ca; 
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-height:500px;
  max-width: 400px;
}

.login-title {
  color:white; /* Soft blue for the title */
  margin-bottom: 2rem;
  text-align: center;
  font-weight: bold;
}

.input-group {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.input-group-text {
  background-color: rgb(195, 194, 194); /* Light blue background for input labels */
  border: 1px solid white; /* Light blue border for input labels */
  color:black; /* Soft blue for icons */
  font-weight: 100px;
}

.form-control {
  border: 1px solid #807575; /* Light blue border for inputs */
  color: #495057; /* Standard text color for inputs */
}

.login-btn {
  width: 100%;
  background-color: #0B2509; /* Standard blue for buttons */
  color: white;
  border: none;
  padding: 0.75rem 0;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
}

.login-btn:hover {
  background-color: #071706; /* Darker blue for hover effect */
}

</style>
