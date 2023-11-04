<script>
import Header from '../components/Header.vue'
export default {
  name: 'Home',
  components: {Header},
  data() {
    return {
      backendUrl: 'http://localhost:8000', // TEMP, DISABLE THIS ON DEPLOYMENT
      // backendUrl: '', // ENABLE THIS ON DEPLOYMENT
      currentDivShown: 'table',
      editDisabled: true,
      filter_config: '',
      highestSessions: 1,
      highestFollowUpRecords: 1,
      patients: [
      //   {
      //   first_visit: '',
      //   last_visit: '',
      //   part1: {},
      //   part2: {},
      //   part3: {},
      //   follow_up_records: [] // array of part4{} objects from FollowUp.vue
      // }
      ],
      post_therapy_config: '',
      l1dropdown: '',
      l2_assessment: '', // store which l2 assessment was selected from dropdown
      l2_assessment_bone: '',
      l2_lesion_screening: {
        psma: true, // mapped to PSMA checkbox
        psma_dropdown: '', // possible values: ga-68 or f-18
        psma_checkboxes: {
          prostate: false,
          lymph_nodes: false,
          bone: false,
          brain: false,
          lungs: false,
          liver: false,
          other: false
        },
        fdg: true, // mapped to FDG checkbox
        fdg_checkboxes: {
          prostate: false,
          lymph_nodes: false,
          bone: false,
          brain: false,
          lungs: false,
          liver: false,
          other: false
        }
      },
      l2_lesion_post_therapy: {
        prostate: false,
        lymph_nodes: false,
        bone: false,
        lungs: false,
        liver: false
      },
      follow_up_config: null,
      l3_follow_up_lesion: {
        psma: true,
        psma_dropdown: '',
        psma_checkboxes: {
          prostate: false,
          lymph_nodes: false,
          bone: false,
          brain: false,
          lungs: false,
          liver: false,
        },
        fdg: true,
        fdg_checkboxes: {
          prostate: false,
          lymph_nodes: false,
          bone: false,
          brain: false,
          lungs: false,
          liver: false,
        }
      },
      part4: {
        record_id: '',
        pt1_patient_code: '',
        pt4_date: '',
        pt4_psa: '',
        pt4_creatinine: '',
        pt4_wbc: '',
        pt4_rbc: '',
        pt4_hemoglobin: '',
        pt4_hematocrit: '',
        pt4_platelet: '',
        pt4_lactate: '',
        pt4_alkaline: '',
        pt4_ssb: '',
        pt4_salivary: 'normal',
        pt4_renal: '',
        pt4_bone_scan: 'no metastasis',
        pt4_bone_withmetas: '',
        pt4_psma_picked: 'ga-68',
        pt4_psma_prostate: 'psma_absent_prostate',
        pt4_psma_prostate_loc: '',
        pt4_psma_prostate_suv: '',
        pt4_psma_prostate_meas: '',
        pt4_psma_lymphs: 'psma_absent_node',
        pt4_psma_lymphs_loc: '',
        pt4_psma_lymphs_suv: '',
        pt4_psma_lymphs_meas: '',
        pt4_psma_bone: 'psma_absent_bone',
        pt4_psma_bone_loc: '',
        pt4_psma_bone_suv: '',
        pt4_psma_bone_meas: '',
        pt4_psma_brain: 'psma_absent_brain',
        pt4_psma_brain_loc: '',
        pt4_psma_brain_suv: '',
        pt4_psma_brain_meas: '',
        pt4_psma_lungs: 'psma_absent_lungs',
        pt4_psma_lungs_loc: '',
        pt4_psma_lungs_suv: '',
        pt4_psma_lungs_meas: '',
        pt4_psma_liver:'psma_absent_liver',
        pt4_psma_liver_loc:'',
        pt4_psma_liver_suv: '',
        pt4_psma_liver_meas: '',
        pt4_psma_others: 'psma_absent_others',
        pt4_psma_others_loc: '',
        pt4_psma_others_suv: '',
        pt4_psma_others_meas: '',
        pt4_fdg_prostate: 'fdg_absent_prostate',
        pt4_fdg_prostate_loc: '',
        pt4_fdg_prostate_suv: '',
        pt4_fdg_prostate_meas: '',
        pt4_fdg_lymphs: 'fdg_absent_node',
        pt4_fdg_lymphs_loc: '',
        pt4_fdg_lymphs_suv: '',
        pt4_fdg_lymphs_meas: '',
        pt4_fdg_bone: 'fdg_absent_bone',
        pt4_fdg_bone_loc: '',
        pt4_fdg_bone_suv: '',
        pt4_fdg_bone_meas: '',
        pt4_fdg_brain: 'fdg_absent_brain',
        pt4_fdg_brain_loc: '',
        pt4_fdg_brain_suv: '',
        pt4_fdg_brain_meas: '',
        pt4_fdg_lungs: 'fdg_absent_lungs',
        pt4_fdg_lungs_loc: '',
        pt4_fdg_lungs_suv: '',
        pt4_fdg_lungs_meas: '',
        pt4_fdg_liver: 'fdg_absent_liver',
        pt4_fdg_liver_loc: '',
        pt4_fdg_liver_suv: '',
        pt4_fdg_liver_meas: '',
        pt4_fdg_others: 'fdg_absent_others',
        pt4_fdg_others_loc: '',
        pt4_fdg_others_suv: '',
        pt4_fdg_others_measure: '',
        pt4_assessment: 'low risk',
        pt4_plan: ''
      },
      patient_follow_up: {}, // this is where we'll store the patient we will add a follow up record to
      patient_view_follow_up: {}, // this is where we'll store the patient we will view follow up records of
      patient_view_follow_up_index: {},
      searchString: '',
      view_patient: {
        pt1_patient_code: '',
        first_visit: '',
        last_visit: '',
        part1: {
          pt1_patient_record: '',
          pt1_patient_code: '',
          pt1_first_name: '',
          pt1_last_name: '',
          pt1_age: '',
          pt1_city: '',
          pt1_date_diag: '',
          pt1_date_surgery: '',
          pt1_histo: '',
          pt1_gs: '',
          pt1_date_treatment: '',
          pt1_type_treatment: '',
          pt1_type_treatment_others: '',
          pt1_ecog_score: '',
          pt1_height: '',
          pt1_weight: '',
          pt1_bmi: '',
          pt1_bp: '',
          pt1_hr: '',
          pt1_pain_score: '',
          pt1_local_symps: '',
          pt1_sys_symps: '',
          pt1_psa: '',
          pt1_creatinine: '',
          pt1_wbc: '',
          pt1_rbc: '',
          pt1_hemoglobin: '',
          pt1_hematocrit: '',
          pt1_platelet: '',
          pt1_lactate: '',
          pt1_alkaline: '',
          pt1_ssb: '',
          pt1_salivary: '',
          pt1_renal: '',
          pt1_bone_scan: '',
          pt1_bone_withmetas: '',
          pt1_psma_picked: '',
          pt1_psma_prostate: '',
          pt1_psma_prostate_loc: '',
          pt1_psma_prostate_suv: '',
          pt1_psma_prostate_meas: '',
          pt1_psma_lymphs: '',
          pt1_psma_lymphs_loc: '',
          pt1_psma_lymphs_suv: '',
          pt1_psma_lymphs_meas: '',
          pt1_psma_bone: '',
          pt1_psma_bone_loc: '',
          pt1_psma_bone_suv: '',
          pt1_psma_bone_meas: '',
          pt1_psma_brain: '',
          pt1_psma_brain_loc: '',
          pt1_psma_brain_suv: '',
          pt1_psma_brain_meas: '',
          pt1_psma_lungs: '',
          pt1_psma_lungs_loc: '',
          pt1_psma_lungs_suv: '',
          pt1_psma_lungs_meas: '',
          pt1_psma_liver: '',
          pt1_psma_liver_loc: '',
          pt1_psma_liver_suv: '',
          pt1_psma_liver_meas: '',
          pt1_psma_others: '',
          pt1_psma_others_loc: '',
          pt1_psma_others_suv: '',
          pt1_psma_others_meas: '',
          pt1_fdg_prostate: '',
          pt1_fdg_prostate_loc: '',
          pt1_fdg_prostate_suv: '',
          pt1_fdg_prostate_meas: '',
          pt1_fdg_lymphs: '',
          pt1_fdg_lymphs_loc: '',
          pt1_fdg_lymphs_suv: '',
          pt1_fdg_lymphs_meas: '',
          pt1_fdg_bone: '',
          pt1_fdg_bone_loc: '',
          pt1_fdg_bone_suv: '',
          pt1_fdg_bone_meas: '',
          pt1_fdg_brain: '',
          pt1_fdg_brain_loc: '',
          pt1_fdg_brain_suv: '',
          pt1_fdg_brain_meas: '',
          pt1_fdg_lungs: '',
          pt1_fdg_lungs_loc: '',
          pt1_fdg_lungs_suv: '',
          pt1_fdg_lungs_meas: '',
          pt1_fdg_liver: '',
          pt1_fdg_liver_loc: '',
          pt1_fdg_liver_suv: '',
          pt1_fdg_liver_meas: '',
          pt1_fdg_others: '',
          pt1_fdg_others_loc: '',
          pt1_fdg_others_suv: '',
          pt1_fdg_others_meas: '',
          pt1_assessment: '',
          pt1_plan: ''
        },
        therapy_sessions: []
      },
      view_therapy_session: {},
      view_therapy_session_index: 1,
      view_post_therapy_session: {},
      view_post_therapy_session_index: 1
    }
  },
  methods: {
    addFollowUpRecord(patient) {
      this.part4 = {
        record_id: '',
        pt1_patient_code: '',
        pt4_date: '',
        pt4_psa: '',
        pt4_creatinine: '',
        pt4_wbc: '',
        pt4_rbc: '',
        pt4_hemoglobin: '',
        pt4_hematocrit: '',
        pt4_platelet: '',
        pt4_lactate: '',
        pt4_alkaline: '',
        pt4_ssb: '',
        pt4_salivary: 'normal',
        pt4_renal: '',
        pt4_bone_scan: 'no metastasis',
        pt4_bone_withmetas: '',
        pt4_psma_picked: 'ga-68',
        pt4_psma_prostate: 'psma_absent_prostate',
        pt4_psma_prostate_loc: '',
        pt4_psma_prostate_suv: '',
        pt4_psma_prostate_meas: '',
        pt4_psma_lymphs: 'psma_absent_node',
        pt4_psma_lymphs_loc: '',
        pt4_psma_lymphs_suv: '',
        pt4_psma_lymphs_meas: '',
        pt4_psma_bone: 'psma_absent_bone',
        pt4_psma_bone_loc: '',
        pt4_psma_bone_suv: '',
        pt4_psma_bone_meas: '',
        pt4_psma_brain: 'psma_absent_brain',
        pt4_psma_brain_loc: '',
        pt4_psma_brain_suv: '',
        pt4_psma_brain_meas: '',
        pt4_psma_lungs: 'psma_absent_lungs',
        pt4_psma_lungs_loc: '',
        pt4_psma_lungs_suv: '',
        pt4_psma_lungs_meas: '',
        pt4_psma_liver:'psma_absent_liver',
        pt4_psma_liver_loc:'',
        pt4_psma_liver_suv: '',
        pt4_psma_liver_meas: '',
        pt4_psma_others: 'psma_absent_others',
        pt4_psma_others_loc: '',
        pt4_psma_others_suv: '',
        pt4_psma_others_meas: '',
        pt4_fdg_prostate: 'fdg_absent_prostate',
        pt4_fdg_prostate_loc: '',
        pt4_fdg_prostate_suv: '',
        pt4_fdg_prostate_meas: '',
        pt4_fdg_lymphs: 'fdg_absent_node',
        pt4_fdg_lymphs_loc: '',
        pt4_fdg_lymphs_suv: '',
        pt4_fdg_lymphs_meas: '',
        pt4_fdg_bone: 'fdg_absent_bone',
        pt4_fdg_bone_loc: '',
        pt4_fdg_bone_suv: '',
        pt4_fdg_bone_meas: '',
        pt4_fdg_brain: 'fdg_absent_brain',
        pt4_fdg_brain_loc: '',
        pt4_fdg_brain_suv: '',
        pt4_fdg_brain_meas: '',
        pt4_fdg_lungs: 'fdg_absent_lungs',
        pt4_fdg_lungs_loc: '',
        pt4_fdg_lungs_suv: '',
        pt4_fdg_lungs_meas: '',
        pt4_fdg_liver: 'fdg_absent_liver',
        pt4_fdg_liver_loc: '',
        pt4_fdg_liver_suv: '',
        pt4_fdg_liver_meas: '',
        pt4_fdg_others: 'fdg_absent_others',
        pt4_fdg_others_loc: '',
        pt4_fdg_others_suv: '',
        pt4_fdg_others_measure: '',
        pt4_assessment: 'low risk',
        pt4_plan: ''
      }
      this.patient_follow_up = patient
      this.switchDiv('addFollowUpDiv')
    },
    async addFollowUpRecordAPI() {
      try {
        const response = await this.axios.post(`${this.backendUrl}/api/patient/followup/new`, {
          pt1_patient_code: this.patient_follow_up.part1.pt1_patient_code,
          pt4_date: this.part4.pt4_date,
          pt4_psa: this.part4.pt4_psa,
          pt4_creatinine: this.part4.pt4_creatinine,
          pt4_wbc: this.part4.pt4_wbc,
          pt4_rbc: this.part4.pt4_rbc,
          pt4_hemoglobin: this.part4.pt4_hemoglobin,
          pt4_hematocrit: this.part4.pt4_hematocrit,
          pt4_platelet: this.part4.pt4_platelet,
          pt4_lactate: this.part4.pt4_lactate,
          pt4_alkaline: this.part4.pt4_alkaline,
          pt4_ssb: this.part4.pt4_ssb,
          pt4_salivary: this.part4.pt4_salivary,
          pt4_renal: this.part4.pt4_renal,
          pt4_bone_scan: this.part4.pt4_bone_scan,
          pt4_bone_withmetas: this.part4.pt4_bone_scan,
          pt4_psma_picked: this.part4.pt4_psma_picked,
          pt4_psma_prostate: this.part4.pt4_psma_prostate,
          pt4_psma_prostate_loc: this.part4.pt4_psma_prostate_loc,
          pt4_psma_prostate_suv: this.part4.pt4_psma_prostate_suv,
          pt4_psma_prostate_meas: this.part4.pt4_psma_prostate_meas,
          pt4_psma_lymphs: this.part4.pt4_psma_lymphs,
          pt4_psma_lymphs_loc: this.part4.pt4_psma_lymphs_loc,
          pt4_psma_lymphs_suv: this.part4.pt4_psma_lymphs_suv,
          pt4_psma_lymphs_meas: this.part4.pt4_psma_lymphs_meas,
          pt4_psma_bone: this.part4.pt4_psma_bone,
          pt4_psma_bone_loc: this.part4.pt4_psma_bone_loc,
          pt4_psma_bone_suv: this.part4.pt4_psma_bone_suv,
          pt4_psma_bone_meas: this.part4.pt4_psma_bone_meas,
          pt4_psma_brain: this.part4.pt4_psma_brain,
          pt4_psma_brain_loc: this.part4.pt4_psma_brain_loc,
          pt4_psma_brain_suv: this.part4.pt4_psma_brain_suv,
          pt4_psma_brain_meas: this.part4.pt4_psma_brain_meas,
          pt4_psma_lungs: this.part4.pt4_psma_lungs,
          pt4_psma_lungs_loc: this.part4.pt4_psma_lungs_loc,
          pt4_psma_lungs_suv: this.part4.pt4_psma_lungs_suv,
          pt4_psma_lungs_meas: this.part4.pt4_psma_lungs_meas,
          pt4_psma_liver: this.part4.pt4_psma_liver,
          pt4_psma_liver_loc: this.part4.pt4_psma_liver_loc,
          pt4_psma_liver_suv: this.part4.pt4_psma_liver_suv,
          pt4_psma_liver_meas: this.part4.pt4_psma_liver_meas,
          pt4_psma_others: this.part4.pt4_psma_others,
          pt4_psma_others_loc: this.part4.pt4_psma_others_loc,
          pt4_psma_others_suv: this.part4.pt4_psma_others_suv,
          pt4_psma_others_meas: this.part4.pt4_psma_others_meas,
          pt4_fdg_prostate: this.part4.pt4_fdg_prostate,
          pt4_fdg_prostate_loc: this.part4.pt4_fdg_prostate_loc,
          pt4_fdg_prostate_suv: this.part4.pt4_fdg_prostate_suv,
          pt4_fdg_prostate_meas: this.part4.pt4_fdg_prostate_meas,
          pt4_fdg_lymphs: this.part4.pt4_fdg_lymphs,
          pt4_fdg_lymphs_loc: this.part4.pt4_fdg_lymphs_loc,
          pt4_fdg_lymphs_suv: this.part4.pt4_fdg_lymphs_suv,
          pt4_fdg_lymphs_meas: this.part4.pt4_fdg_lymphs_meas,
          pt4_fdg_bone: this.part4.pt4_fdg_bone,
          pt4_fdg_bone_loc: this.part4.pt4_fdg_bone_loc,
          pt4_fdg_bone_suv: this.part4.pt4_fdg_bone_suv,
          pt4_fdg_bone_meas: this.part4.pt4_fdg_bone_meas,
          pt4_fdg_brain: this.part4.pt4_fdg_brain,
          pt4_fdg_brain_loc: this.part4.pt4_fdg_brain_loc,
          pt4_fdg_brain_suv: this.part4.pt4_fdg_brain_suv,
          pt4_fdg_brain_meas: this.part4.pt4_fdg_brain_meas,
          pt4_fdg_lungs: this.part4.pt4_fdg_lungs,
          pt4_fdg_lungs_loc: this.part4.pt4_fdg_lungs_loc,
          pt4_fdg_lungs_suv: this.part4.pt4_fdg_lungs_suv,
          pt4_fdg_lungs_meas: this.part4.pt4_fdg_lungs_meas,
          pt4_fdg_liver: this.part4.pt4_fdg_liver,
          pt4_fdg_liver_loc: this.part4.pt4_fdg_liver_loc,
          pt4_fdg_liver_suv: this.part4.pt4_fdg_liver_suv,
          pt4_fdg_liver_meas: this.part4.pt4_fdg_liver_meas,
          pt4_fdg_others: this.part4.pt4_fdg_others,
          pt4_fdg_others_loc: this.part4.pt4_fdg_others_loc,
          pt4_fdg_others_suv: this.part4.pt4_fdg_others_suv,
          pt4_fdg_others_measure: this.part4.pt4_fdg_others_measure,
          pt4_assessment: this.part4.pt4_assessment,
          pt4_plan: this.part4.pt4_plan
        }, { withCredentials: true })
        alert(response.data.message)
        location.href = '/home'
      } catch (error) {
        console.log('Error in Home.vue > ')
      }
    },
    async clearSearch() {
      this.searchString = ''
      this.readPatients()
    },
    enableEdit() {
      this.editDisabled = false
    },
    async finishEditing() {
      this.editDisabled = true
      try {
        const response = await this.axios.post(`${this.backendUrl}/api/patient/edit`, {
          part1: this.view_patient.part1,
          therapy_sessions: this.view_patient.therapy_sessions,
          post_therapy_sessions: this.view_patient.post_therapy_sessions,
          part4: this.view_patient.part4 
        }, { withCredentials: true })
        alert(response.data.message)
      } catch (error) {
        console.log('Error in Home.vue > finishEditing()', error)
        alert('Error in saving edits')
      }
    },
    // async doFilter() {
    //   try {
    //     const response = await this.axios.post('/', {filter: 'true'})
    //   } catch (error) {
    //     console.log('Error in Home.vue > doFilter()', error)
    //     alert('Error in filter')
    //   }
    // },
    // async doSearch() {
    //   try {
    //     const response = await this.axios.post('/api/patient/read', {searchString: this.searchString})
    //     this.patients = response.data.rows
    //     alert('Search done')
    //   } catch (error) {
    //     console.log('Error in Home.vue > doSearch()', error)
    //     alert('Error in doSearch()')
    //   }
    // },
    formatted_date(miliseconds) {
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      var myDate = new Date(parseInt(miliseconds))
      return myDate.toLocaleDateString("en-US", options)
    }, 
    toNew() {
      location.href = '/new'
    },
    async authorize() {
      console.log('authorize called')
      try {
        const response = await this.axios.post(`${this.backendUrl}/api/authorize`, {}, { withCredentials: true })
        await this.readPatients()
      } catch (error) {
        console.log('Error on Home.vue > authorize()')
        // alert('Error on mounted')
        location.href = '/login'
      }
    },
    parseFilter() {
      // prepares filter settings for api
      if (this.l1dropdown == 'assessment') {
        this.filter_config = this.l2_assessment
      } else if (this.l1dropdown == 'bone metastasis') {
        this.filter_config = this.l2_assessment_bone
      } else if (this.l1dropdown == 'has side effects during therapy') {
        this.filter_config = ""
      } else if (this.l1dropdown == 'lesions during screening') {
        this.filter_config = this.l2_lesion_screening
      } else if (this.l1dropdown == 'lesions during post therapy'){
        this.filter_config = {
          post_therapy_config: this.post_therapy_config, // contains which therapy number is checked
          l2_lesion_post_therapy: this.l2_lesion_post_therapy
        }
      } else if (this.l1dropdown == 'lesions during follow up') {
        this.filter_config = {
          follow_up_config: this.follow_up_config,
          l3_follow_up_lesion: this.l3_follow_up_lesion
        }
      }
    },
    async readPatients() {
      console.log('read patients called')
      try {
        this.parseFilter()
        var searchEnabled = false
        var filterEnabled = false
        // determine if search string present
        if (this.searchString != '') {
          searchEnabled = true
        }
        // determine if any filter enabled
        if (this.l1dropdown != '') {
          filterEnabled = true
        }
        var response
        if (!searchEnabled && !filterEnabled) {
          response = await this.axios.post(`${this.backendUrl}/api/patient/read`, {}, { withCredentials: true })
        } else if (searchEnabled && !filterEnabled) {
          response = await this.axios.post(`${this.backendUrl}/api/patient/read`, {searchString: this.searchString}, { withCredentials: true })
        } else if (!searchEnabled && filterEnabled) {
          response = await this.axios.post(`${this.backendUrl}/api/patient/read`, {filter: 'true', l1dropdown: this.l1dropdown, filter_config: this.filter_config}, { withCredentials: true }) // todo 
        } else {
          // both true
          response = await this.axios.post(`${this.backendUrl}/api/patient/read`, {
            searchString: this.searchString,
            filter: 'true',
            l1dropdown: this.l1dropdown,
            filter_config: this.filter_config
          }, { withCredentials: true })
        }

        this.patients = response.data.rows
        // get highest sessions
        for (let i=0; i<this.patients.length; i++) {
          if (this.patients[i].post_therapy_sessions.length > this.highestSessions) {
            this.highestSessions = this.patients[i].post_therapy_sessions.length
          }
        }
        // end get highest sessions
        // get highest follow up records
        for (let i=0; i<this.patients.length; i++) {
          if (this.patients[i].part4.length > this.highestFollowUpRecords) {
            this.highestFollowUpRecords = this.patients[i].part4.length
          }
        }
        // end get highest follow up records
      } catch (error) {
        console.log('Error on Home.vue > readPatients()', error)
        alert('Error in readPatients()')
      }
    },
    switchDiv(to) {
      this.currentDivShown = to
    },
    viewPatient(patient) {
      this.currentDivShown = 'viewPatientDiv'
      this.view_therapy_session = {}
      this.view_therapy_session_index = 1
      this.view_post_therapy_session = {}
      this.view_post_therapy_session_index = 1
      this.view_patient = patient
    },
    viewPostTherapySession(session, index) {
      this.view_post_therapy_session = session
      this.view_post_therapy_session_index = index
    },
    viewTherapySession(session, index) {
      this.view_therapy_session = session
      this.view_therapy_session_index = index
    },
    async viewFollowUp(record, index) {
      this.patient_view_follow_up = record
      this.patient_view_follow_up_index = index
    }
  },
  async mounted() {
    await this.authorize()
    // await this.readPatients()
  }
}
</script>
<template>
<div class="d-flex flex-column" style="background-color: lightgray;">
  <Header />
  <div class="d-flex flex-column p-3" style="flex: 1 1 auto;">
    <button @click="toNew()" v-if="currentDivShown == 'table'" type="button" class="align-self-center btn btn-secondary mb-3" style="background-color: #093405;">Add New Patient</button>
    <!-- Count Div -->
    <div v-if="currentDivShown == 'table'" class="align-items-center d-flex flex-column partDiv mb-2" style="flex: none;">
      <h3 class="mt-3" style="font-size: 20px; font-weight: bold;">Count / Filter</h3>
      <!-- Count Div Body -->
      <div class="align-items-center d-flex flex-row" style="gap: 20px;">
        <!-- L1 -->
        <div>
          <select v-model="l1dropdown" class="align-self-start" style="font-size: 20px; height: 25px;">
            <option value="">--Choose one--</option>
            <option value="assessment">Assessment</option>
            <option value="bone metastasis">Bone metastatis</option>
            <option value="lesions during screening">Lesions during screening</option>
            <option value="has side effects during therapy">Has side effects during therapy</option>
            <option value="lesions during post therapy">Lesions during post therapy</option>
            <option value="lesions during follow up">Lesions during follow up</option>
          </select>
        </div>
        <!-- end L1 -->
        <!-- L2 assessment -->
        <div>
          <select v-model="l2_assessment" v-if="l1dropdown == 'assessment'" class="align-self-start" style="font-size: 20px; height: 25px;">
            <option value="">--Choose One--</option>
            <option value="low risk">Low Risk</option>
            <option value="intermediate risk">Intermediate Risk</option>
            <option value="high risk">High Risk</option>
          </select>
        </div>
        <!-- end L2 assessment -->
        <!-- L2 bone metastatis -->
        <div>
          <select v-model="l2_assessment_bone" v-if="l1dropdown == 'bone metastasis'" class="align-self-start" style="font-size: 20px; height: 25px;">
            <option value="">--Choose One--</option>
            <option value="no metastasis">No Metastatis</option>
            <option value="with metastasis">With Metastatis</option>
          </select>
        </div>
        <!-- end L2 bone metastatis -->
        <!-- L2 lesion during screeening -->
        <div class="align-items-start d-flex justify-content-start flex-column input-group-text" v-if="l1dropdown == 'lesions during screening'">
          <!-- PSMA Header + Ga-68 dropdown -->
          <div class="align-items-center d-flex flex-row">
            <input v-model="l2_lesion_screening.psma" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" checked>
            <span style="margin-left:5px; font-size: 20px;">PSMA</span>
            <div class="ms-3" v-if="l2_lesion_screening.psma">
              <select v-model="l2_lesion_screening.psma_dropdown" class="align-self-start" style="font-size: 20px; height: 25px;">
                <option value="">--Choose One--</option>
                <option value="ga-68">GA-68</option>
                <option value="f-18">F-18</option>
              </select>
            </div>
          </div>
          <!-- end PSMA Header + Ga-68 dropdown -->
          <!-- PSMA Checkboxes -->
          <div v-if="l2_lesion_screening.psma" class="align-items-start d-flex flex-row mt-3" style="gap: 20px;">
            <div class="align-items-start d-flex flex-column justify-content-center">
              <div class="align-items-center d-flex flex-row">
                <input v-model="l2_lesion_screening.psma_checkboxes.prostate" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                <span style="margin-left:5px; font-size: 20px;">Prostate</span>
              </div>
              <div class="align-items-center d-flex flex-row">
                <input v-model="l2_lesion_screening.psma_checkboxes.lymph_nodes" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                <span style="margin-left:5px; font-size: 20px;">Lymph Nodes</span>
              </div>
              <div class="align-items-center d-flex flex-row">
                <input v-model="l2_lesion_screening.psma_checkboxes.bone" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                <span style="margin-left:5px; font-size: 20px;">Bone</span>
              </div>
              <div class="align-items-center d-flex flex-row justify-content-center">
                <input v-model="l2_lesion_screening.psma_checkboxes.other" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                <span style="margin-left:5px; font-size: 20px;">Other</span>
              </div>
            </div>
            <div class="align-items-start d-flex flex-column justify-content-center">
              <div class="align-items-center d-flex flex-row">
                <input v-model="l2_lesion_screening.psma_checkboxes.brain" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                <span style="margin-left:5px; font-size: 20px;">Brain</span>
              </div>
              <div class="align-items-center d-flex flex-row justify-content-center">
                <input v-model="l2_lesion_screening.psma_checkboxes.lungs" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                <span style="margin-left:5px; font-size: 20px;">Lungs</span>
              </div>
              <div class="align-items-center d-flex flex-row justify-content-center">
                <input v-model="l2_lesion_screening.psma_checkboxes.liver" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                <span style="margin-left:5px; font-size: 20px;">Liver</span>
              </div>
            </div>
          </div>
          <!-- end PSMA Checkboxes -->
        </div>
        <div v-if="l1dropdown == 'lesions during screening'" class="align-items-start d-flex flex-column input-group-text">
          <!-- FDG Header -->
          <div class="align-items-center d-flex flex-row justify-content-center">
            <input v-model="l2_lesion_screening.fdg" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" checked>
            <span style="margin-left:5px; font-size: 20px;">FDG PET/C</span>
          </div>
          <!-- end FDG Header -->
          <!-- FDG Checkboxes -->
          <div v-if="l2_lesion_screening.fdg" class="align-items-start d-flex flex-row justify-content-start mt-3" style="gap: 20px;">
            <div class="align-items-start d-flex flex-column justify-content-center">
              <div class="align-items-center d-flex flex-row">
                <input v-model="l2_lesion_screening.fdg_checkboxes.prostate" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                <span style="margin-left:5px; font-size: 20px;">Prostate</span>
              </div>
              <div class="align-items-center d-flex flex-row">
                <input v-model="l2_lesion_screening.fdg_checkboxes.lymph_nodes" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                <span style="margin-left:5px; font-size: 20px;">Lymph Nodes</span>
              </div>
              <div class="align-items-center d-flex flex-row">
                <input v-model="l2_lesion_screening.fdg_checkboxes.bone" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                <span style="margin-left:5px; font-size: 20px;">Bone</span>
              </div>
              <div class="align-items-center d-flex flex-row">
                <input v-model="l2_lesion_screening.fdg_checkboxes.other" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                <span style="margin-left:5px; font-size: 20px;">Other</span>
              </div>
            </div>
            <div class="align-items-start d-flex flex-column justify-content-center">
              <div class="align-items-center d-flex flex-row">
                <input v-model="l2_lesion_screening.fdg_checkboxes.brain" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                <span style="margin-left:5px; font-size: 20px;">Brain</span>
              </div>
              <div class="align-items-center d-flex flex-row justify-content-center">
                <input v-model="l2_lesion_screening.fdg_checkboxes.lungs" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                <span style="margin-left:5px; font-size: 20px;">Lungs</span>
              </div>
              <div class="align-items-center d-flex flex-row justify-content-center">
                <input v-model="l2_lesion_screening.fdg_checkboxes.liver" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                <span style="margin-left:5px; font-size: 20px;">Liver</span>
              </div>
            </div>
          </div>
          <!-- end FDG Checkboxes -->
        </div>
        <!-- end L2 lesion during screeening -->
        <!-- L2 post therapy lesion checkboxes -->
        <div v-if="l1dropdown == 'lesions during post therapy'" class="d-flex flex-column p-1" style="border: 1px solid gray; height: 150px; overflow-y: scroll;">
          <div class="d-flex flex-row" v-for="x in highestSessions" style="gap: 5px;">
            <input v-model="post_therapy_config" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" :value="x-1">
            <label class="form-check-label" for="inlineRadio1" style="font-size: 14px;">Post Therapy #{{x}}</label>
          </div>
        </div>
        <div v-if="l1dropdown == 'lesions during post therapy'" class="d-flex flex-column p-1">
          <div class="align-items-start d-flex flex-column justify-content-center">
            <div class="align-items-center d-flex flex-row">
              <input v-model="l2_lesion_post_therapy.prostate" class="form-check-input mt-0" type="checkbox" aria-label="Checkbox for following text input">
              <span style="margin-left:5px; font-size: 20px;">Prostate</span>
            </div>
            <div class="align-items-center d-flex flex-row">
              <input v-model="l2_lesion_post_therapy.lymph_nodes" class="form-check-input mt-0" type="checkbox" aria-label="Checkbox for following text input">
              <span style="margin-left:5px; font-size: 20px;">Lymph Nodes</span>
            </div>
            <div class="align-items-center d-flex flex-row">
              <input v-model="l2_lesion_post_therapy.bone" class="form-check-input mt-0" type="checkbox" aria-label="Checkbox for following text input">
              <span style="margin-left:5px; font-size: 20px;">Bone</span>
            </div>
          </div>
          <div class="align-items-start d-flex flex-column justify-content-center">
            <div class="align-items-center d-flex flex-row justify-content-center">
              <input v-model="l2_lesion_post_therapy.lungs" class="form-check-input mt-0" type="checkbox" aria-label="Checkbox for following text input">
              <span style="margin-left:5px; font-size: 20px;">Lungs</span>
            </div>
            <div class="align-items-center d-flex flex-row justify-content-center">
              <input v-model="l2_lesion_post_therapy.liver" class="form-check-input mt-0" type="checkbox" aria-label="Checkbox for following text input">
              <span style="margin-left:5px; font-size: 20px;">Liver</span>
            </div>
          </div>
        </div>
        <!-- end L2 post therapy lesion checkboxes -->
        <!-- L2 follow up checkboxes -->
        <div v-if="l1dropdown == 'lesions during follow up'" class="d-flex flex-column p-1" style="border: 1px solid gray; height: 150px; overflow-y: scroll;">
          <div class="d-flex flex-row" v-for="x in highestFollowUpRecords" style="gap: 5px;">
            <input v-model="follow_up_config" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" :value="x-1">
            <label class="form-check-label" for="inlineRadio1" style="font-size: 14px;">Follow Up Record #{{x}}</label>
          </div>
        </div>
        <!-- end L2 follow up checkboxes -->
        <!-- L3 checkboxes -->
        <div class="align-items-start d-flex justify-content-start flex-column input-group-text" v-if="l1dropdown == 'lesions during follow up'">
          <!-- PSMA Header + Ga-68 dropdown -->
          <div class="align-items-center d-flex flex-row">
            <input v-model="l3_follow_up_lesion.psma" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
            <span style="margin-left:5px; font-size: 20px;">PSMA</span>
            <div class="ms-3" v-if="l3_follow_up_lesion.psma">
              <select v-model="l3_follow_up_lesion.psma_dropdown" class="align-self-start" style="font-size: 20px; height: 25px;">
                <option value="">--Choose One--</option>
                <option value="ga-68">GA-68</option>
                <option value="f-18">F-18</option>
              </select>
            </div>
          </div>
          <!-- end PSMA Header + Ga-68 dropdown -->
          <!-- PSMA Checkboxes -->
          <div v-if="l3_follow_up_lesion.psma" class="align-items-start d-flex flex-row mt-3" style="gap: 20px;">
            <div class="align-items-start d-flex flex-column justify-content-center">
              <div class="align-items-center d-flex flex-row">
                <input v-model="l3_follow_up_lesion.psma_checkboxes.prostate" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                <span style="margin-left:5px; font-size: 20px;">Prostate</span>
              </div>
              <div class="align-items-center d-flex flex-row">
                <input v-model="l3_follow_up_lesion.psma_checkboxes.lymph_nodes" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                <span style="margin-left:5px; font-size: 20px;">Lymph Nodes</span>
              </div>
              <div class="align-items-center d-flex flex-row">
                <input v-model="l3_follow_up_lesion.psma_checkboxes.bone" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                <span style="margin-left:5px; font-size: 20px;">Bone</span>
              </div>
            </div>
            <div class="align-items-start d-flex flex-column justify-content-center">
              <div class="align-items-center d-flex flex-row">
                <input v-model="l3_follow_up_lesion.psma_checkboxes.brain" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                <span style="margin-left:5px; font-size: 20px;">Brain</span>
              </div>
              <div class="align-items-center d-flex flex-row justify-content-center">
                <input v-model="l3_follow_up_lesion.psma_checkboxes.lungs" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                <span style="margin-left:5px; font-size: 20px;">Lungs</span>
              </div>
              <div class="align-items-center d-flex flex-row justify-content-center">
                <input v-model="l3_follow_up_lesion.psma_checkboxes.liver" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                <span style="margin-left:5px; font-size: 20px;">Liver</span>
              </div>
            </div>
          </div>
          <!-- end PSMA Checkboxes -->
        </div>
        <div v-if="l1dropdown == 'lesions during follow up'" class="align-items-start d-flex flex-column input-group-text">
          <!-- FDG Header -->
          <div class="align-items-center d-flex flex-row justify-content-center">
            <input v-model="l2_lesion_screening.fdg" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
            <span style="margin-left:5px; font-size: 20px;">FDG PET/C</span>
          </div>
          <!-- end FDG Header -->
          <!-- FDG Checkboxes -->
          <div v-if="l2_lesion_screening.fdg" class="align-items-start d-flex flex-row justify-content-start mt-3" style="gap: 20px;">
            <div class="align-items-start d-flex flex-column justify-content-center">
              <div class="align-items-center d-flex flex-row">
                <input v-model="l3_follow_up_lesion.fdg_checkboxes.prostate" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                <span style="margin-left:5px; font-size: 20px;">Prostate</span>
              </div>
              <div class="align-items-center d-flex flex-row">
                <input v-model="l3_follow_up_lesion.fdg_checkboxes.lymph_nodes" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                <span style="margin-left:5px; font-size: 20px;">Lymph Nodes</span>
              </div>
              <div class="align-items-center d-flex flex-row">
                <input v-model="l3_follow_up_lesion.fdg_checkboxes.bone" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                <span style="margin-left:5px; font-size: 20px;">Bone</span>
              </div>
            </div>
            <div class="align-items-start d-flex flex-column justify-content-center">
              <div class="align-items-center d-flex flex-row">
                <input v-model="l3_follow_up_lesion.fdg_checkboxes.brain" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                <span style="margin-left:5px; font-size: 20px;">Brain</span>
              </div>
              <div class="align-items-center d-flex flex-row justify-content-center">
                <input v-model="l3_follow_up_lesion.fdg_checkboxes.lungs" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                <span style="margin-left:5px; font-size: 20px;">Lungs</span>
              </div>
              <div class="align-items-center d-flex flex-row justify-content-center">
                <input v-model="l3_follow_up_lesion.fdg_checkboxes.liver" class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                <span style="margin-left:5px; font-size: 20px;">Liver</span>
              </div>
            </div>
          </div>
          <!-- end FDG Checkboxes -->
        </div>
        <!-- end L3 checkboxes -->
      </div>
      <!-- end Count Div Body -->
      <!-- Apply Button -->
      <button @click="readPatients()" v-if="currentDivShown == 'table'" type="button" class="align-self-center btn btn-secondary mt-2" style="background-color: #093405;">Apply</button>
      <!-- end Apply Button -->
      <h3 class="align-self-center mt-3" style="font-size: 24px; font-weight: bold;">TOTAL: <span style="color: red">{{ patients.length }}</span></h3>
    </div>
    <!-- end Count Div -->
    <!-- Search -->
    <div v-if="currentDivShown == 'table'" class="align-self-end d-flex flex-row mb-2" style="gap: 5px;">
      <input v-model="searchString" type="text" class="form-control form-control-sm" placeholder="Search by first name or last name" style="flex: none; width: 300px;">
      <button @click="readPatients()" type="button" class="btn btn-sm btn-secondary">Search</button>
      <button v-if="searchString" @click="clearSearch()" type="button" class="btn btn-sm btn-secondary">Clear Search</button>
    </div>
    <!-- end Search -->
    <!-- Table -->
    <div v-if="currentDivShown == 'table'" class="align-items-start d-flex flex-column mb-3" style="background-color: white; border: 2px solid black; flex-grow: 1; width: 100%;">
      <table class="fixed-table-body table table-bordered table-responsive" style="table-layout: fixed;">
        <thead>
          <tr>
            <th class="align-middle text-center" scope="col">Patient Code</th>
            <th class="align-middle text-center" scope="col">First Name</th>
            <th class="align-middle text-center" scope="col">Last Name</th>
            <th class="align-middle text-center" scope="col">First Visit</th>
            <th class="align-middle text-center" scope="col">Last Visit</th>
            <th class="align-middle text-center" scope="col">View Records</th>
            <th class="align-middle text-center" scope="col">Add Follow Up Record</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(obj, index) in patients" :key="index">
            <td class="text-center" style="font-size: 14px; overflow: hidden; text-overflow: ellipsis; text-transform: uppercase; white-space: nowrap;">{{patients[index].pt1_patient_code}}</td>
            <td class="text-center" style="font-size: 14px; overflow: hidden; text-overflow: ellipsis; text-transform: capitalize; white-space: nowrap;">{{patients[index].part1?.pt1_first_name ??''}}</td>
            <td class="text-center" style="font-size: 14px; overflow: hidden; text-overflow: ellipsis; text-transform: capitalize; white-space: nowrap;">{{patients[index].part1?.pt1_last_name}}</td>
            <td class="text-center" style="font-size: 14px; overflow: hidden; text-overflow: ellipsis; text-transform: capitalize; white-space: nowrap;">{{formatted_date(patients[index].first_visit)}}</td>
            <td class="text-center" style="font-size: 14px; overflow: hidden; text-overflow: ellipsis; text-transform: capitalize; white-space: nowrap;">{{formatted_date(patients[index].last_visit)}}</td>
            <td>
              <!-- View Records Button -->
              <div @click="viewPatient(patients[index])" class="align-items-center d-flex flex-row hoverTransform justify-content-center m-auto">
                <span class="myButton1" style="background-color: #7F6000;">View Records</span>
              </div>
              <!-- end View Records Button -->
            </td>
            <td>
              <!-- Add Follow Up Record -->
              <div @click="addFollowUpRecord(patients[index])" class="align-items-center d-flex flex-row hoverTransform justify-content-center m-auto">
                <span class="myButton1" style="background-color: #093405;">Add Follow Up</span>
              </div>
              <!-- end Add Follow Up Record -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- end Table -->
    <!-- View Patient Div -->
    <div v-if="currentDivShown == 'viewPatientDiv'" class="d-flex flex-column p-3" style="background-color: white; border: 2px solid black;">
      <!-- View Patient Header -->
      <div class="d-flex flex-row justify-content-between mb-4">
        <h1 style="font-size: 20px; font-weight: bold;">View Patient</h1>
        <span @click="switchDiv('table')" class="myButton1" style="background-color: #7F6000;">Close Record</span>
      </div>
      <!-- end View Patient Header -->
      <h3 style="font-size: 18px; font-weight: bold;">Record of First Visit</h3>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button style="font-weight: bold;" class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Part 1: Demographics
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body partDiv">
              <!-- Part 1 -->
                <span v-if="editDisabled" @click="enableEdit()" class="align-self-start myButton1" style="background-color: #7F6000;">Edit Record</span>
                <span v-if="!editDisabled" @click="finishEditing()" class="align-self-start myButton1" style="background-color: #023020;">Finish Editing</span>
                
                <!-- 1.1 -->
                <b>1.1 Demographics</b>
                <div class="input-group input-group-sm">
                  <span class="input-group-text">a. Patient Code</span>
                  <input v-model="view_patient.part1.pt1_patient_code" disabled type="text" class="form-control" placeholder="" style="flex: none; min-width: 250px;">
                </div>
                <div class="input-group input-group-sm">
                  <span class="input-group-text">b. First Name</span>
                  <input v-model="view_patient.part1.pt1_first_name" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                </div>
                <div class="input-group input-group-sm">
                  <span class="input-group-text">c. Last Name</span>
                  <input v-model="view_patient.part1.pt1_last_name" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                </div>
                <div class="input-group input-group-sm">
                  <span class="input-group-text">d. Age</span>
                  <input v-model="view_patient.part1.pt1_age" :disabled="editDisabled" type="number" class="form-control" placeholder="" style="flex: none; min-width: 100px;">
                </div>
                <div class="input-group input-group-sm">
                  <span class="input-group-text">e. City of Residence</span>
                  <input v-model="view_patient.part1.pt1_city" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                </div>
                <div class="input-group input-group-sm">
                  <span class="input-group-text">f. Date of Diagnosis</span>
                  <input v-model="view_patient.part1.pt1_date_diag" :disabled="editDisabled" type="text" class="form-control" placeholder="month/day/year or year" style="flex: none; min-width: 200px;">
                </div>
                <div class="input-group input-group-sm">
                  <span class="input-group-text">g. Date of Surgery</span>
                  <input v-model="view_patient.part1.pt1_date_surgery" :disabled="editDisabled" type="text" class="form-control" placeholder="month/day/year or year" style="flex: none; min-width: 200px;">
                </div>
                <div class="input-group input-group-sm">
                  <span class="input-group-text">h. Histopath Result</span>
                  <input v-model="view_patient.part1.pt1_histo" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 500px;">
                </div>
                <!-- Reference: https://www.cancer.net/cancer-types/prostate-cancer/stages-and-grades#:~:text=The%20Gleason%20scoring%20system%20is,cells%20receive%20a%20low%20score. -->
                <div class="input-group input-group-sm">
                  <span class="input-group-text">i. Gleason Score</span>
                  <select v-model="view_patient.part1.pt1_gs" :disabled="editDisabled" name="gleason_score" style="font-size: 14px;">
                    <option value="X">X (cannot be determined)</option>
                    <option value="6 or lower">6 or lower (well differentiated)</option>
                    <option value="7">7 (moderately differentiated)</option>
                    <option value="8">8 (poorly differentiated)</option>
                    <option value="9">9 (poorly differentiated)</option>
                    <option value="10">10 (poorly differentiated)</option>
                  </select>
                </div>
                <div class="input-group input-group-sm">
                  <span class="input-group-text">j. Date of Treatment</span>
                  <input v-model="view_patient.part1.pt1_date_treatment" :disabled="editDisabled" type="date" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                </div>
                <div class="input-group input-group-sm">
                  <span class="input-group-text">Type of Treatment</span>
                  <select v-model="view_patient.part1.pt1_type_treatment" :disabled="editDisabled" name="type_of_treatment" style="font-size: 14px;">
                    <option value="hormonal therapy">Hormonal Therapy</option>
                    <option value="radiation therapy">Radiation Therapy</option>
                    <option value="chemotherapy">Chemotherapy</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <div v-if="view_patient.part1.pt1_type_treatment == 'others'" class="input-group input-group-sm">
                  <span class="input-group-text">Type of Treatment (Others)</span>
                  <input v-model="view_patient.part1.pt1_type_treatment_others" :disabled="editDisabled" type="text" class="form-control" placeholder="specify type of treatment" style="flex: none; min-width: 200px;">
                </div>
                <!-- end 1.1 -->
                <!-- 1.2 -->
                <b class="mt-3">1.2 Physical Examination</b>
                <!-- Reference: https://ecog-acrin.org/resources/ecog-performance-status/ -->
                <div class="input-group input-group-sm">
                  <span class="input-group-text">a. ECOG Score</span>
                  <select v-model="view_patient.part1.pt1_ecog_score" :disabled="editDisabled" name="ecog_score" style="font-size: 14px; width: 50px;">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div class="input-group input-group-sm">
                  <span class="input-group-text">b. Height (in meters)</span>
                  <input type="number" v-model="view_patient.part1.pt1_height" :disabled="editDisabled" class="form-control" placeholder="" style="flex: none; min-width: 100px;">
                </div>
                <div class="input-group input-group-sm">
                  <span class="input-group-text">c. Weight (in kg)</span>
                  <input type="number" v-model="view_patient.part1.pt1_weight" :disabled="editDisabled" class="form-control" placeholder="" style="flex: none; min-width: 100px;">
                </div>
                <div class="input-group input-group-sm">
                  <span class="input-group-text">d. Body Mass Index (BMI)</span>
                  <input type="number" disabled v-model="view_patient.part1.pt1_bmi" class="form-control" placeholder="" style="flex: none; min-width: 100px;">
                </div>
                <div class="input-group input-group-sm">
                  <span class="input-group-text">e. Blood Pressure (BP)</span>
                  <input type="text" v-model="view_patient.part1.pt1_bp" :disabled="editDisabled" class="form-control" placeholder="" style="flex: none; min-width: 100px;">
                </div>
                <div class="input-group input-group-sm">
                  <span class="input-group-text">f. Heart Rate (HR)</span>
                  <input type="text" v-model="view_patient.part1.pt1_hr" :disabled="editDisabled" class="form-control" placeholder="" style="flex: none; min-width: 100px;">
                </div>
                <div class="input-group input-group-sm">
                  <span class="input-group-text">g. Pain Score (0 to 10)</span>
                  <select v-model="view_patient.part1.pt1_pain_score" :disabled="editDisabled" name="pt1_pain_score" style="font-size: 14px; width: 50px;">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
                <span class="ms-1">h. Symptoms</span>
                <div class="input-group input-group-sm">
                  <span class="input-group-text">Local Symptoms</span>
                  <input type="text" v-model="view_patient.part1.pt1_local_symps" :disabled="editDisabled" class="form-control" placeholder="e.g. dysuria, urinary retention, polyuria, etc." style="flex: none; min-width: 500px;">
                </div>
                <div class="input-group input-group-sm">
                  <span class="input-group-text">Systemic Symptoms</span>
                  <input type="text" v-model="view_patient.part1.pt1_sys_symps" :disabled="editDisabled" class="form-control" placeholder="e.g. bone pain, weight loss, fatigue, etc." style="flex: none; min-width: 500px;">
                </div>
                <!-- end 1.2 -->
                <!-- 1.3 -->
                <b class="mt-3">1.3 Screening/Baseline</b>
                <span class="ms-1">a. Laboratory</span>
                <div class="input-group input-group-sm">
                  <span class="input-group-text">i. PSA</span>
                  <input type="text" v-model="view_patient.part1.pt1_psa" :disabled="editDisabled" class="form-control" placeholder="" style="flex: none; min-width: 500px;">
                </div>
                <div class="input-group input-group-sm">
                  <span class="input-group-text">ii. Creatinine</span>
                  <input type="text" v-model="view_patient.part1.pt1_creatinine" :disabled="editDisabled" class="form-control" placeholder="" style="flex: none; min-width: 500px;">
                </div>
                <div class="align-self-start d-flex flex-column p-2" style="border: 1px solid lightgray; border-radius: 5px; gap: 5px;">
                  <span class="ms-1" style="font-size: 14px;">iii. CBC</span>
                  <div class="d-flex flex-column ms-2" style="gap: 5px;">
                    <div class="input-group input-group-sm">
                      <span class="input-group-text">WBC</span>
                      <input type="text" v-model="view_patient.part1.pt1_wbc" :disabled="editDisabled" class="form-control" placeholder="" style="flex: 1;">
                    </div>
                    <div class="input-group input-group-sm">
                      <span class="input-group-text">RBC</span>
                      <input type="text" v-model="view_patient.part1.pt1_rbc" :disabled="editDisabled" class="form-control" placeholder="" style="flex: 1;">
                    </div>
                    <div class="input-group input-group-sm">
                      <span class="input-group-text">Hemoglobin</span>
                      <input type="text" v-model="view_patient.part1.pt1_hemoglobin" :disabled="editDisabled" class="form-control" placeholder="" style="flex: 1;">
                    </div>
                    <div class="input-group input-group-sm">
                      <span class="input-group-text">Hematocrit</span>
                      <input type="text" v-model="view_patient.part1.pt1_hematocrit" :disabled="editDisabled" class="form-control" placeholder="" style="flex: 1;">
                    </div>
                    <div class="input-group input-group-sm">
                      <span class="input-group-text">Platelet Count</span>
                      <input type="text" v-model="view_patient.part1.pt1_platelet" :disabled="editDisabled" class="form-control" placeholder="" style="flex: 1;">
                    </div>
                  </div>
                </div>
                <div class="input-group input-group-sm">
                  <span class="input-group-text">iv. Lactate Dehydrogenase</span>
                  <input type="text" v-model="view_patient.part1.pt1_lactate" :disabled="editDisabled" class="form-control" placeholder="" style="flex: none; min-width: 500px;">
                </div>
                <div class="input-group input-group-sm">
                  <span class="input-group-text">v. Alkaline Phosphatase</span>
                  <input type="text" v-model="view_patient.part1.pt1_alkaline" :disabled="editDisabled" class="form-control" placeholder="" style="flex: none; min-width: 500px;">
                </div>
                <div class="input-group input-group-sm">
                  <span class="input-group-text">vi. SGPT, SGOT, Bilirubins</span>
                  <input type="text" v-model="view_patient.part1.pt1_ssb" :disabled="editDisabled" class="form-control" placeholder="" style="flex: none; min-width: 500px;">
                </div>
                <span class="ms-1">b. Imaging</span>
                <div class="input-group input-group-sm">
                  <span class="input-group-text">i. Salivary Gland</span>
                  <select v-model="view_patient.part1.pt1_salivary" :disabled="editDisabled" name="salivary_gland" style="font-size: 14px; width: 150px;">
                    <option value="normal">Normal</option>
                    <option value="obstruction_right">Obstruction Right</option>
                    <option value="obstruction_left">Obstruction Left</option>
                  </select>
                </div>
                <div class="input-group input-group-sm">
                  <span class="input-group-text">ii. Renal Scinitigraphy</span>
                  <!-- <input type="text" v-model="part1.pt1_renal" class="form-control" placeholder="MAG3 or DTPA" style="flex: none; min-width: 500px;"> -->
                  <select v-model="view_patient.part1.pt1_renal" :disabled="editDisabled" name="pt1_bone_scan" style="font-size: 14px;">
                    <option value="mag3">MAG3</option>
                    <option value="dtpa">DTPA</option>
                  </select>
                </div>
                <div class="input-group input-group-sm">
                  <span class="input-group-text">iii. Bone Scan</span>
                  <select v-model="view_patient.part1.pt1_bone_scan" :disabled="editDisabled" name="pt1_bone_scan" style="font-size: 14px;">
                    <option value="no_mestastasis">No Metastasis</option>
                    <option value="with_metastasis">With Metastasis</option>
                  </select>
                </div>
                <div v-if="view_patient.part1.pt1_bone_scan == 'with_metastasis'" class="input-group input-group-sm">
                  <span class="input-group-text">Location</span>
                  <input v-model="view_patient.part1.pt1_bone_withmetas" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                </div>
                <div class="align-self-start p-2" style="border: 1px solid lightgray; border-radius: 5px; gap: 5px;">
                  <span style="font-size: 14px; padding-right: 1cm;">iv. PSMA</span>
                  <div class="form-check form-check-inline">
                    <input v-model="view_patient.part1.pt1_psma_picked" :disabled="editDisabled" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="ga-68">
                    <label class="form-check-label" for="inlineRadio1" style="font-size: 14px;">Ga-68</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input v-model="view_patient.part1.pt1_psma_picked" :disabled="editDisabled" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="f-18" checked>
                    <label class="form-check-label" for="inlineRadio2" style="font-size: 14px;">F-18</label>
                  </div>
                  <div class="d-flex flex-column" style="gap: 5px;">
                    <div class="input-group input-group-sm">
                      <span class="input-group-text">a. Prostate</span>
                      <select v-model="view_patient.part1.pt1_psma_prostate" :disabled="editDisabled" name="pt1_psma_prostate" style="font-size: 14px;">
                        <option value="psma_absent_prostate">Absent</option>
                        <option value="psma_present_prostate">Present</option>
                      </select>
                    </div>
                    <div v-if="view_patient.part1.pt1_psma_prostate == 'psma_present_prostate'" class="input-group input-group-sm">
                      <span class="input-group-text">Location</span>
                      <input v-model="view_patient.part1.pt1_psma_prostate_loc" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                      <span class="input-group-text">SUV</span>
                      <input v-model="view_patient.part1.pt1_psma_prostate_suv" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                      <span class="input-group-text">Measurement (cm)</span>
                      <input v-model="view_patient.part1.pt1_psma_prostate_meas" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                    </div>
                    <div class="input-group input-group-sm">
                      <span class="input-group-text">b. Lymph Nodes</span>
                      <select v-model="view_patient.part1.pt1_psma_lymphs" :disabled="editDisabled" name="pt1_psma_lymphs" style="font-size: 14px;">
                        <option value="psma_absent_node">Absent</option>
                        <option value="psma_present_node">Present</option>
                      </select>
                    </div>
                    <div v-if="view_patient.part1.pt1_psma_lymphs == 'psma_present_node'" class="input-group input-group-sm">
                      <span class="input-group-text">Location</span>
                      <input v-model="view_patient.part1.pt1_psma_lymphs_loc" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                      <span class="input-group-text">SUV</span>
                      <input v-model="view_patient.part1.pt1_psma_lymphs_suv" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                      <span class="input-group-text">Measurement (cm)</span>
                      <input v-model="view_patient.part1.pt1_psma_lymphs_meas" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                    </div>
                    <div class="input-group input-group-sm">
                      <span class="input-group-text">c. Bone</span>
                      <select v-model="view_patient.part1.pt1_psma_bone" :disabled="editDisabled" name="pt1_psma_bone" style="font-size: 14px;">
                        <option value="psma_absent_bone">Absent</option>
                        <option value="psma_present_bone">Present</option>
                      </select>
                    </div>
                    <div v-if="view_patient.part1.pt1_psma_bone == 'psma_present_bone'" class="input-group input-group-sm">
                      <span class="input-group-text">Location</span>
                      <input v-model="view_patient.part1.pt1_psma_bone_loc" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                      <span class="input-group-text">SUV</span>
                      <input v-model="view_patient.part1.pt1_psma_bone_suv" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                      <span class="input-group-text">Measurement (cm)</span>
                      <input v-model="view_patient.part1.pt1_psma_bone_meas" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                    </div>
                    <div class="input-group input-group-sm">
                      <span class="input-group-text">d. Brain</span>
                      <select v-model="view_patient.part1.pt1_psma_brain" :disabled="editDisabled" name="pt1_psma_brain" style="font-size: 14px;">
                        <option value="psma_absent_brain">Absent</option>
                        <option value="psma_present_brain">Present</option>
                      </select>
                    </div>
                    <div v-if="view_patient.part1.pt1_psma_brain == 'psma_present_brain'" class="input-group input-group-sm">
                      <span class="input-group-text">Location</span>
                      <input v-model="view_patient.part1.pt1_psma_brain_loc" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                      <span class="input-group-text">SUV</span>
                      <input v-model="view_patient.part1.pt1_psma_brain_suv" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                      <span class="input-group-text">Measurement (cm)</span>
                      <input v-model="view_patient.part1.pt1_psma_brain_meas" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                    </div>
                    <div class="input-group input-group-sm">
                      <span class="input-group-text">e. Lungs</span>
                      <select v-model="view_patient.part1.pt1_psma_lungs" :disabled="editDisabled" name="pt1_psma_lungs" style="font-size: 14px;">
                        <option value="psma_absent_lungs">Absent</option>
                        <option value="psma_present_lungs">Present</option>
                      </select>
                    </div>
                    <div v-if="view_patient.part1.pt1_psma_lungs == 'psma_present_lungs'" class="input-group input-group-sm">
                      <span class="input-group-text">Location</span>
                      <input v-model="view_patient.part1.pt1_psma_lungs_loc" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                      <span class="input-group-text">SUV</span>
                      <input v-model="view_patient.part1.pt1_psma_lungs_suv" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                      <span class="input-group-text">Measurement (cm)</span>
                      <input v-model="view_patient.part1.pt1_psma_lungs_meas" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                    </div>
                    <div class="input-group input-group-sm">
                      <span class="input-group-text">f. Liver</span>
                      <select v-model="view_patient.part1.pt1_psma_liver" :disabled="editDisabled" name="pt1_psma_liver" style="font-size: 14px;">
                        <option value="psma_absent_liver">Absent</option>
                        <option value="psma_present_liver">Present</option>
                      </select>
                    </div>
                    <div v-if="view_patient.part1.pt1_psma_liver == 'psma_present_liver'" class="input-group input-group-sm">
                      <span class="input-group-text">Location</span>
                      <input v-model="view_patient.part1.pt1_psma_liver_loc" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                      <span class="input-group-text">SUV</span>
                      <input v-model="view_patient.part1.pt1_psma_liver_suv" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                      <span class="input-group-text">Measurement (cm)</span>
                      <input v-model="view_patient.part1.pt1_psma_liver_meas" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                    </div>
                    <div class="input-group input-group-sm">
                      <span class="input-group-text">g. Others</span>
                      <select v-model="view_patient.part1.pt1_psma_others" :disabled="editDisabled" name="pt1_psma_others" style="font-size: 14px;">
                        <option value="psma_absent_other">Absent</option>
                        <option value="psma_present_others">Present</option>
                      </select>
                    </div>
                    <div v-if="view_patient.part1.pt1_psma_others == 'psma_present_others'" class="input-group input-group-sm">
                      <span class="input-group-text">Location</span>
                      <input v-model="view_patient.part1.pt1_psma_others_loc" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                      <span class="input-group-text">SUV</span>
                      <input v-model="view_patient.part1.pt1_psma_others_suv" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                      <span class="input-group-text">Measurement (cm)</span>
                      <input v-model="view_patient.part1.pt1_psma_others_meas" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                    </div>
                  </div>
                </div>
                <div class="align-self-start d-flex flex-column p-2" style="border: 1px solid lightgray; border-radius: 5px; gap: 5px;">
                  <span style="padding-right:1cm">v. FDG PET/CT</span>
                  <div class="input-group input-group-sm">
                  <span class="input-group-text">a. Prostate</span>
                  <select v-model="view_patient.part1.pt1_fdg_prostate" :disabled="editDisabled" name="pt1_fdg_prostate" style="font-size: 14px;">
                    <option value="fdg_absent_prostate">Absent</option>
                    <option value="fdg_present_prostate">Present</option>
                  </select>
                  </div>
                  <div v-if="view_patient.part1.pt1_fdg_prostate == 'fdg_present_prostate'" class="input-group input-group-sm">
                    <span class="input-group-text">Location</span>
                    <input v-model="view_patient.part1.pt1_fdg_prostate_loc" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                    <span class="input-group-text">SUV</span>
                    <input v-model="view_patient.part1.pt1_fdg_prostate_suv" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                    <span class="input-group-text">Measurement (cm)</span>
                    <input v-model="view_patient.part1.pt1_fdg_prostate_meas" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                  </div>
                  <div class="input-group input-group-sm">
                  <span class="input-group-text">b. Lymph Nodes</span>
                  <select v-model="view_patient.part1.pt1_fdg_lymphs" :disabled="editDisabled" name="pt1_fdg_lymphs" style="font-size: 14px;">
                    <option value="absent_node">Absent</option>
                    <option value="fdg_present_node">Present</option>
                  </select>
                  </div>
                  <div v-if="view_patient.part1.pt1_fdg_lymphs == 'fdg_present_node'" class="input-group input-group-sm">
                    <span class="input-group-text">Location</span>
                    <input v-model="view_patient.part1.pt1_fdg_lymphs_loc" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                    <span class="input-group-text">SUV</span>
                    <input v-model="view_patient.part1.pt1_fdg_lymphs_suv" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                    <span class="input-group-text">Measurement (cm)</span>
                    <input v-model="view_patient.part1.pt1_fdg_lymphs_meas" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                  </div>
                  <div class="input-group input-group-sm">
                  <span class="input-group-text">c. Bone</span>
                  <select v-model="view_patient.part1.pt1_fdg_bone" :disabled="editDisabled" name="fdg_bone" style="font-size: 14px;">
                    <option value="absent_bone">Absent</option>
                    <option value="fdg_present_bone">Present</option>
                  </select>
                  </div>
                  <div v-if="view_patient.part1.pt1_fdg_bone == 'fdg_present_bone'" class="input-group input-group-sm">
                    <span class="input-group-text">Location</span>
                    <input v-model="view_patient.part1.pt1_fdg_bone_loc" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                    <span class="input-group-text">SUV</span>
                    <input v-model="view_patient.part1.pt1_fdg_bone_suv" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                    <span class="input-group-text">Measurement (cm)</span>
                    <input v-model="view_patient.part1.pt1_fdg_bone_meas" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                  </div>
                  <div class="input-group input-group-sm">
                  <span class="input-group-text">d. Brain</span>
                  <select v-model="view_patient.part1.pt1_fdg_brain" :disabled="editDisabled" name="fdg_brain" style="font-size: 14px;">
                    <option value="absent_brain">Absent</option>
                    <option value="fdg_present_brain">Present</option>
                  </select>
                  </div>
                  <div v-if="view_patient.part1.pt1_fdg_brain == 'fdg_present_brain'" class="input-group input-group-sm">
                    <span class="input-group-text">Location</span>
                    <input v-model="view_patient.part1.pt1_fdg_brain_loc" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                    <span class="input-group-text">SUV</span>
                    <input v-model="view_patient.part1.pt1_fdg_brain_suv" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                    <span class="input-group-text">Measurement (cm)</span>
                    <input v-model="view_patient.part1.pt1_fdg_brain_meas" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                  </div>
                  <div class="input-group input-group-sm">
                  <span class="input-group-text">e. Lungs</span>
                  <select v-model="view_patient.part1.pt1_fdg_lungs" :disabled="editDisabled" name="fdg_lungs" style="font-size: 14px;">
                    <option value="absent_lungs">Absent</option>
                    <option value="fdg_present_lungs">Present</option>
                  </select>
                  </div>
                  <div v-if="view_patient.part1.pt1_fdg_lungs == 'fdg_present_lungs'" class="input-group input-group-sm">
                    <span class="input-group-text">Location</span>
                    <input v-model="view_patient.part1.pt1_fdg_lungs_loc" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                    <span class="input-group-text">SUV</span>
                    <input v-model="view_patient.part1.pt1_fdg_lungs_suv" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                    <span class="input-group-text">Measurement (cm)</span>
                    <input v-model="view_patient.part1.pt1_fdg_lungs_meas" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                  </div>
                  <div class="input-group input-group-sm">
                  <span class="input-group-text">f. Liver</span>
                  <select v-model="view_patient.part1.pt1_fdg_liver" :disabled="editDisabled" name="fdg_liver" style="font-size: 14px;">
                    <option value="absent_liver">Absent</option>
                    <option value="fdg_present_liver">Present</option>
                  </select>
                  </div>
                  <div v-if="view_patient.part1.pt1_fdg_liver == 'fdg_present_liver'" class="input-group input-group-sm">
                    <span class="input-group-text">Location</span>
                    <input v-model="view_patient.part1.pt1_fdg_liver_loc" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                    <span class="input-group-text">SUV</span>
                    <input v-model="view_patient.part1.pt1_fdg_liver_suv" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                    <span class="input-group-text">Measurement (cm)</span>
                    <input v-model="view_patient.part1.pt1_fdg_liver_meas" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                  </div>
                  <div class="input-group input-group-sm">
                  <span class="input-group-text">g. Others</span>
                  <select v-model="view_patient.part1.pt1_fdg_others" :disabled="editDisabled" name="fdg_others" style="font-size: 14px;">
                    <option value="absent_other">Absent</option>
                    <option value="fdg_present_others">Present</option>
                  </select>
                  </div>
                  <div v-if="view_patient.part1.pt1_fdg_others == 'fdg_present_others'" class="input-group input-group-sm">
                    <span class="input-group-text">Location</span>
                    <input v-model="view_patient.part1.pt1_fdg_others_loc" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                    <span class="input-group-text">SUV</span>
                    <input v-model="view_patient.part1.pt1_fdg_others_suv" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                    <span class="input-group-text">Measurement (cm)</span>
                    <input v-model="view_patient.part1.pt1_fdg_others_meas" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                  </div>
                </div>
                <div class="input-group input-group-sm">
                  <span class="input-group-text" style="font-size: 16px;">c. Assessment</span>
                  <select v-model="view_patient.part1.pt1_assessment" :disabled="editDisabled" name="part1_new_assessment" style="font-size: 14px; width: 150px;">
                    <option value="low_risk">Low Risk</option>
                    <option value="inter_risk">Intermediate Risk</option>
                    <option value="high_risk">High Risk</option>
                  </select>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" style="font-size: 16px;">d. Plan</span>
                  <textarea class="form-control" v-model="view_patient.part1.pt1_new_plan" :disabled="editDisabled" type="text" aria-label="part1_new_plan" style="font-size: 12px;"></textarea>
                </div>
                <!-- end 1.3 -->
              <!-- end Part 1 -->
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button style="font-weight: bold;" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Part 2: Therapy
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <!-- Part 2 -->
              <!-- Pagination -->
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li @click="viewTherapySession(this.view_patient.therapy_sessions[index], index)" v-for="(obj, index) in this.view_patient.therapy_sessions" :key="index" class="page-item"><a class="page-link" href="#">{{index+1}}</a></li>
                </ul>
              </nav>
              <!-- end Pagination -->
              <!-- Therapy -->
              <div v-if="this.view_therapy_session.therapy_session_id" class="partDiv">
                <span v-if="editDisabled" @click="enableEdit()" class="align-self-start myButton1" style="background-color: #7F6000;">Edit Record</span>
                <span v-if="!editDisabled" @click="finishEditing()" class="align-self-start myButton1" style="background-color: #023020;">Finish Editing</span>
                <div class="d-flex flex-column p-2" style="border: 1px solid lightgray; gap: 5px;">
                  <div class="input-group input-group-sm">
                    <span class="input-group-text">Therapy Code:</span>
                    <input v-model="this.view_therapy_session.therapy_session_id" disabled type="text" class="form-control" placeholder="" style="flex: none; min-width: 300px;">
                  </div>
                </div>
                <div class="d-flex flex-column p-2" style="border: 1px solid lightgray; gap: 5px;">
                  <div class="input-group input-group-sm">
                    <span class="input-group-text">Date of #{{view_therapy_session_index+1}} PSMA-directed Radioligand Therapy (PSMA-RLT)</span>
                    <input v-model="this.view_therapy_session.pt2_date_psma" :disabled="editDisabled" type="date" class="form-control" placeholder="" style="flex: none; min-width: 300px;">
                  </div>
                  <div class="input-group mt-3">
                    <span class="input-group-text" style="font-size: 14px;">Pre-medications</span>
                    <textarea v-model="this.view_therapy_session.pt2_premed" class="form-control" :disabled="editDisabled" aria-label="new_plan" style="font-size: 12px;"></textarea>
                  </div>
                  <div class="input-group mb-2">
                    <span class="input-group-text" style="font-size: 14px;">Medications (including Furosemide)</span>
                    <textarea v-model="this.view_therapy_session.pt2_med" :disabled="editDisabled" class="form-control" aria-label="new_plan" style="font-size: 12px;" ></textarea>
                  </div>
                  <span class="ms-1">Vital Signs</span>
                  <div class="align-self-start d-flex flex-column p-2" style="border: 1px solid lightgray; border-radius: 5px; gap: 5px;">
                    <div class="d-flex flex-column ms-2" style="gap: 5px;">
                      <div class="input-group input-group-sm">
                        <span class="input-group-text">Blood Pressure (BP)</span>
                        <input v-model="this.view_therapy_session.pt2_bp" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 180px;">
                      </div>
                      <div class="input-group input-group-sm">
                        <span class="input-group-text">Heart Rate (HR)</span>
                        <input v-model="this.view_therapy_session.pt2_hr" :disabled="editDisabled" type="number" class="form-control" placeholder="in beats per minute" style="flex: none; min-width: 180px;" >
                      </div>
                      <div class="input-group input-group-sm">
                        <span class="input-group-text">Respiratory Rate (RR)</span>
                        <input v-model="this.view_therapy_session.pt2_rr" type="number" :disabled="editDisabled" class="form-control" placeholder="in breaths per minute" style="flex: none; min-width: 180px;" >
                      </div>
                      <div class="input-group input-group-sm">
                        <span class="input-group-text">O2 Sat</span>
                        <input v-model="this.view_therapy_session.pt2_o2" type="number" :disabled="editDisabled" class="form-control" placeholder="in percentage" style="flex: none; min-width: 157px;" >
                      </div>
                    </div>
                  </div>
                  <div class="input-group input-group-sm mt-2 mb-2">
                    <span class="input-group-text">Date of therapy</span>
                    <input v-model="this.view_therapy_session.pt2_date_therapy" :disabled="editDisabled" type="date" class="form-control" placeholder="" style="flex: none; min-width: 150px;" >
                  </div>
                  <div class="input-group input-group-sm">
                    <span class="input-group-text">Radiopharm</span>
                    <input v-model="this.view_therapy_session.pt2_radiopharm" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 180px;" >
                  </div>
                  <div class="input-group input-group-sm">
                    <span class="input-group-text">Activity</span>
                    <input v-model="this.view_therapy_session.pt2_activity" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 180px;" >
                  </div>
                  <div class="input-group input-group-sm mt-2">
                    <span class="ms-1">Side effects (report 0 or more side effects)</span>
                    <div class="input-group mb-1 mt-1">
                      <div class="input-group-text">
                        <input true-value="1" v-model="this.view_therapy_session.pt2_fatigue" :disabled="editDisabled" class="form-check-input mt-0" type="checkbox" aria-label="pt2_side_checkbox" >
                        <span class="input-group-text" style="margin-left:5px; font-size: 12px;">Fatigue</span>
                      </div>
                      <input v-if="this.view_therapy_session.pt2_fatigue" v-model="this.view_therapy_session.pt2_fatigue_text" :disabled="editDisabled" type="text" class="form-control" aria-label="pt2_side_textbox" >
                    </div>
                    <div class="input-group mb-1">
                      <div class="input-group-text">
                        <input true-value="1" v-model="this.view_therapy_session.pt2_nausea" class="form-check-input mt-0" :disabled="editDisabled" type="checkbox" aria-label="pt2_side_checkbox" >
                        <span class="input-group-text" style="margin-left:5px; font-size: 12px;">Nausea/Vomiting</span>
                      </div>
                      <input v-if="this.view_therapy_session.pt2_nausea" v-model="this.view_therapy_session.pt2_nausea_text" :disabled="editDisabled" type="text" class="form-control" aria-label="pt2_side_textbox">
                    </div>
                    <div class="input-group mb-1">
                      <div class="input-group-text">
                        <input true-value="1" v-model="this.view_therapy_session.pt2_dry_lips" class="form-check-input mt-0" :disabled="editDisabled" type="checkbox" aria-label="pt2_side_checkbox" >
                        <span class="input-group-text" style="margin-left:5px; font-size: 12px;">Dry Lips/Mouth</span>
                      </div>
                      <input v-if="this.view_therapy_session.pt2_dry_lips" v-model="this.view_therapy_session.pt2_dry_lips_text" :disabled="editDisabled" type="text" class="form-control" aria-label="pt2_side_textbox">
                    </div>
                    <div class="input-group mb-1">
                      <div class="input-group-text">
                        <input true-value="1" v-model="this.view_therapy_session.pt2_headache" class="form-check-input mt-0" :disabled="editDisabled" type="checkbox" aria-label="pt2_side_checkbox">
                        <span class="input-group-text" style="margin-left:5px; font-size: 12px;">Headache</span>
                      </div>
                      <input v-if="this.view_therapy_session.pt2_headache" v-model="this.view_therapy_session.pt2_headache_text" :disabled="editDisabled" type="text" class="form-control" aria-label="pt2_side_textbox">
                    </div>
                    <div class="input-group mb-1">
                      <div class="input-group-text">
                        <input true-value="1" v-model="this.view_therapy_session.pt2_bone_pain" class="form-check-input mt-0" :disabled="editDisabled" type="checkbox" aria-label="pt2_side_checkbox">
                        <span class="input-group-text" style="margin-left:5px; font-size: 12px;">Bone Pain</span>
                      </div>
                      <input v-if="this.view_therapy_session.pt2_bone_pain" v-model="this.view_therapy_session.pt2_bone_pain_text" :disabled="editDisabled" type="text" class="form-control" aria-label="pt2_side_textbox">
                    </div>
                    <div class="input-group mb-1">
                      <div class="input-group-text">
                        <input true-value="1" v-model="this.view_therapy_session.pt2_others" class="form-check-input mt-0" :disabled="editDisabled" type="checkbox" value="pt2_others" aria-label="pt2_side_checkbox" >
                        <span class="input-group-text" style="margin-left:5px; font-size: 12px;">Others</span>
                      </div>
                      <input v-if="this.view_therapy_session.pt2_others" v-model="this.view_therapy_session.pt2_others_text" :disabled="editDisabled" type="text" class="form-control" aria-label="pt2_side_textbox">
                    </div>
                  </div>
                </div>
                <!-- end Therapy -->
              </div>
              <!-- end Part 2 -->
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingThree">
            <button style="font-weight: bold;" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Part 3: Post Therapy
            </button>
          </h2>
          <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <!-- Part 3 -->
              <!-- Pagination -->
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li @click="viewPostTherapySession(this.view_patient.post_therapy_sessions[index], index)" v-for="(obj, index) in this.view_patient.post_therapy_sessions" :key="index" class="page-item"><a class="page-link" href="#">{{index+1}}</a></li>
                </ul>
              </nav>
              <!-- end Pagination -->
              <!-- Post Therapy Instance -->
              <div v-if="this.view_post_therapy_session.post_therapy_session_id" class="d-flex flex-column p-2" style="border: 1px solid lightgray; gap: 5px;">
                <span v-if="editDisabled" @click="enableEdit()" class="align-self-start myButton1" style="background-color: #7F6000;">Edit Record</span>
                <span v-if="!editDisabled" @click="finishEditing()" class="align-self-start myButton1" style="background-color: #023020;">Finish Editing</span>
                <div class="d-flex flex-column p-2" style="border: 1px solid lightgray; gap: 5px;">
                  <div class="input-group input-group-sm">
                    <span class="input-group-text">Post Therapy Code:</span>
                    <input v-model="this.view_post_therapy_session.post_therapy_session_id" disabled type="text" class="form-control" placeholder="" style="flex: none; min-width: 300px;">
                  </div>
                </div>
                <div class="input-group input-group-sm">
                  <span class="input-group-text">Date</span>
                  <input v-model="this.view_post_therapy_session.pt3_date_post_therapy" :disabled="editDisabled" type="date" class="form-control" placeholder="" style="flex: none; min-width: 150px;">
                </div>
                <!-- Post Therapy Header -->
                <div class="align-items-center d-flex flex-row">
                  <span class="me-3" >#{{view_post_therapy_session_index+1}} Post Therapy Scan</span>
                  <!-- Post Therapy Header Right -->
                  <input v-model="this.view_post_therapy_session.pt3_hour" :disabled="editDisabled" type="text" class="form-control p-1" placeholder="" style="flex: none; font-size: 14px; width: 30px;">
                  <span class="input-group-text p-1" style="margin-right: 10px; font-size: 14px;">(Hour)</span>
                  <div class="form-check form-check-inline">
                    <input v-model="this.view_post_therapy_session.pt3_spectct" :disabled="editDisabled" class="form-check-input" type="radio" name="spectct" id="with2" value="with2">
                    <label class="form-check-label" for="inlineRadio1" style="font-size: 14px">with SPECT/CT</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input v-model="this.view_post_therapy_session.pt3_spectct" :disabled="editDisabled" class="form-check-input" type="radio" name="spectct" id="without2" value="without2">
                    <label class="form-check-label" for="inlineRadio2" style="font-size: 14px">without SPECT</label>
                  </div>
                  <!-- end Post Therapy Header Right -->
                </div>
                <!-- end Post Therapy Header -->
                  <!-- Post Therapy Body -->
                  <div class="input-group input-group-sm">
                    <!-- Lesion -->
                    <div class="input-group input-group-sm p-3">
                      <span class="input-group-text" >Lesions</span>
                        <!-- Lesion Body -->
                        <div class="input-group mb-1">
                          <div class="input-group-text">
                            <input true-value="1" v-model="this.view_post_therapy_session.pt3_prostate" :disabled="editDisabled" class="form-check-input mt-0" type="checkbox" aria-label="pt3_lession_checkbox">
                            <span class="input-group-text" style="margin-left:5px; font-size: 12px;">Prostate</span>
                          </div>
                          <input v-if="this.view_post_therapy_session.pt3_prostate" v-model="this.view_post_therapy_session.pt3_prostate_text" :disabled="editDisabled" type="text" class="form-control" aria-label="pt3_lession_textbox">
                        </div>
                        <div class="input-group mb-1">
                          <div class="input-group-text">
                            <input true-value="1" v-model="this.view_post_therapy_session.pt3_lymph_nodes" class="form-check-input mt-0" :disabled="editDisabled" type="checkbox" aria-label="pt3_lession_checkbox">
                            <span class="input-group-text" style="margin-left:5px; font-size: 12px;">Lymph Nodes</span>
                          </div>
                          <input v-if="this.view_post_therapy_session.pt3_lymph_nodes" v-model="this.view_post_therapy_session.pt3_lymph_nodes_text" :disabled="editDisabled" type="text" class="form-control" aria-label="pt3_lession_textbox">
                        </div>
                        <div class="input-group mb-1">
                          <div class="input-group-text">
                            <input true-value="1" v-model="this.view_post_therapy_session.pt3_bones" class="form-check-input mt-0" :disabled="editDisabled" type="checkbox" aria-label="pt3_lession_checkbox">
                            <span class="input-group-text" style="margin-left:5px; font-size: 12px;">Bones</span>
                          </div>
                          <input v-if="this.view_post_therapy_session.pt3_bones" v-model="this.view_post_therapy_session.pt3_bones_text" :disabled="editDisabled" type="text" class="form-control" aria-label="pt3_lession_textbox">
                        </div>
                        <div class="input-group mb-1">
                          <div class="input-group-text">
                            <input true-value="1" v-model="this.view_post_therapy_session.pt3_lungs" class="form-check-input mt-0" :disabled="editDisabled" type="checkbox" aria-label="pt3_lession_checkbox">
                            <span class="input-group-text" style="margin-left:5px; font-size: 12px;">Lungs</span>
                          </div>
                          <input v-if="this.view_post_therapy_session.pt3_lungs" v-model="this.view_post_therapy_session.pt3_lungs_text" :disabled="editDisabled" type="text" class="form-control" aria-label="pt3_lession_textbox">
                        </div>
                        <div class="input-group mb-1">
                          <div class="input-group-text">
                            <input true-value="1" v-model="this.view_post_therapy_session.pt3_liver" class="form-check-input mt-0" :disabled="editDisabled" type="checkbox" aria-label="pt3_lession_checkbox">
                            <span class="input-group-text" style="margin-left:5px; font-size: 12px;">Liver</span>
                          </div>
                          <input v-if="this.view_post_therapy_session.pt3_liver" v-model="this.view_post_therapy_session.pt3_liver_text" :disabled="editDisabled" type="text" class="form-control" aria-label="pt3_lession_textbox">
                        </div>
                        <!-- end Lesion Body -->
                    </div>
                    <!-- end Lesion -->
                  </div>
                <!-- Dosimetry -->
                <div class="">
                  <div class="input-group input-group-sm">
                    <span class="">Dosimetry</span>
                  </div>            
                  <!-- Dosimetry Body -->
                  <div class="p-3">
                    <div class="input-group mb-1">
                      <div class="input-group-text">
                        <span class="input-group-text" style="margin-left:5px; font-size: 12px;">Salivary Gland</span>
                      </div>
                      <input v-model="this.view_post_therapy_session.pt3_sg" :disabled="editDisabled" type="text" class="form-control" aria-label="pt3_lession_textbox ">
                    </div>
                    <div class="input-group mb-1">
                      <div class="input-group-text">
                        <span class="input-group-text" style="margin-left:5px; font-size: 12px;">Left Kidney</span>
                      </div>
                      <input v-model="this.view_post_therapy_session.pt3_lk" :disabled="editDisabled" type="text" class="form-control" aria-label="pt3_lession_textbox">
                      <div class="input-group-text">
                        <span class="input-group-text" style="margin-left:5px; font-size: 12px;">Right Kidney</span>
                      </div>
                      <input v-model="this.view_post_therapy_session.pt3_rk" :disabled="editDisabled" type="text" class="form-control" aria-label="pt3_lession_textbox">
                    </div>
                  </div>
                  <!-- end Dosimetry Body -->
                </div>
                <!-- end Dosimetry -->
                  <!-- end Post Therapy Body -->
                </div>
                <!-- End Post Therapy Instance -->
              <!-- end Part 3 -->
            </div>
          </div>
        </div>
      </div>
      <!-- Follow Up Records -->
      <h3 class="mt-3" style="font-size: 18px; font-weight: bold;">Follow Up Records</h3>
        <!-- Pagination -->
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li @click="viewFollowUp(this.view_patient.part4[index], index)" v-for="(obj, index) in this.view_patient.part4" :key="index" class="page-item"><span class="page-link" style="color: blue; cursor: pointer;">{{index+1}}</span></li>
              </ul>
            </nav>
        <!-- end Pagination -->
        <!-- Follow Up Record -->
        <div v-if="patient_view_follow_up.record_id" class="p-3">
        <div class="partDiv">
          <span v-if="editDisabled" @click="enableEdit()" class="align-self-start myButton1" style="background-color: #7F6000;">Edit Record</span>
          <span v-if="!editDisabled" @click="finishEditing()" class="align-self-start myButton1" style="background-color: #023020;">Finish Editing</span>
          <div class="input-group input-group-sm">
            <span class="input-group-text">Patient Code</span>
            <input disabled v-model="view_patient.part1.pt1_patient_code" type="text" class="form-control" placeholder="" style="flex: none; min-width: 300px;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">Follow Up Record Code</span>
            <input disabled v-model="patient_view_follow_up.record_id" type="text" class="form-control" placeholder="" style="flex: none; min-width: 300px;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">Date of Follow Up</span>
            <input :disabled="editDisabled" v-model="patient_view_follow_up.pt4_date" type="date" class="form-control" placeholder="" style="flex: none; min-width: 300px;">
          </div>
          <span style="font-size: 16px; font-weight: bold;">Diagnosis</span>
          <span class="ms-1">a. Laboratory</span>
          <div class="input-group input-group-sm">
            <span class="input-group-text">i. PSA</span>
            <input :disabled="editDisabled" v-model="patient_view_follow_up.pt4_psa" type="text" class="form-control" placeholder="" style="flex: none; min-width: 500px;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">ii. Creatinine</span>
            <input :disabled="editDisabled" v-model="patient_view_follow_up.pt4_creatinine" type="text" class="form-control" placeholder="" style="flex: none; min-width: 500px;">
          </div>
          <div class="align-self-start d-flex flex-column p-2" style="border: 1px solid lightgray; border-radius: 5px; gap: 5px;">
            <span class="ms-1" style="font-size: 14px;">iii. CBC</span>
            <div class="d-flex flex-column ms-2" style="gap: 5px;">
              <div class="input-group input-group-sm">
                <span class="input-group-text">WBC</span>
                <input :disabled="editDisabled" v-model="patient_view_follow_up.pt4_wbc" type="text" class="form-control" placeholder="" style="flex: 1;">
              </div>
              <div class="input-group input-group-sm">
                <span class="input-group-text">RBC</span>
                <input :disabled="editDisabled" v-model="patient_view_follow_up.pt4_rbc" type="text" class="form-control" placeholder="" style="flex: 1;">
              </div>
              <div class="input-group input-group-sm">
                <span class="input-group-text">Hemoglobin</span>
                <input v-model="patient_view_follow_up.pt4_hemoglobin" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: 1;">
              </div>
              <div class="input-group input-group-sm">
                <span class="input-group-text">Hematocrit</span>
                <input v-model="patient_view_follow_up.pt4_hematocrit" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: 1;">
              </div>
              <div class="input-group input-group-sm">
                <span class="input-group-text">Platelet Count</span>
                <input v-model="patient_view_follow_up.pt4_platelet" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: 1;">
              </div>
            </div>
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">iv. Lactate Dehydrogenase</span>
            <input v-model="patient_view_follow_up.pt4_lactate" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 500px;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">v. Alkaline Phosphatase</span>
            <input v-model="patient_view_follow_up.pt4_alkaline" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 500px;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">vi. SGPT, SGOT, Bilirubins</span>
            <input v-model="patient_view_follow_up.pt4_ssb" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 500px;">
          </div>
          <span class="ms-1">b. Imaging</span>
          <div class="input-group input-group-sm">
            <span class="input-group-text">i. Salivary Gland</span>
            <select v-model="patient_view_follow_up.pt4_salivary" :disabled="editDisabled" name="salivary_gland" style="font-size: 14px; width: 150px;">
              <option value="normal">Normal</option>
              <option value="obstruction_right">Obstruction Right</option>
              <option value="obstruction_left">Obstruction Left</option>
            </select>
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">ii. Renal Scinitigraphy</span>
            <input v-model="patient_view_follow_up.pt4_renal" :disabled="editDisabled" type="text" class="form-control" placeholder="MAG3 or DTPA" style="flex: none; min-width: 500px;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">iii. Bone Scan</span>
            <select v-model="patient_view_follow_up.pt4_bone_scan" :disabled="editDisabled" name="bone_scan" style="font-size: 14px;">
              <option value="no_mestastasis">No Metastasis</option>
              <option value="with_metastasis">With Metastasis</option>
            </select>
          </div>
          <div v-if="patient_view_follow_up.pt4_bone_scan == 'with_metastasis'" :disabled="editDisabled" class="input-group input-group-sm">
            <span class="input-group-text">Location</span>
            <input v-model="patient_view_follow_up.pt4_withmetas" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          </div>
          <div class="align-self-start p-2" style="border: 1px solid lightgray; border-radius: 5px; gap: 5px;">
            <span style="font-size: 14px; padding-right: 1cm;">iv. PSMA</span>
          <div class="form-check form-check-inline">
            <input  v-model="patient_view_follow_up.pt4_psma_picked" :disabled="editDisabled" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="fu_ga">
            <label class="form-check-label" for="inlineRadio1" style="font-size: 14px;">Ga-68</label>
          </div>
          <div class="form-check form-check-inline">
            <input v-model="patient_view_follow_up.pt4_psma_picked" :disabled="editDisabled" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="fu_f">
            <label class="form-check-label" for="inlineRadio2" style="font-size: 14px;">F-18</label>
          </div>
            <div class="d-flex flex-column" style="gap: 5px;">
              <div class="input-group input-group-sm">
                <span class="input-group-text">a. Prostate</span>
                <select v-model="patient_view_follow_up.pt4_psma_picked" :disabled="editDisabled" name="psma_prostate" style="font-size: 14px;">
                  <option value="absent_prostate">Absent</option>
                  <option value="psma_present_prostate">Present</option>
                </select>
              </div>
              <div v-if="patient_view_follow_up.pt4_psma_picked == 'psma_present_prostate'" class="input-group input-group-sm">
                <span class="input-group-text">Location</span>
                <input v-model="patient_view_follow_up.pt4_psma_prostate_loc" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                <span class="input-group-text">SUV</span>
                <input v-model="patient_view_follow_up.pt4_psma_prostate_suv" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                <span class="input-group-text">Measurement (cm)</span>
                <input v-model="patient_view_follow_up.pt4_psma_prostate_meas" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              </div>
              <div class="input-group input-group-sm">
                <span class="input-group-text">b. Lymph Nodes</span>
                <select v-model="patient_view_follow_up.pt4_psma_lymphs" :disabled="editDisabled" name="psma_lymphn" style="font-size: 14px;">
                  <option value="absent_node">Absent</option>
                  <option value="psma_present_node">Present</option>
                </select>
              </div>
              <div v-if="patient_view_follow_up.pt4_psma_lymphs == 'psma_present_node'" class="input-group input-group-sm">
                <span class="input-group-text">Location</span>
                <input v-model="patient_view_follow_up.pt4_psma_lymphs_loc" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                <span class="input-group-text">SUV</span>
                <input v-model="patient_view_follow_up.pt4_psma_lymphs_suv" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                <span class="input-group-text">Measurement (cm)</span>
                <input v-model="patient_view_follow_up.pt4_psma_lymphs_meas" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              </div>
              <div class="input-group input-group-sm">
                <span class="input-group-text">c. Bone</span>
                <select v-model="patient_view_follow_up.pt4_psma_bone" :disabled="editDisabled" name="psma_bone" style="font-size: 14px;">
                  <option value="absent_bone">Absent</option>
                  <option value="psma_present_bone">Present</option>
                </select>
              </div>
              <div v-if="patient_view_follow_up.pt4_psma_bone == 'psma_present_bone'" class="input-group input-group-sm">
                <span class="input-group-text">Location</span>
                <input v-model="patient_view_follow_up.pt4_psma_bone_loc"  :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                <span class="input-group-text">SUV</span>
                <input v-model="patient_view_follow_up.pt4_psma_bone_suv" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                <span class="input-group-text">Measurement (cm)</span>
                <input v-model="patient_view_follow_up.pt4_psma_bone_meas" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              </div>
              <div class="input-group input-group-sm">
                <span class="input-group-text">d. Brain</span>
                <select v-model="patient_view_follow_up.pt4_psma_brain" :disabled="editDisabled" name="psma_brain" style="font-size: 14px;">
                  <option value="absent_brain">Absent</option>
                  <option value="psma_present_brain">Present</option>
                </select>
              </div>
              <div v-if="patient_view_follow_up.pt4_psma_brain == 'psma_present_brain'" class="input-group input-group-sm">
                <span class="input-group-text">Location</span>
                <input v-model="patient_view_follow_up.pt4_psma_brain_loc" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                <span class="input-group-text">SUV</span>
                <input v-model="patient_view_follow_up.pt4_psma_brain_suv" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                <span class="input-group-text">Measurement (cm)</span>
                <input v-model="patient_view_follow_up.pt4_psma_brain_meas" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              </div>
              <div class="input-group input-group-sm">
                <span class="input-group-text">e. Lungs</span>
                <select v-model="patient_view_follow_up.pt4_psma_lungs" :disabled="editDisabled" name="psma_lungs" style="font-size: 14px;">
                  <option value="absent_lungs">Absent</option>
                  <option value="psma_present_lungs">Present</option>
                </select>
              </div>
              <div v-if="patient_view_follow_up.pt4_psma_lungs == 'psma_present_lungs'" class="input-group input-group-sm">
                <span class="input-group-text">Location</span>
                <input v-model="patient_view_follow_up.pt4_psma_lungs_loc" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                <span class="input-group-text">SUV</span>
                <input v-model="patient_view_follow_up.pt4_psma_lungs_suv" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                <span class="input-group-text">Measurement (cm)</span>
                <input v-model="patient_view_follow_up.pt4_psma_lungs_meas" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              </div>
              <div class="input-group input-group-sm">
                <span class="input-group-text">f. Liver</span>
                <select v-model="patient_view_follow_up.pt4_psma_liver" :disabled="editDisabled" name="psma_liver" style="font-size: 14px;">
                  <option value="absent_liver">Absent</option>
                  <option value="psma_present_liver">Present</option>
                </select>
              </div>
              <div v-if="patient_view_follow_up.pt4_psma_liver == 'psma_present_liver'" class="input-group input-group-sm">
                <span class="input-group-text">Location</span>
                <input v-model="patient_view_follow_up.pt4_psma_liver_loc" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                <span class="input-group-text">SUV</span>
                <input v-model="patient_view_follow_up.pt4_psma_liver_suv" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                <span class="input-group-text">Measurement (cm)</span>
                <input v-model="patient_view_follow_up.pt4_psma_liver_meas" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              </div>
              <div class="input-group input-group-sm">
                <span class="input-group-text">g. Others</span>
                <select v-model="patient_view_follow_up.pt4_psma_others" :disabled="editDisabled" name="psma_others" style="font-size: 14px;">
                  <option value="absent_other">Absent</option>
                  <option value="psma_present_others">Present</option>
                </select>
              </div>
              <div v-if="patient_view_follow_up.pt4_psma_others == 'psma_present_others'" class="input-group input-group-sm">
                <span class="input-group-text">Location</span>
                <input v-model="patient_view_follow_up.pt4_psma_others_loc" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                <span class="input-group-text">SUV</span>
                <input v-model="patient_view_follow_up.pt4_psma_others_suv" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                <span class="input-group-text">Measurement (cm)</span>
                <input v-model="patient_view_follow_up.pt4_psma_others_meas" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              </div>
            </div>
          </div>
          <div class="align-self-start d-flex flex-column p-2" style="border: 1px solid lightgray; border-radius: 5px; gap: 5px;">
            <span style="padding-right:1cm">v. FDG PET/CT</span>
            <div class="input-group input-group-sm">
            <span class="input-group-text">a. Prostate</span>
            <select v-model="patient_view_follow_up.pt4_fdg_prostate" :disabled="editDisabled" name="fdg_prostate" style="font-size: 14px;">
              <option value="absent_prostate">Absent</option>
              <option value="fdg_present_prostate">Present</option>
            </select>
            </div>
            <div v-if="patient_view_follow_up.pt4_fdg_prostate == 'fdg_present_prostate'" class="input-group input-group-sm">
              <span class="input-group-text">Location</span>
              <input v-model="patient_view_follow_up.pt4_fdg_prostate_loc" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              <span class="input-group-text">SUV</span>
              <input v-model="patient_view_follow_up.pt4_fdg_prostate_suv" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              <span class="input-group-text">Measurement (cm)</span>
              <input v-model="patient_view_follow_up.pt4_fdg_prostate_meas" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            </div>
            <div class="input-group input-group-sm">
            <span class="input-group-text">b. Lymph Nodes</span>
            <select v-model="patient_view_follow_up.pt4_fdg_lymphs" :disabled="editDisabled" name="fdg_lymphn" style="font-size: 14px;">
              <option value="absent_node">Absent</option>
              <option value="fdg_present_node">Present</option>
            </select>
            </div>
            <div v-if="patient_view_follow_up.pt4_fdg_lymphs == 'fdg_present_node'" class="input-group input-group-sm">
              <span class="input-group-text">Location</span>
              <input v-model="patient_view_follow_up.pt4_fdg_lymphs_loc" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              <span class="input-group-text">SUV</span>
              <input v-model="patient_view_follow_up.pt4_fdg_lymphs_suv" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              <span class="input-group-text">Measurement (cm)</span>
              <input v-model="patient_view_follow_up.pt4_fdg_present_node" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            </div>
            <div class="input-group input-group-sm">
            <span class="input-group-text">c. Bone</span>
            <select v-model="patient_view_follow_up.pt4_fdg_bone" :disabled="editDisabled" name="fdg_bone" style="font-size: 14px;">
              <option value="absent_bone">Absent</option>
              <option value="fdg_present_bone">Present</option>
            </select>
            </div>
            <div v-if="patient_view_follow_up.pt4_fdg_bone == 'fdg_present_bone'" class="input-group input-group-sm">
              <span class="input-group-text">Location</span>
              <input v-model="patient_view_follow_up.pt4_fdg_bone_loc" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              <span class="input-group-text">SUV</span>
              <input v-model="patient_view_follow_up.pt4_fdg_bone_meas" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              <span class="input-group-text">Measurement (cm)</span>
              <input v-model="patient_view_follow_up.pt4_fdg_bone_meas" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            </div>
            <div class="input-group input-group-sm">
            <span class="input-group-text">d. Brain</span>
            <select v-model="patient_view_follow_up.pt4_fdg_brain" :disabled="editDisabled" name="fdg_brain" style="font-size: 14px;">
              <option value="absent_brain">Absent</option>
              <option value="fdg_present_brain">Present</option>
            </select>
            </div>
            <div v-if="patient_view_follow_up.pt4_fdg_brain == 'fdg_present_brain'" class="input-group input-group-sm">
              <span class="input-group-text">Location</span>
              <input v-model="patient_view_follow_up.pt4_fdg_brain_loc" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              <span class="input-group-text">SUV</span>
              <input v-model="patient_view_follow_up.pt4_fdg_brain_suv" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              <span class="input-group-text">Measurement (cm)</span>
              <input v-model="patient_view_follow_up.pt4_fdg_brain_meas" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            </div>
            <div class="input-group input-group-sm">
            <span class="input-group-text">e. Lungs</span>
            <select v-model="patient_view_follow_up.pt4_fdg_lungs" :disabled="editDisabled" name="fdg_lungs" style="font-size: 14px;">
              <option value="absent_lungs">Absent</option>
              <option value="fdg_present_lungs">Present</option>
            </select>
            </div>
            <div v-if="patient_view_follow_up.pt4_fdg_lungs == 'fdg_present_lungs'" class="input-group input-group-sm">
              <span class="input-group-text">Location</span>
              <input v-model="patient_view_follow_up.pt4_fdg_lungs_loc" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              <span class="input-group-text">SUV</span>
              <input v-model="patient_view_follow_up.pt4_fdg_lungs_suv" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              <span class="input-group-text">Measurement (cm)</span>
              <input v-model="patient_view_follow_up.pt4_fdg_lungs_meas" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            </div>
            <div class="input-group input-group-sm">
            <span class="input-group-text">f. Liver</span>
            <select v-model="patient_view_follow_up.pt4_fdg_liver" :disabled="editDisabled" name="fdg_liver" style="font-size: 14px;">
              <option value="absent_liver">Absent</option>
              <option value="fdg_present_liver">Present</option>
            </select>
            </div>
            <div v-if="patient_view_follow_up.pt4_fdg_liver == 'fdg_present_liver'" class="input-group input-group-sm">
              <span class="input-group-text">Location</span>
              <input v-model="patient_view_follow_up.pt4_fdg_liver_loc" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              <span class="input-group-text">SUV</span>
              <input v-model="patient_view_follow_up.pt4_fdg_liver_suv" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              <span class="input-group-text">Measurement (cm)</span>
              <input v-model="patient_view_follow_up.pt4_fdg_liver_meas" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            </div>
            <div class="input-group input-group-sm">
            <span class="input-group-text">g. Others</span>
            <select v-model="patient_view_follow_up.pt4_fdg_others" :disabled="editDisabled" name="fdg_others" style="font-size: 14px;">
              <option value="absent_other">Absent</option>
              <option value="fdg_present_others">Present</option>
            </select>
            </div>
            <div v-if="patient_view_follow_up.pt4_fdg_others == 'fdg_present_others'" :disabled="editDisabled" class="input-group input-group-sm">
              <span class="input-group-text">Location</span>
              <input v-model="patient_view_follow_up.pt4_fdg_others_loc" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              <span class="input-group-text">SUV</span>
              <input v-model="patient_view_follow_up.pt4_fdg_others_suv" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              <span class="input-group-text">Measurement (cm)</span>
              <input v-model="patient_view_follow_up.pt4_fdg_others_measure" :disabled="editDisabled" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            </div>
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text" style="font-size: 16px;">c. Assessment</span>
            <select v-model="patient_view_follow_up.pt4_assessment" :disabled="editDisabled" name="fu_new_assessment" style="font-size: 14px; width: 150px;">
              <option value="low_risk">Low Risk</option>
              <option value="inter_risk">Intermediate Risk</option>
              <option value="high_risk">High Risk</option>
            </select>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" style="font-size: 16px;">d. Plan</span>
            <textarea class="form-control" v-model="patient_view_follow_up.pt4_plan" :disabled="editDisabled" name="fu_new_plan" aria-label="new_plan" style="font-size: 12px;"></textarea>
          </div>
        </div>
      </div>
        <!-- end Follow Up Record -->
      <!-- end Follow Up Records -->
    </div>
    <!-- end View Patient Div -->
    <!-- Add Follow Up Div -->
    <div v-if="currentDivShown == 'addFollowUpDiv'" class="partDiv">
      <!-- Add Follow Up Header -->
      <div class="d-flex flex-row justify-content-between mb-4">
        <h1 style="font-size: 20px; font-weight: bold;">Add Follow Up Record</h1>
        <span @click="switchDiv('table')" class="myButton1" style="background-color: #7F6000;">Cancel</span>
      </div>
      <!-- end Add Follow Up Header -->
      <!-- Follow Up Body -->
      <div class="p-3">
        <h2 style="font-weight: bold;">Add Follow Up Record</h2>
        <div class="partDiv">
          <div class="input-group input-group-sm">
            <span class="input-group-text">Patient Code</span>
            <input v-model="patient_follow_up.part1.pt1_patient_code" disabled type="text" class="form-control" placeholder="" style="flex: none; min-width: 300px;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">Date of Follow Up</span>
            <input v-model="part4.pt4_date" type="date" class="form-control" placeholder="" style="flex: none; min-width: 300px;">
          </div>
          <span style="font-size: 16px; font-weight: bold;">Diagnosis</span>
          <span class="ms-1">a. Laboratory</span>
          <div class="input-group input-group-sm">
            <span class="input-group-text">i. PSA</span>
            <input v-model="part4.pt4_psa" type="text" class="form-control" placeholder="" style="flex: none; min-width: 500px;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">ii. Creatinine</span>
            <input v-model="part4.pt4_creatinine" type="text" class="form-control" placeholder="" style="flex: none; min-width: 500px;">
          </div>
          <div class="align-self-start d-flex flex-column p-2" style="border: 1px solid lightgray; border-radius: 5px; gap: 5px;">
            <span class="ms-1" style="font-size: 14px;">iii. CBC</span>
            <div class="d-flex flex-column ms-2" style="gap: 5px;">
              <div class="input-group input-group-sm">
                <span class="input-group-text">WBC</span>
                <input v-model="part4.pt4_wbc" type="text" class="form-control" placeholder="" style="flex: 1;">
              </div>
              <div class="input-group input-group-sm">
                <span class="input-group-text">RBC</span>
                <input v-model="part4.pt4_rbc" type="text" class="form-control" placeholder="" style="flex: 1;">
              </div>
              <div class="input-group input-group-sm">
                <span class="input-group-text">Hemoglobin</span>
                <input v-model="part4.pt4_hemoglobin" type="text" class="form-control" placeholder="" style="flex: 1;">
              </div>
              <div class="input-group input-group-sm">
                <span class="input-group-text">Hematocrit</span>
                <input v-model="part4.pt4_hematocrit" type="text" class="form-control" placeholder="" style="flex: 1;">
              </div>
              <div class="input-group input-group-sm">
                <span class="input-group-text">Platelet Count</span>
                <input v-model="part4.pt4_platelet" type="text" class="form-control" placeholder="" style="flex: 1;">
              </div>
            </div>
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">iv. Lactate Dehydrogenase</span>
            <input v-model="part4.pt4_lactate" type="text" class="form-control" placeholder="" style="flex: none; min-width: 500px;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">v. Alkaline Phosphatase</span>
            <input v-model="part4.pt4_alkaline" type="text" class="form-control" placeholder="" style="flex: none; min-width: 500px;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">vi. SGPT, SGOT, Bilirubins</span>
            <input v-model="part4.pt4_ssb" type="text" class="form-control" placeholder="" style="flex: none; min-width: 500px;">
          </div>
          <span class="ms-1">b. Imaging</span>
          <div class="input-group input-group-sm">
            <span class="input-group-text">i. Salivary Gland</span>
            <select v-model="part4.pt4_salivary" name="salivary_gland" style="font-size: 14px; width: 150px;">
              <option value="normal">Normal</option>
              <option value="obstruction_right">Obstruction Right</option>
              <option value="obstruction_left">Obstruction Left</option>
            </select>
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">ii. Renal Scinitigraphy</span>
            <input v-model="part4.pt4_renal" type="text" class="form-control" placeholder="MAG3 or DTPA" style="flex: none; min-width: 500px;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">iii. Bone Scan</span>
            <select v-model="part4.pt4_bone_scan" name="bone_scan" style="font-size: 14px;">
              <option value="no metastasis">No Metastasis</option>
              <option value="with metastasis">With Metastasis</option>
            </select>
          </div>
          <div v-if="part4.pt4_bone_scan == 'with metastasis'" class="input-group input-group-sm">
            <span class="input-group-text">Location</span>
            <input v-model="part4.pt4_withmetas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          </div>
          <div class="align-self-start p-2" style="border: 1px solid lightgray; border-radius: 5px; gap: 5px;">
            <span style="font-size: 14px; padding-right: 1cm;">iv. PSMA</span>
          <div class="form-check form-check-inline">
            <input v-model="part4.pt4_psma_picked" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="ga-68">
            <label class="form-check-label" for="inlineRadio1" style="font-size: 14px;">Ga-68</label>
          </div>
          <div class="form-check form-check-inline">
            <input v-model="part4.pt4_psma_picked" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="f-18">
            <label class="form-check-label" for="inlineRadio2" style="font-size: 14px;">F-18</label>
          </div>
            <div class="d-flex flex-column" style="gap: 5px;">
              <div class="input-group input-group-sm">
                <span class="input-group-text">a. Prostate</span>
                <select v-model="part4.pt4_psma_prostate" name="psma_prostate" style="font-size: 14px;">
                  <option value="psma_absent_prostate">Absent</option>
                  <option value="psma_present_prostate">Present</option>
                </select>
              </div>
              <div v-if="part4.pt4_psma_prostate == 'psma_present_prostate'" class="input-group input-group-sm">
                <span class="input-group-text">Location</span>
                <input v-model="part4.pt4_psma_prostate_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                <span class="input-group-text">SUV</span>
                <input v-model="part4.pt4_psma_prostate_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                <span class="input-group-text">Measurement (cm)</span>
                <input v-model="part4.pt4_psma_prostate_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              </div>
              <div class="input-group input-group-sm">
                <span class="input-group-text">b. Lymph Nodes</span>
                <select v-model="part4.pt4_psma_lymphs" name="psma_lymphn" style="font-size: 14px;">
                  <option value="psma_absent_node">Absent</option>
                  <option value="psma_present_node">Present</option>
                </select>
              </div>
              <div v-if="part4.pt4_psma_lymphs == 'psma_present_node'" class="input-group input-group-sm">
                <span class="input-group-text">Location</span>
                <input v-model="part4.pt4_psma_lymphs_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                <span class="input-group-text">SUV</span>
                <input v-model="part4.pt4_psma_lymphs_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                <span class="input-group-text">Measurement (cm)</span>
                <input v-model="part4.pt4_psma_lymphs_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              </div>
              <div class="input-group input-group-sm">
                <span class="input-group-text">c. Bone</span>
                <select v-model="part4.pt4_psma_bone" name="psma_bone" style="font-size: 14px;">
                  <option value="psma_absent_bone">Absent</option>
                  <option value="psma_present_bone">Present</option>
                </select>
              </div>
              <div v-if="part4.pt4_psma_bone == 'psma_present_bone'" class="input-group input-group-sm">
                <span class="input-group-text">Location</span>
                <input v-model="part4.pt4_psma_bone_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                <span class="input-group-text">SUV</span>
                <input v-model="part4.pt4_psma_bone_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                <span class="input-group-text">Measurement (cm)</span>
                <input v-model="part4.pt4_psma_bone_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              </div>
              <div class="input-group input-group-sm">
                <span class="input-group-text">d. Brain</span>
                <select v-model="part4.pt4_psma_brain" name="psma_brain" style="font-size: 14px;">
                  <option value="psma_absent_brain">Absent</option>
                  <option value="psma_present_brain">Present</option>
                </select>
              </div>
              <div v-if="part4.pt4_psma_brain == 'psma_present_brain'" class="input-group input-group-sm">
                <span class="input-group-text">Location</span>
                <input v-model="part4.pt4_psma_brain_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                <span class="input-group-text">SUV</span>
                <input v-model="part4.pt4_psma_brain_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                <span class="input-group-text">Measurement (cm)</span>
                <input v-model="part4.pt4_psma_brain_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              </div>
              <div class="input-group input-group-sm">
                <span class="input-group-text">e. Lungs</span>
                <select v-model="part4.pt4_psma_lungs" name="psma_lungs" style="font-size: 14px;">
                  <option value="psma_absent_lungs">Absent</option>
                  <option value="psma_present_lungs">Present</option>
                </select>
              </div>
              <div v-if="part4.pt4_psma_lungs == 'psma_present_lungs'" class="input-group input-group-sm">
                <span class="input-group-text">Location</span>
                <input v-model="part4.pt4_psma_lungs_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                <span class="input-group-text">SUV</span>
                <input v-model="part4.pt4_psma_lungs_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                <span class="input-group-text">Measurement (cm)</span>
                <input v-model="part4.pt4_psma_lungs_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              </div>
              <div class="input-group input-group-sm">
                <span class="input-group-text">f. Liver</span>
                <select v-model="part4.pt4_psma_liver" name="psma_liver" style="font-size: 14px;">
                  <option value="psma_absent_liver">Absent</option>
                  <option value="psma_present_liver">Present</option>
                </select>
              </div>
              <div v-if="part4.pt4_psma_liver == 'psma_present_liver'" class="input-group input-group-sm">
                <span class="input-group-text">Location</span>
                <input v-model="part4.pt4_psma_liver_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                <span class="input-group-text">SUV</span>
                <input v-model="part4.pt4_psma_liver_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                <span class="input-group-text">Measurement (cm)</span>
                <input v-model="part4.pt4_psma_liver_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              </div>
              <div class="input-group input-group-sm">
                <span class="input-group-text">g. Others</span>
                <select v-model="part4.pt4_psma_others" name="psma_others" style="font-size: 14px;">
                  <option value="psma_absent_others">Absent</option>
                  <option value="psma_present_others">Present</option>
                </select>
              </div>
              <div v-if="part4.pt4_psma_others == 'psma_present_others'" class="input-group input-group-sm">
                <span class="input-group-text">Location</span>
                <input v-model="part4.pt4_psma_others_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                <span class="input-group-text">SUV</span>
                <input v-model="part4.pt4_psma_others_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
                <span class="input-group-text">Measurement (cm)</span>
                <input v-model="part4.pt4_psma_others_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              </div>
            </div>
          </div>
          <div class="align-self-start d-flex flex-column p-2" style="border: 1px solid lightgray; border-radius: 5px; gap: 5px;">
            <span style="padding-right:1cm">v. FDG PET/CT</span>
            <div class="input-group input-group-sm">
            <span class="input-group-text">a. Prostate</span>
            <select v-model="part4.pt4_fdg_prostate" name="fdg_prostate" style="font-size: 14px;">
              <option value="fdg_absent_prostate">Absent</option>
              <option value="fdg_present_prostate">Present</option>
            </select>
            </div>
            <div v-if="part4.pt4_fdg_prostate == 'fdg_present_prostate'" class="input-group input-group-sm">
              <span class="input-group-text">Location</span>
              <input v-model="part4.pt4_fdg_prostate_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              <span class="input-group-text">SUV</span>
              <input v-model="part4.pt4_fdg_prostate_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              <span class="input-group-text">Measurement (cm)</span>
              <input v-model="part4.pt4_fdg_prostate_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            </div>
            <div class="input-group input-group-sm">
            <span class="input-group-text">b. Lymph Nodes</span>
            <select v-model="part4.pt4_fdg_lymphs" name="fdg_lymphn" style="font-size: 14px;">
              <option value="fdg_absent_node">Absent</option>
              <option value="fdg_present_node">Present</option>
            </select>
            </div>
            <div v-if="part4.pt4_fdg_lymphs == 'fdg_present_node'" class="input-group input-group-sm">
              <span class="input-group-text">Location</span>
              <input v-model="part4.pt4_fdg_lymphs_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              <span class="input-group-text">SUV</span>
              <input v-model="part4.pt4_fdg_lymphs_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              <span class="input-group-text">Measurement (cm)</span>
              <input v-model="part4.pt4_fdg_lymphs_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            </div>
            <div class="input-group input-group-sm">
            <span class="input-group-text">c. Bone</span>
            <select v-model="part4.pt4_fdg_bone" name="fdg_bone" style="font-size: 14px;">
              <option value="fdg_absent_bone">Absent</option>
              <option value="fdg_present_bone">Present</option>
            </select>
            </div>
            <div v-if="part4.pt4_fdg_bone == 'fdg_present_bone'" class="input-group input-group-sm">
              <span class="input-group-text">Location</span>
              <input v-model="part4.pt4_fdg_bone_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              <span class="input-group-text">SUV</span>
              <input v-model="part4.pt4_fdg_bone_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              <span class="input-group-text">Measurement (cm)</span>
              <input v-model="part4.pt4_fdg_bone_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            </div>
            <div class="input-group input-group-sm">
            <span class="input-group-text">d. Brain</span>
            <select v-model="part4.pt4_fdg_brain" name="fdg_brain" style="font-size: 14px;">
              <option value="fdg_absent_brain">Absent</option>
              <option value="fdg_present_brain">Present</option>
            </select>
            </div>
            <div v-if="part4.pt4_fdg_brain == 'fdg_present_brain'" class="input-group input-group-sm">
              <span class="input-group-text">Location</span>
              <input v-model="part4.pt4_fdg_brain_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              <span class="input-group-text">SUV</span>
              <input v-model="part4.pt4_fdg_brain_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              <span class="input-group-text">Measurement (cm)</span>
              <input v-model="part4.pt4_fdg_brain_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            </div>
            <div class="input-group input-group-sm">
            <span class="input-group-text">e. Lungs</span>
            <select v-model="part4.pt4_fdg_lungs" name="fdg_lungs" style="font-size: 14px;">
              <option value="fdg_absent_lungs">Absent</option>
              <option value="fdg_present_lungs">Present</option>
            </select>
            </div>
            <div v-if="part4.pt4_fdg_lungs == 'fdg_present_lungs'" class="input-group input-group-sm">
              <span class="input-group-text">Location</span>
              <input v-model="part4.pt4_fdg_lungs_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              <span class="input-group-text">SUV</span>
              <input v-model="part4.pt4_fdg_lungs_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              <span class="input-group-text">Measurement (cm)</span>
              <input v-model="part4.pt4_fdg_lungs_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            </div>
            <div class="input-group input-group-sm">
            <span class="input-group-text">f. Liver</span>
            <select v-model="part4.pt4_fdg_liver" name="fdg_liver" style="font-size: 14px;">
              <option value="fdg_absent_liver">Absent</option>
              <option value="fdg_present_liver">Present</option>
            </select>
            </div>
            <div v-if="part4.pt4_fdg_liver == 'fdg_present_liver'" class="input-group input-group-sm">
              <span class="input-group-text">Location</span>
              <input v-model="part4.pt4_fdg_liver_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              <span class="input-group-text">SUV</span>
              <input v-model="part4.pt4_fdg_liver_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              <span class="input-group-text">Measurement (cm)</span>
              <input v-model="part4.pt4_fdg_liver_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            </div>
            <div class="input-group input-group-sm">
            <span class="input-group-text">g. Others</span>
            <select v-model="part4.pt4_fdg_others" name="fdg_others" style="font-size: 14px;">
              <option value="fdg_absent_others">Absent</option>
              <option value="fdg_present_others">Present</option>
            </select>
            </div>
            <div v-if="part4.pt4_fdg_others == 'fdg_present_others'" class="input-group input-group-sm">
              <span class="input-group-text">Location</span>
              <input v-model="part4.pt4_fdg_others_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              <span class="input-group-text">SUV</span>
              <input v-model="part4.pt4_fdg_others_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
              <span class="input-group-text">Measurement (cm)</span>
              <input v-model="part4.pt4_fdg_others_measure" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            </div>
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text" style="font-size: 16px;">c. Assessment</span>
            <select v-model="part4.pt4_assessment" name="fu_new_assessment" style="font-size: 14px; width: 150px;">
              <option value="low risk">Low Risk</option>
              <option value="inter risk">Intermediate Risk</option>
              <option value="high risk">High Risk</option>
            </select>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" style="font-size: 16px;">d. Plan</span>
            <textarea class="form-control" v-model="part4.pt4_plan" name="fu_new_plan" aria-label="new_plan" style="font-size: 12px;"></textarea>
          </div>
        </div>
      </div>
      <button @click="addFollowUpRecordAPI()" type="button" class="align-self-center btn btn-lg btn-secondary mb-3">Save Follow-up</button>
      <!-- end Follow Up Body -->
    </div>
    <!-- end Add Follow Up Div -->
  </div>
</div>
</template>
<style scoped>
.myButton1 {
  border: 1px solid white;
  border-radius: 5px; color:
  white; cursor: pointer;
  font-size: 14px;
  padding: 5px 10px;
}
.partDiv {
  background-color: white;
  border: 1px solid black;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 5px;
  padding: 20px;
  width: 100%;
}
</style>