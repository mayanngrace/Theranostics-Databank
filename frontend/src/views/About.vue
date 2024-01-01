<script>
import Header from '../components/Header.vue'
export default {
  name: 'About',
  components: {Header}
}
</script>
<template>
<div class="d-flex flex-column" style="background-color: lightgray;">
  <Header />
  <div class="align-items-center py-3" style="flex: 1 1 auto; padding-left: 300px; padding-right: 300px;">
    <div class="alert alert-success text-center" role="alert">
      This system is done as a project requirement for the course HI 191 taken during the first semester of A.Y. 2022-2023 by the following students:
      <br><br>
      <p class="text-center">
        Calibuyot, Dhone Matthews<br>
        Ednalan, Emmanuel<br>
        Licup, John Paola<br>
        Magsino, Dea Louisa<br>
        Ortega, Nathaniel<br>
      </p>
    </div>
  </div>
</div>
</template>
<style scoped>
</style>