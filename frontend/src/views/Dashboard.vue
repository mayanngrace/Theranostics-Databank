
  <script>
  import Header from '../components/Header.vue'
  
  export default {
    name: 'Dashboard',
    components: {Header},
    methods: {
      async authorize() {
      console.log('authorize called')
      try {
        const response = await this.axios.post(`${this.backendUrl}/api/authorize`, {}, { withCredentials: true })
      }
      catch (error) {
        console.log('Error on Dashboard.vue > authorize()', error)
        // alert('Error on mounted')
        location.href = '/login'
      }
        }, 
    },
    async mounted() {
        await this.authorize()
        // await this.readPatients()
    },
    data() {
      return {
        backendUrl: 'https://up-theranostics-databank.onrender.com', // TEMP, DISABLE THIS ON DEPLOYMENT
      // backendUrl: '', // ENABLE THIS ON DEPLOYMENT
        websiteUrl: 'https://www.philcancer.org.ph/'
      };
    }
  };
  </script>
  
  <template>
    <div class = "row">
        <div class ="d-flex flex-column">
            <Header />
        <!-- Container for the embedded website -->
        <div class="embedded-website-container">
            <iframe
                class="embedded-website"
                :src="websiteUrl"
                frameborder="0"
                allowfullscreen
            ></iframe>
        </div>
        </div>
    </div>
      <!-- Your custom header component -->
    

  </template>
  
  <style>
  .embedded-website-container {
    /* Take the remaining height after the header */
    height: 100vh;
    /* Adjust if there's any margin or padding */
  }
  
  .embedded-website {
    width: 100%; /* Full width */
    height: 100%; /* Full height of the container */
  }
  </style>
  