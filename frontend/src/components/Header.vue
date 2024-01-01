<script>
export default {
  name: 'Header',
  data() {
    return {
      backendUrl: 'http://localhost:8000', // TEMP, DISABLE THIS ON DEPLOYMENT
      // backendUrl: '', // ENABLE THIS ON DEPLOYMENT
      navVisible: false,
    };
  },
  methods: {
    toggleNav() {
      this.navVisible = !this.navVisible;
    },
    async doLogout() {
      try {
        const response = await this.axios.post(`${this.backendUrl}/api/logout`, {}, { withCredentials: true });
        location.href = '/login'
      } catch (error) {
        console.log('Error on Header.vue > doLogout()', error)
        alert('Error on logout')
      }
    },
    toHome() {
      location.href = '/home'
    }
  },
}
</script>

<template>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.0/css/all.min.css'>
  </head>

  <body>
    <div id="app">
      <a @click="toggleNav" class="toggle-button"> <i class="fas fa-bars"></i></a>
      <div class="watermark">
        <i class="fas fa-anchor"></i> <span style="text-align:right">UP TDB</span>
      </div>

      <aside :class="{ 'nav-open': navVisible }" class="nav">
        <nav class="nav-menu">
          <router-link to="/" class="nav-item"><i class="fas fa-tachometer-alt">&nbsp&nbsp</i>Home</router-link>
          <router-link to="/home" @click="toHome()" class="nav-item"><i class="fas fa-file-upload">&nbsp&nbsp</i>Dashboard</router-link>
          <router-link to="/about" class="nav-item"><i class="fas fa-envelope">&nbsp&nbsp</i>About</router-link>
          <a @click="doLogout()" href="#" class="nav-item"><i class="fas fa-user">&nbsp&nbsp</i>Log Out</a>
        </nav>
      </aside>
    </div>
  </body>
</template>

<style scoped>
/* General styles */

:root {
  --font-family-sans-serif: "Open Sans";
}

body {
  margin: 0;
  font-family: "Open Sans";
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #232323;
  text-align: left;
  background: linear-gradient(to bottom, #441515, rgb(98, 17, 17));
  height: 80px;
}

.watermark {
  color: white;
  font-size: 22px;
  padding: 10px 15px;
  font-weight: bold;
  font-family: "Open Sans";
  margin-top: 15px;
  margin-right: 15px;
  text-align: right;
}

/* Button to toggle the navigation */
.toggle-button {
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 3;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: 22px;
  transition: background-color 0.3s;
}

.toggle-button:hover,
.toggle-button:active,
.toggle-button:focus {
  text-decoration: none;
  color: #6d6d6f;
}


/* Sidebar navigation */
.nav {
  width: 250px;
  height: 100%;
  position: fixed;
  top: 0;
  left: -250px;
  /* Start off-screen */
  background: linear-gradient(to bottom, #441515, rgb(175, 46, 46));
  color: white;
  transition: left 0.3s;
  z-index: 2;
  overflow-y: auto;
}

.nav-open {
  left: 0;
  /* Bring on-screen */
}

/* Navigation menu */
.nav-menu {
  margin-top: 100px;
  /* Spacing from the top */
}

/* Navigation items */
.nav-item {
  display: block;
  /* Make the <a> element a block-level element */
  width: 250px;
  /* Set the width to 100% of its parent */
  padding: 15px 20px;
  box-sizing: border-box;
  /* Include padding and border in the element's width */
  text-align: left;
  /* Center the text horizontally */
  color: white;
  /* Text color */
  background-color: linear-gradient(to bottom, #441515, rgb(98, 17, 17));
  /* Deep maroon background */
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
  font-family: "Open Sans";
  font-size: 18px;
  margin: 10px;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.04);
}

.nav-item.router-link-active {
  background: rgba(0, 0, 0, 0.395);
}

/* Main content area */
.content {
  transition: margin-left 0.3s;
  padding: 20px;
  margin-left: 0;
}

.nav-open~.content {
  margin-left: 250px;
  /* Shift content when nav is open */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .nav {
    width: 200px;
    left: -200px;
    /* Adjust width for smaller screens */
  }

  .nav-open~.content {
    margin-left: 200px;
    /* Adjust content shift for smaller screens */
  }

  .toggle-button {
    padding: 10px;
    /* Smaller button on smaller screens */
  }
}</style>
