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
        alert('Error on logout')
      }
    },
    toHome() {
      location.href = '/'
    }
  }
}
</script>
<template>
<!-- <div class="align-items-center d-flex flex-column justify-content-between mb-4">
  <h2 @click="toHome()" style="cursor: pointer; font-weight: bold; margin: 0;">Theranostics Databank for Prostate Cancer Patients</h2>
  <a href="/about" style="color: blue;" target="_blank">About</a>
</div> -->
<div class="align-items-center d-flex flex-row justify-content-between" style="background-color: #0F172A; height: 60px; padding-left: 20px; padding-right: 25px;">
  <span @click="toHome()" style="color: white; cursor: pointer; font-size: 24px; font-weight: bold;">Theranostics Databank for Prostate Cancer Patients</span>
  <nav class="align-items-center d-flex" style="gap: 17px;">
    <a href="/about" style="color: white; font-size: 20px; font-weight: bold;" target="_blank">About</a>
    <a @click="doLogout()" href="#" style="color: white; font-size: 20px; font-weight: bold;">Logout</a>
  </nav>
</div>
</template>
<style scoped>
</style>