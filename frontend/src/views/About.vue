<script>
import Header from '../components/Header.vue'
export default {
  name: 'About',
  components: {Header}
}
</script>
<template>
<div class="d-flex flex-column" style="background: linear-gradient(to bottom, #441515, #C59A2E, #0B2509);">
  <Header />
  <div class="align-items-center py-3" style="flex: 1 1 auto; padding-left: 300px; padding-right: 300px; margin-top:100px;">
    <div class="alert alert-success text-center" role="alert" style=" background-color: #0B2509; color:white;">
      <p>UP Theranostics Databank is web-based system for managing prostate cancer patient records, covering aspects from demographics and screening to therapy and follow-up. It features functionalities to add, edit, and search patient records, then generate counts and records summary on various clinical aspects. This system aims to facilitate detailed tracking and analysis of patient data, enhancing the quality of prostate cancer treatment and care.
      This system is done as a project requirement for the course HI 191 by the following students:</p>
      <p class="text-center">
        <span style="font-style:italic;">Palisoc, May Ann Grace<br></span>
        <span style="font-style:italic;">Lagasca, Kaye Sophia</span><br><br>
        <span style="font-weight:bold;">&copy; 2024</span>
      </p>
    </div>
  </div>
</div>
</template>
<style scoped>
</style>