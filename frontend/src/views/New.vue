<script>
import Header from '../components/Header.vue'
export default {
  name: 'New',
  components: {Header},
  data() {
    return {
      part1: {
        pt1_psma_prostate: 'psma_absent_prostate',
        pt1_psma_lymphs: 'psma_absent_node',
        pt1_psma_bone: 'psma_absent_bone',
        pt1_psma_brain: 'psma_absent_brain',
        pt1_psma_lungs: 'psma_absent_lungs',
        pt1_psma_liver: 'psma_absent_liver',
        pt1_psma_others: 'psma_absent_others',
        pt1_fdg_prostate: 'fdg_absent_prostate',
        pt1_fdg_lymphs: 'fdg_absent_node',
        pt1_fdg_bone: 'fdg_absent_bone',
        pt1_fdg_brain: 'fdg_absent_brain',
        pt1_fdg_lungs: 'fdg_absent_lungs',
        pt1_fdg_liver: 'fdg_absent_liver',
        pt1_fdg_others: 'fdg_absent_others',
      },
      therapy_sessions: [{}],
      shownDiv: 'part1Div',
      post_therapy_sessions: [{}]
    }
  },
  methods: {
    addPart2Therapy() {
      this.therapy_sessions.push({})
    },
    addPostTherapy() {
      this.post_therapy_sessions.push({})
    },
    async createNewPatient() {
      try {
        this.part1.pt1_bmi = this.computed_bmi()
        const response = await this.axios.post('/api/patient/create', {
          part1: this.part1,
          therapy_sessions: this.therapy_sessions,
          post_therapy_sessions: this.post_therapy_sessions
        })
        alert(response.data.message)
        location.href = '/'
      } catch (error) {
        console.log('Error in New.vue > createNewPatient()', error)
        alert('Error on creating new patient')
      }
    },
    computed_bmi() {
      return (this.part1.pt1_weight)/(this.part1.pt1_height * this.part1.pt1_height)
    },
    switchDiv(to) {
      this.shownDiv = to
    },
    toPart3() {
      for (let i=0; i<this.therapy_sessions.length-1; i++) {
        this.post_therapy_sessions.push({})
      }
      this.switchDiv('part3Div')
    }
  },
  async mounted() {
    try {
      const response = await this.axios.post('/api/patient_code/new')
      this.part1.pt1_patient_code = response.data.generated_patient_code
    } catch (error) {
      console.log('Error in New.vue > mounted()', error)
      alert('Error in generating patient code')
    }
  }
}
</script>

