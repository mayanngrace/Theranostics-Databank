import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'
app.use(VueAxios, axios)

// Vue Router
  import { createRouter, createWebHistory } from 'vue-router'

  // Import Route Components
  // import About from './views/About.vue'
  // import Home from './views/Home.vue'
  // import Login from './views/Login.vue'
  // import New from './views/New.vue'
  // import FollowUp from './views/FollowUp.vue'
  // end Import Route Components

  // Set Routes
  const routes = [
    // {path: '/', component: Home},
    // {path: '/about', component: About},
    // {path: '/login', component: Login},
    // {path: '/new', component: New},
    // {path: '/followup', component: FollowUp}
  ]
  // end Set Routes

  // Configure Vue Router
  const router = createRouter({
    history: createWebHistory(), routes
  })
  // end Configure Vue Router
  app.use(router)
// end Vue Router

app.mount('#app')
