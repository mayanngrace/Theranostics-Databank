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
      <h2>Theranostics Databank</h2>
      <br><br>
      <p class="text-center">
        Manage, view, and import theranostics patients records.
      </p>
    </div>
  </div>
</div>
</template>
<style scoped>
</style>