<template>
<div class="d-flex flex-column" style="background: lightgray;">
  <Header />
  <!-- New Body -->
  <div class="p-3">
    <h2 style="font-weight: bold;">Add New Patient</h2>
    <!-- Part 1 -->
    <div v-if="shownDiv == 'part1Div'" ref="part1Div" class="partDiv">
      <h5 style="font-weight: bold;">Part 1: Demographics</h5>
      <!-- 1.1 -->
      <b>1.1 Demographics</b>
      <div class="input-group input-group-sm">
        <span class="input-group-text">a. Patient Code</span>
        <input v-model="part1.pt1_patient_code" disabled type="text" class="form-control" placeholder="" style="flex: none; min-width: 250px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">b. First Name</span>
        <input v-model="part1.pt1_first_name" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">c. Last Name</span>
        <input v-model="part1.pt1_last_name" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">d. Age</span>
        <input v-model="part1.pt1_age" type="number" class="form-control" placeholder="" style="flex: none; min-width: 100px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">e. City of Residence</span>
        <input v-model="part1.pt1_city" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">f. Date of Diagnosis</span>
        <input v-model="part1.pt1_date_diag" type="text" class="form-control" placeholder="month/day/year or year" style="flex: none; min-width: 200px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">g. Date of Surgery</span>
        <input v-model="part1.pt1_date_surgery" type="text" class="form-control" placeholder="month/day/year or year" style="flex: none; min-width: 200px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">h. Histopath Result</span>
        <input v-model="part1.pt1_histo" type="text" class="form-control" placeholder="" style="flex: none; min-width: 500px;">
      </div>
      <!-- Reference: https://www.cancer.net/cancer-types/prostate-cancer/stages-and-grades#:~:text=The%20Gleason%20scoring%20system%20is,cells%20receive%20a%20low%20score. -->
      <div class="input-group input-group-sm">
        <span class="input-group-text">i. Gleason Score</span>
        <select v-model="part1.pt1_gs" name="gleason_score" style="font-size: 14px;">
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
        <input v-model="part1.pt1_date_treatment" type="date" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">Type of Treatment</span>
        <select v-model="part1.pt1_type_treatment" name="type_of_treatment" style="font-size: 14px;">
          <option value="hormonal therapy">Hormonal Therapy</option>
          <option value="radiation therapy">Radiation Therapy</option>
          <option value="chemotherapy">Chemotherapy</option>
          <option value="others">Others</option>
        </select>
      </div>
      <div v-if="part1.pt1_type_treatment == 'others'" class="input-group input-group-sm">
        <span class="input-group-text">Type of Treatment (Others)</span>
        <input v-model="part1.pt1_type_treatment_others" type="text" class="form-control" placeholder="specify type of treatment" style="flex: none; min-width: 200px;">
      </div>
      <!-- end 1.1 -->
      <!-- 1.2 -->
      <b class="mt-3">1.2 Physical Examination</b>
      <!-- Reference: https://ecog-acrin.org/resources/ecog-performance-status/ -->
      <div class="input-group input-group-sm">
        <span class="input-group-text">a. ECOG Score</span>
        <select v-model="part1.pt1_ecog_score" name="ecog_score" style="font-size: 14px; width: 50px;">
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
        <input type="number" v-model="part1.pt1_height" class="form-control" placeholder="" style="flex: none; min-width: 100px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">c. Weight (in kg)</span>
        <input type="number" v-model="part1.pt1_weight" class="form-control" placeholder="" style="flex: none; min-width: 100px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">d. Body Mass Index (BMI)</span>
        <input type="number" disabled :value="computed_bmi()" class="form-control" placeholder="" style="flex: none; min-width: 100px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">e. Blood Pressure (BP)</span>
        <input type="text" v-model="part1.pt1_bp" class="form-control" placeholder="" style="flex: none; min-width: 100px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">f. Heart Rate (HR)</span>
        <input type="text" v-model="part1.pt1_hr" class="form-control" placeholder="" style="flex: none; min-width: 100px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">g. Pain Score (0 to 10)</span>
        <select v-model="part1.pt1_pain_score" name="pt1_pain_score" style="font-size: 14px; width: 50px;">
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
        <input type="text" v-model="part1.pt1_local_symps" class="form-control" placeholder="e.g. dysuria, urinary retention, polyuria, etc." style="flex: none; min-width: 500px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">Systemic Symptoms</span>
        <input type="text" v-model="part1.pt1_sys_symps" class="form-control" placeholder="e.g. bone pain, weight loss, fatigue, etc." style="flex: none; min-width: 500px;">
      </div>
      <!-- end 1.2 -->
      <!-- 1.3 -->
      <b class="mt-3">1.3 Screening/Baseline</b>
      <span class="ms-1">a. Laboratory</span>
      <div class="input-group input-group-sm">
        <span class="input-group-text">i. PSA</span>
        <input type="text" v-model="part1.pt1_psa" class="form-control" placeholder="" style="flex: none; min-width: 500px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">ii. Creatinine</span>
        <input type="text" v-model="part1.pt1_creatinine" class="form-control" placeholder="" style="flex: none; min-width: 500px;">
      </div>
      <div class="align-self-start d-flex flex-column p-2" style="border: 1px solid lightgray; border-radius: 5px; gap: 5px;">
        <span class="ms-1" style="font-size: 14px;">iii. CBC</span>
        <div class="d-flex flex-column ms-2" style="gap: 5px;">
          <div class="input-group input-group-sm">
            <span class="input-group-text">WBC</span>
            <input type="text" v-model="part1.pt1_wbc" class="form-control" placeholder="" style="flex: 1;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">RBC</span>
            <input type="text" v-model="part1.pt1_rbc" class="form-control" placeholder="" style="flex: 1;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">Hemoglobin</span>
            <input type="text" v-model="part1.pt1_hemoglobin" class="form-control" placeholder="" style="flex: 1;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">Hematocrit</span>
            <input type="text" v-model="part1.pt1_hematocrit" class="form-control" placeholder="" style="flex: 1;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">Platelet Count</span>
            <input type="text" v-model="part1.pt1_platelet" class="form-control" placeholder="" style="flex: 1;">
          </div>
        </div>
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">iv. Lactate Dehydrogenase</span>
        <input type="text" v-model="part1.pt1_lactate" class="form-control" placeholder="" style="flex: none; min-width: 500px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">v. Alkaline Phosphatase</span>
        <input type="text" v-model="part1.pt1_alkaline" class="form-control" placeholder="" style="flex: none; min-width: 500px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">vi. SGPT, SGOT, Bilirubins</span>
        <input type="text" v-model="part1.pt1_ssb" class="form-control" placeholder="" style="flex: none; min-width: 500px;">
      </div>
      <span class="ms-1">b. Imaging</span>
      <div class="input-group input-group-sm">
        <span class="input-group-text">i. Salivary Gland</span>
        <select v-model="part1.pt1_salivary" name="salivary_gland" style="font-size: 14px; width: 150px;">
          <option value="normal">Normal</option>
          <option value="obstruction_right">Obstruction Right</option>
          <option value="obstruction_left">Obstruction Left</option>
        </select>
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">ii. Renal Scinitigraphy</span>
        <!-- <input type="text" v-model="part1.pt1_renal" class="form-control" placeholder="MAG3 or DTPA" style="flex: none; min-width: 500px;"> -->
        <select v-model="part1.pt1_renal" name="pt1_bone_scan" style="font-size: 14px;">
          <option value="mag3">MAG3</option>
          <option value="dtpa">DTPA</option>
        </select>
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">iii. Bone Scan</span>
        <select v-model="part1.pt1_bone_scan" name="pt1_bone_scan" style="font-size: 14px;">
          <option value="no metastasis">No Metastasis</option>
          <option value="with metastasis">With Metastasis</option>
        </select>
      </div>
      <div v-if="part1.pt1_bone_scan == 'with metastasis'" class="input-group input-group-sm">
        <span class="input-group-text">Location</span>
        <input v-model="part1.pt1_bone_withmetas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
      </div>
      <div class="align-self-start p-2" style="border: 1px solid lightgray; border-radius: 5px; gap: 5px;">
        <span style="font-size: 14px; padding-right: 1cm;">iv. PSMA</span>
        <div class="form-check form-check-inline">
          <input v-model="part1.pt1_psma_picked" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="ga-68">
          <label class="form-check-label" for="inlineRadio1" style="font-size: 14px;">Ga-68</label>
        </div>
        <div class="form-check form-check-inline">
          <input v-model="part1.pt1_psma_picked" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="f-18">
          <label class="form-check-label" for="inlineRadio2" style="font-size: 14px;">F-18</label>
        </div>
        <div class="d-flex flex-column" style="gap: 5px;">
          <div class="input-group input-group-sm">
            <span class="input-group-text">a. Prostate</span>
            <select v-model="part1.pt1_psma_prostate" name="pt1_psma_prostate" style="font-size: 14px;">
              <option value="psma_absent_prostate">Absent</option>
              <option value="psma_present_prostate">Present</option>
            </select>
          </div>
          <div v-if="part1.pt1_psma_prostate == 'psma_present_prostate'" class="input-group input-group-sm">
            <span class="input-group-text">Location</span>
            <input v-model="part1.pt1_psma_prostate_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text">SUV</span>
            <input v-model="part1.pt1_psma_prostate_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text">Measurement (cm)</span>
            <input v-model="part1.pt1_psma_prostate_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">b. Lymph Nodes</span>
            <select v-model="part1.pt1_psma_lymphs" name="pt1_psma_lymphs" style="font-size: 14px;">
              <option value="psma_absent_node">Absent</option>
              <option value="psma_present_node">Present</option>
            </select>
          </div>
          <div v-if="part1.pt1_psma_lymphs == 'psma_present_node'" class="input-group input-group-sm">
            <span class="input-group-text">Location</span>
            <input v-model="part1.pt1_psma_lymphs_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text">SUV</span>
            <input v-model="part1.pt1_psma_lymphs_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text">Measurement (cm)</span>
            <input v-model="part1.pt1_psma_lymphs_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">c. Bone</span>
            <select v-model="part1.pt1_psma_bone" name="pt1_psma_bone" style="font-size: 14px;">
              <option value="psma_absent_bone">Absent</option>
              <option value="psma_present_bone">Present</option>
            </select>
          </div>
          <div v-if="part1.pt1_psma_bone == 'psma_present_bone'" class="input-group input-group-sm">
            <span class="input-group-text">Location</span>
            <input v-model="part1.pt1_psma_bone_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text">SUV</span>
            <input v-model="part1.pt1_psma_bone_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text">Measurement (cm)</span>
            <input v-model="part1.pt1_psma_bone_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">d. Brain</span>
            <select v-model="part1.pt1_psma_brain" name="pt1_psma_brain" style="font-size: 14px;">
              <option value="psma_absent_brain">Absent</option>
              <option value="psma_present_brain">Present</option>
            </select>
          </div>
          <div v-if="part1.pt1_psma_brain == 'psma_present_brain'" class="input-group input-group-sm">
            <span class="input-group-text">Location</span>
            <input v-model="part1.pt1_psma_brain_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text">SUV</span>
            <input v-model="part1.pt1_psma_brain_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text">Measurement (cm)</span>
            <input v-model="part1.pt1_psma_brain_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">e. Lungs</span>
            <select v-model="part1.pt1_psma_lungs" name="pt1_psma_lungs" style="font-size: 14px;">
              <option value="psma_absent_lungs">Absent</option>
              <option value="psma_present_lungs">Present</option>
            </select>
          </div>
          <div v-if="part1.pt1_psma_lungs == 'psma_present_lungs'" class="input-group input-group-sm">
            <span class="input-group-text">Location</span>
            <input v-model="part1.pt1_psma_lungs_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text">SUV</span>
            <input v-model="part1.pt1_psma_lungs_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text">Measurement (cm)</span>
            <input v-model="part1.pt1_psma_lungs_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">f. Liver</span>
            <select v-model="part1.pt1_psma_liver" name="pt1_psma_liver" style="font-size: 14px;">
              <option value="psma_absent_liver">Absent</option>
              <option value="psma_present_liver">Present</option>
            </select>
          </div>
          <div v-if="part1.pt1_psma_liver == 'psma_present_liver'" class="input-group input-group-sm">
            <span class="input-group-text">Location</span>
            <input v-model="part1.pt1_psma_liver_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text">SUV</span>
            <input v-model="part1.pt1_psma_liver_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text">Measurement (cm)</span>
            <input v-model="part1.pt1_psma_liver_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">g. Others</span>
            <select v-model="part1.pt1_psma_others" name="pt1_psma_others" style="font-size: 14px;">
              <option value="psma_absent_others">Absent</option>
              <option value="psma_present_others">Present</option>
            </select>
          </div>
          <div v-if="part1.pt1_psma_others == 'psma_present_others'" class="input-group input-group-sm">
            <span class="input-group-text">Location</span>
            <input v-model="part1.pt1_psma_others_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text">SUV</span>
            <input v-model="part1.pt1_psma_others_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text">Measurement (cm)</span>
            <input v-model="part1.pt1_psma_others_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          </div>
        </div>
      </div>
      <div class="align-self-start d-flex flex-column p-2" style="border: 1px solid lightgray; border-radius: 5px; gap: 5px;">
        <span style="padding-right:1cm">v. FDG PET/CT</span>
        <div class="input-group input-group-sm">
        <span class="input-group-text">a. Prostate</span>
        <select v-model="part1.pt1_fdg_prostate" name="pt1_fdg_prostate" style="font-size: 14px;">
          <option value="fdg_absent_prostate">Absent</option>
          <option value="fdg_present_prostate">Present</option>
        </select>
        </div>
        <div v-if="part1.pt1_fdg_prostate == 'fdg_present_prostate'" class="input-group input-group-sm">
          <span class="input-group-text">Location</span>
          <input v-model="part1.pt1_fdg_prostate_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text">SUV</span>
          <input v-model="part1.pt1_fdg_prostate_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text">Measurement (cm)</span>
          <input v-model="part1.pt1_fdg_prostate_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
        </div>
        <div class="input-group input-group-sm">
        <span class="input-group-text">b. Lymph Nodes</span>
        <select v-model="part1.pt1_fdg_lymphs" name="pt1_fdg_lymphs" style="font-size: 14px;">
          <option value="fdg_absent_node">Absent</option>
          <option value="fdg_present_node">Present</option>
        </select>
        </div>
        <div v-if="part1.pt1_fdg_lymphs == 'fdg_present_node'" class="input-group input-group-sm">
          <span class="input-group-text">Location</span>
          <input v-model="part1.pt1_fdg_lymphs_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text">SUV</span>
          <input v-model="part1.pt1_fdg_lymphs_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text">Measurement (cm)</span>
          <input v-model="part1.pt1_fdg_lymphs_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
        </div>
        <div class="input-group input-group-sm">
        <span class="input-group-text">c. Bone</span>
        <select v-model="part1.pt1_fdg_bone" name="fdg_bone" style="font-size: 14px;">
          <option value="fdg_absent_bone">Absent</option>
          <option value="fdg_present_bone">Present</option>
        </select>
        </div>
        <div v-if="part1.pt1_fdg_bone == 'fdg_present_bone'" class="input-group input-group-sm">
          <span class="input-group-text">Location</span>
          <input v-model="part1.pt1_fdg_bone_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text">SUV</span>
          <input v-model="part1.pt1_fdg_bone_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text">Measurement (cm)</span>
          <input v-model="part1.pt1_fdg_bone_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
        </div>
        <div class="input-group input-group-sm">
        <span class="input-group-text">d. Brain</span>
        <select v-model="part1.pt1_fdg_brain" name="fdg_brain" style="font-size: 14px;">
          <option value="fdg_absent_brain">Absent</option>
          <option value="fdg_present_brain">Present</option>
        </select>
        </div>
        <div v-if="part1.pt1_fdg_brain == 'fdg_present_brain'" class="input-group input-group-sm">
          <span class="input-group-text">Location</span>
          <input v-model="part1.pt1_fdg_brain_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text">SUV</span>
          <input v-model="part1.pt1_fdg_brain_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text">Measurement (cm)</span>
          <input v-model="part1.pt1_fdg_brain_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
        </div>
        <div class="input-group input-group-sm">
        <span class="input-group-text">e. Lungs</span>
        <select v-model="part1.pt1_fdg_lungs" name="fdg_lungs" style="font-size: 14px;">
          <option value="fdg_absent_lungs">Absent</option>
          <option value="fdg_present_lungs">Present</option>
        </select>
        </div>
        <div v-if="part1.pt1_fdg_lungs == 'fdg_present_lungs'" class="input-group input-group-sm">
          <span class="input-group-text">Location</span>
          <input v-model="part1.pt1_fdg_lungs_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text">SUV</span>
          <input v-model="part1.pt1_fdg_lungs_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text">Measurement (cm)</span>
          <input v-model="part1.pt1_fdg_lungs_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
        </div>
        <div class="input-group input-group-sm">
        <span class="input-group-text">f. Liver</span>
        <select v-model="part1.pt1_fdg_liver" name="fdg_liver" style="font-size: 14px;">
          <option value="fdg_absent_liver">Absent</option>
          <option value="fdg_present_liver">Present</option>
        </select>
        </div>
        <div v-if="part1.pt1_fdg_liver == 'fdg_present_liver'" class="input-group input-group-sm">
          <span class="input-group-text">Location</span>
          <input v-model="part1.pt1_fdg_liver_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text">SUV</span>
          <input v-model="part1.pt1_fdg_liver_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text">Measurement (cm)</span>
          <input v-model="part1.pt1_fdg_liver_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
        </div>
        <div class="input-group input-group-sm">
        <span class="input-group-text">g. Others</span>
        <select v-model="part1.pt1_fdg_others" name="fdg_others" style="font-size: 14px;">
          <option value="fdg_absent_others">Absent</option>
          <option value="fdg_present_others">Present</option>
        </select>
        </div>
        <div v-if="part1.pt1_fdg_others == 'fdg_present_others'" class="input-group input-group-sm">
          <span class="input-group-text">Location</span>
          <input v-model="part1.pt1_fdg_others_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text">SUV</span>
          <input v-model="part1.pt1_fdg_others_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text">Measurement (cm)</span>
          <input v-model="part1.pt1_fdg_others_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
        </div>
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text" style="font-size: 16px;">c. Assessment</span>
        <select v-model="part1.pt1_assessment" name="part1_new_assessment" style="font-size: 14px; width: 150px;">
          <option value="low risk">Low Risk</option>
          <option value="intermediate risk">Intermediate Risk</option>
          <option value="high risk">High Risk</option>
        </select>
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" style="font-size: 16px;">d. Plan</span>
        <textarea class="form-control" v-model="part1.pt1_new_plan" aria-label="part1_new_plan" style="font-size: 12px;"></textarea>
      </div>
      <!-- end 1.3 -->
      <button @click="switchDiv('part2Div')" type="button" class="align-self-center btn btn-lg btn-secondary">Next</button>
    </div>
    <!-- end Part 1 -->
    
    <!-- Part 2 -->
    <div v-if="shownDiv == 'part2Div'" ref="part2Div" class="partDiv">
      <h5 style="font-weight: bold;">Part 2: Therapy</h5>
      <div class="input-group input-group-sm">
        <span class="input-group-text">Patient Code</span>
        <input disabled v-model="part1.pt1_patient_code" type="text" class="form-control" placeholder="" style="flex: none; min-width: 250px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">Age</span>
        <input disabled v-model="part1.pt1_age" type="text" class="form-control" placeholder="" style="flex: none; min-width: 100px;">
      </div>
      <!-- Therapy -->
      <div v-for="(obj, index) in therapy_sessions" :key="index" class="d-flex flex-column p-2" style="border: 1px solid lightgray; gap: 5px;">
        <div class="input-group input-group-sm">
          <span class="input-group-text">Date of #{{index+1}} PSMA-directed Radioligand Therapy (PSMA-RLT)</span>
          <input v-model="therapy_sessions[index].pt2_date_psma" type="date" class="form-control" placeholder="" style="flex: none; min-width: 300px;">
        </div>
        <div class="input-group mt-3">
          <span class="input-group-text" style="font-size: 14px;">Pre-medications</span>
          <textarea v-model="part2_pt2_premed" class="form-control" aria-label="new_plan" style="font-size: 12px;"></textarea>
        </div>
        <div class="input-group mb-2">
          <span class="input-group-text" style="font-size: 14px;">Medications (including Furosemide)</span>
          <textarea v-model="therapy_sessions[index].pt2_med" class="form-control" aria-label="new_plan" style="font-size: 12px;"></textarea>
        </div>
        <span class="ms-1">Vital Signs</span>
        <div class="align-self-start d-flex flex-column p-2" style="border: 1px solid lightgray; border-radius: 5px; gap: 5px;">
          <div class="d-flex flex-column ms-2" style="gap: 5px;">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Blood Pressure (BP)</span>
              <input v-model="therapy_sessions[index].pt2_bp" type="text" class="form-control" placeholder="" style="flex: none; min-width: 180px;">
            </div>
            <div class="input-group input-group-sm">
              <span class="input-group-text">Heart Rate (HR)</span>
              <input v-model="therapy_sessions[index].pt2_hr" type="number" class="form-control" placeholder="in beats per minute" style="flex: none; min-width: 180px;">
            </div>
            <div class="input-group input-group-sm">
              <span class="input-group-text">Respiratory Rate (RR)</span>
              <input v-model="therapy_sessions[index].pt2_rr" type="number" class="form-control" placeholder="in breaths per minute" style="flex: none; min-width: 180px;">
            </div>
            <div class="input-group input-group-sm">
              <span class="input-group-text">O2 Sat</span>
              <input v-model="therapy_sessions[index].pt2_o2" type="text" class="form-control" placeholder="in percentage" style="flex: none; min-width: 157px;">
            </div>
          </div>
        </div>
        <div class="input-group input-group-sm mt-2 mb-2">
          <span class="input-group-text">Date of therapy</span>
          <input v-model="therapy_sessions[index].pt2_date_therapy" type="date" class="form-control" placeholder="" style="flex: none; min-width: 150px;">
        </div>
        <div class="input-group input-group-sm">
          <span class="input-group-text">Radiopharm</span>
          <input v-model="therapy_sessions[index].pt2_radiopharm" type="text" class="form-control" placeholder="" style="flex: none; min-width: 180px;">
        </div>
        <div class="input-group input-group-sm">
          <span class="input-group-text">Activity</span>
          <input v-model="therapy_sessions[index].pt2_activity" type="text" class="form-control" placeholder="" style="flex: none; min-width: 180px;">
        </div>
        <div class="input-group input-group-sm mt-2">
          <span class="ms-1">Side effects (report 0 or more side effects)</span>
          <div class="input-group mb-1 mt-1">
            <div class="input-group-text">
              <input v-model="therapy_sessions[index].pt2_fatigue" class="form-check-input mt-0" type="checkbox" aria-label="pt2_side_checkbox">
              <span class="input-group-text" style="margin-left:5px; font-size: 12px;">Fatigue</span>
            </div>
            <input v-if="therapy_sessions[index].pt2_fatigue" v-model="therapy_sessions[index].pt2_fatigue_text" type="text" class="form-control" aria-label="pt2_side_textbox">
          </div>
          <div class="input-group mb-1">
            <div class="input-group-text">
              <input v-model="therapy_sessions[index].pt2_nausea" class="form-check-input mt-0" type="checkbox" aria-label="pt2_side_checkbox">
              <span class="input-group-text" style="margin-left:5px; font-size: 12px;">Nausea/Vomiting</span>
            </div>
            <input v-if="therapy_sessions[index].pt2_nausea" v-model="therapy_sessions[index].pt2_nausea_text" type="text" class="form-control" aria-label="pt2_side_textbox">
          </div>
          <div class="input-group mb-1">
            <div class="input-group-text">
              <input v-model="therapy_sessions[index].pt2_dry_lips" class="form-check-input mt-0" type="checkbox" aria-label="pt2_side_checkbox">
              <span class="input-group-text" style="margin-left:5px; font-size: 12px;">Dry Lips/Mouth</span>
            </div>
            <input v-if="therapy_sessions[index].pt2_dry_lips" v-model="therapy_sessions[index].pt2_dry_lips_text" type="text" class="form-control" aria-label="pt2_side_textbox">
          </div>
          <div class="input-group mb-1">
            <div class="input-group-text">
              <input v-model="therapy_sessions[index].pt2_headache" class="form-check-input mt-0" type="checkbox" aria-label="pt2_side_checkbox">
              <span class="input-group-text" style="margin-left:5px; font-size: 12px;">Headache</span>
            </div>
            <input v-if="therapy_sessions[index].pt2_headache" v-model="therapy_sessions[index].pt2_headache_text" type="text" class="form-control" aria-label="pt2_side_textbox">
          </div>
          <div class="input-group mb-1">
            <div class="input-group-text">
              <input v-model="therapy_sessions[index].pt2_bone_pain" class="form-check-input mt-0" type="checkbox" aria-label="pt2_side_checkbox">
              <span class="input-group-text" style="margin-left:5px; font-size: 12px;">Bone Pain</span>
            </div>
            <input v-if="therapy_sessions[index].pt2_bone_pain" v-model="therapy_sessions[index].pt2_bone_pain_text" type="text" class="form-control" aria-label="pt2_side_textbox">
          </div>
          <div class="input-group mb-1">
            <div class="input-group-text">
              <input v-model="therapy_sessions[index].pt2_others" class="form-check-input mt-0" type="checkbox" value="pt2_others" aria-label="pt2_side_checkbox">
              <span class="input-group-text" style="margin-left:5px; font-size: 12px;">Others</span>
            </div>
            <input v-if="therapy_sessions[index].pt2_others" v-model="therapy_sessions[index].pt2_others_text" type="text" class="form-control" aria-label="pt2_side_textbox">
          </div>
        </div>
      </div>
      <button @click="addPart2Therapy()" type="button" class="align-self-center btn btn-secondary" style="background-color: #093405;">Add Another PSMA-directed Radioligand Therapy (PSMA-RLT) Instance</button>
      <!-- end Therapy -->
      <div class="align-items-center d-flex flex-row justify-content-center mt-3" style="gap: 20px;">
        <button @click="switchDiv('part1Div')" type="button" class="align-self-center btn btn-lg btn-secondary">Back</button>
        <button @click="toPart3()" type="button" class="align-self-center btn btn-lg btn-secondary">Next</button>
      </div>
    </div>
    <!-- end Part 2 -->
    
    <!-- Part 3 -->
    <div v-if="shownDiv == 'part3Div'"  ref="part3Div" class="partDiv">
      <h5 style="font-weight: bold;">Part 3: Post Therapy Scan and Dosimetry</h5>
      <div class="input-group input-group-sm">
        <span class="input-group-text">Patient Code</span>
        <input disabled v-model="part1.pt1_patient_code" type="text" class="form-control" placeholder="" style="flex: none; min-width: 250px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">Age</span>
        <input disabled v-model="part1.pt1_age" type="text" class="form-control" placeholder="" style="flex: none; min-width: 100px;">
      </div>
      <!-- Post Therapy Instance -->
      <div v-for="(obj, index) in post_therapy_sessions" :key="index" class="d-flex flex-column p-2" style="border: 1px solid lightgray; gap: 5px;">
        <div class="input-group input-group-sm">
          <span class="input-group-text">Date</span>
          <input v-model="post_therapy_sessions[index].pt3_date_post_therapy" type="date" class="form-control" placeholder="" style="flex: none; min-width: 150px;">
        </div>
        <!-- Post Therapy Header -->
        <div class="align-items-center d-flex flex-row">
          <span class="me-3" >#{{index+1}} Post Theraphy Scan</span>
          <!-- Post Therapy Header Right -->
          <input v-model="post_therapy_sessions[index].pt3_hour" type="text" class="form-control p-1" placeholder="" style="flex: none; font-size: 14px; width: 30px;">
          <span class="input-group-text p-1" style="margin-right: 10px; font-size: 14px;">(Hour)</span>
          <div class="form-check form-check-inline">
            <input v-model="post_therapy_sessions[index].pt3_spectct" class="form-check-input" type="radio" name="spectct" id="with2" value="with2">
            <label class="form-check-label" for="inlineRadio1" style="font-size: 14px">with SPECT/CT</label>
          </div>
          <div class="form-check form-check-inline">
            <input v-model="post_therapy_sessions[index].pt3_spectct" class="form-check-input" type="radio" name="spectct" id="without2" value="without2">
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
                  <input v-model="post_therapy_sessions[index].pt3_prostate" class="form-check-input mt-0" type="checkbox" aria-label="pt3_lession_checkbox">
                  <span class="input-group-text" style="margin-left:5px; font-size: 12px;">Prostate</span>
                </div>
                <input v-if="post_therapy_sessions[index].pt3_prostate" v-model="post_therapy_sessions[index].pt3_prostate_text" type="text" class="form-control" aria-label="pt3_lession_textbox">
              </div>
              <div class="input-group mb-1">
                <div class="input-group-text">
                  <input v-model="post_therapy_sessions[index].pt3_lymph_nodes" class="form-check-input mt-0" type="checkbox" aria-label="pt3_lession_checkbox">
                  <span class="input-group-text" style="margin-left:5px; font-size: 12px;">Lymph Nodes</span>
                </div>
                <input v-if="post_therapy_sessions[index].pt3_lymph_nodes" v-model="post_therapy_sessions[index].pt3_lymph_nodes_text" type="text" class="form-control" aria-label="pt3_lession_textbox">
              </div>
              <div class="input-group mb-1">
                <div class="input-group-text">
                  <input v-model="post_therapy_sessions[index].pt3_bones" class="form-check-input mt-0" type="checkbox" aria-label="pt3_lession_checkbox">
                  <span class="input-group-text" style="margin-left:5px; font-size: 12px;">Bones</span>
                </div>
                <input v-if="post_therapy_sessions[index].pt3_bones" v-model="post_therapy_sessions[index].pt3_bones_text" type="text" class="form-control" aria-label="pt3_lession_textbox">
              </div>
              <div class="input-group mb-1">
                <div class="input-group-text">
                  <input v-model="post_therapy_sessions[index].pt3_lungs" class="form-check-input mt-0" type="checkbox" aria-label="pt3_lession_checkbox">
                  <span class="input-group-text" style="margin-left:5px; font-size: 12px;">Lungs</span>
                </div>
                <input v-if="post_therapy_sessions[index].pt3_lungs" v-model="post_therapy_sessions[index].pt3_lungs_text" type="text" class="form-control" aria-label="pt3_lession_textbox">
              </div>
              <div class="input-group mb-1">
                <div class="input-group-text">
                  <input v-model="post_therapy_sessions[index].pt3_liver" class="form-check-input mt-0" type="checkbox" aria-label="pt3_lession_checkbox">
                  <span class="input-group-text" style="margin-left:5px; font-size: 12px;">Liver</span>
                </div>
                <input v-if="post_therapy_sessions[index].pt3_liver" v-model="post_therapy_sessions[index].pt3_liver_text" type="text" class="form-control" aria-label="pt3_lession_textbox">
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
              <input v-model="post_therapy_sessions[index].pt3_sg" type="text" class="form-control" aria-label="pt3_lession_textbox">
            </div>
            <div class="input-group mb-1">
              <div class="input-group-text">
                <span class="input-group-text" style="margin-left:5px; font-size: 12px;">Left Kidney</span>
              </div>
              <input v-model="post_therapy_sessions[index].pt3_lk" type="text" class="form-control" aria-label="pt3_lession_textbox">
              <div class="input-group-text">
                <span class="input-group-text" style="margin-left:5px; font-size: 12px;">Right Kidney</span>
              </div>
              <input v-model="post_therapy_sessions[index].pt3_rk" type="text" class="form-control" aria-label="pt3_lession_textbox">
            </div>
          </div>
          <!-- end Dosimetry Body -->
        </div>
        <!-- end Dosimetry -->
        <!-- end Post Therapy Body -->
      </div>
      <!-- End Post Therapy Instance -->
      <button @click="addPostTherapy()" type="button" class="align-self-center btn btn-secondary p-2 py-1" style="background-color: #093405;">Add Another Post Therapy Scan</button>
      <div class="align-items-center d-flex flex-row justify-content-center mt-3" style="gap: 20px;">
        <button @click="switchDiv('part2Div')" type="button" class="align-self-center btn btn-lg btn-secondary">Back</button>
        <button @click="createNewPatient()" type="button" class="align-self-center btn btn-lg btn-secondary">Submit</button>
      </div>
    </div>
    <!-- end Part 3 -->
  </div>
  <!-- end New Body -->
</div>
</template>
<style scoped>
p {
  margin: 0;
}
select {
  border: 1px solid lightgray;
  border-radius: 5px;
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