<script>
export default {
  name: 'Login',
  data() {
    return {
       backendUrl: 'https://up-theranostics-databank.onrender.com', // TEMP, ENABLE THIS ON DEPLOYMENT
      username: '',
      password: ''
    }
  },
  methods: {
    async doLogin() {
      try {
        const response = await this.axios.post(`${this.backendUrl}/api/login`, {
          username: this.username,
          password: this.password
        }, { withCredentials: true })
        location.href = '/'
      } catch (error) {
        console.log('Error on Login.vue > doLogin()', error)
        alert("Error on Login")
      }
    }
  },
  async mounted() {
    try {
      const response = await this.axios.post(`${this.backendUrl}/api/authorize`, {}, { withCredentials: true })
      location.href = '/'
    } catch (error) {
      console.log('Error on mounted')
      // alert('Error on mounted')
    }
  }
}
</script>
<template>
  <link href="https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">

  <div class="login-container">
    <div class="logo-container">
      <!-- Add your image here -->
      <img src="../assets/oblation.png" alt="Logo" class="logo">
    </div>
    <div class="login-card">
      <div style="text-align:center;margin-bottom:30px">
      <img src="../assets/tblogo.png" alt="log" class="log">
      </div>
      <h4 class="login-title">UP Theranostics Databank<br></h4>
      <div class="input-group login-input">
        <span class="input-group-text">Username</span>
        <input v-model="username" type="text" class="form-control" placeholder="Enter username">
      </div>
      <div class="input-group login-input">
        <span class="input-group-text">Password</span>
        <input v-model="password" type="password" class="form-control" placeholder="Enter password">
      </div>
      <button @click="doLogin()" type="button" class="btn login-btn">Log in</button>
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
  width:135px;
  height:120px;
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
  background-color: black; /* Light blue background for input labels */
  border: 1px solid white; /* Light blue border for input labels */
  color: white; /* Soft blue for icons */
  font-weight: 100px;
}

.form-control {
  border: 1px solid #807575; /* Light blue border for inputs */
  color: #495057; /* Standard text color for inputs */
}

.login-btn {
  width: 100%;
  background-color: #0B2509; 
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
  background-color: #0B2509;  /* Darker blue for hover effect */
}

</style>
