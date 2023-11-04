
  <script>
  import Header from '../components/Header.vue'
  
  export default {
    name: 'Dashboard',
    components: {Header},
    methods: {
        async mounted() {
        await this.authorize()
        // await this.readPatients()
      },
    },
    data() {
      return {
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
  