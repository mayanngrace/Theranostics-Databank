<script>
export default {
  name: 'Header',
  methods: {
    async doLogout() {
      try {
        const response = await this.axios.post('/api/logout')
        location.href = response.data.redirect
      } catch (error) {
        console.log('Error on Header.vue > doLogout()', error)
        alert('An error occurred.')
      }
    },
    toHome() {
      location.href = '/'
    }
  }
}
</script>
<template>
<div class="align-items-center d-flex flex-row justify-content-between" style="background-color: #2E8EC5; height: 60px; padding-left: 20px; padding-right: 25px;">
  <span @click="toHome()" style="color: #63905F; cursor: pointer; font-size: 24px; font-weight: bold;">Theranostics Databank for Prostate Cancer Patients</span>
  <nav class="align-items-center d-flex" style="gap: 17px;">
    <a href="/about" style="color: #63905F; font-size: 20px; font-weight: bold;" target="_blank">About</a>
    <a @click="doLogout()" href="#" style="color: #C25D47; font-size: 20px; font-weight: bold;">Logout</a>
  </nav>
</div>
</template>
<style scoped>
</style>