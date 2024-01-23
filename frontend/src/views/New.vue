<script>
import Header from '../components/Header.vue'
export default {
  name: 'New',
  components: {Header},
  data() {
    return {
     // backendUrl: 'https://up-theranostics-databank.onrender.com', // TEMP, ENABLE THIS ON DEPLOYMENT
      backendUrl: 'http://localhost:8000', // DISABLE THIS ON DEPLOYMENT
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
        const response = await this.axios.post(`${this.backendUrl}/api/patient/create`, {
          part1: this.part1,
          therapy_sessions: this.therapy_sessions,
          post_therapy_sessions: this.post_therapy_sessions
        }, { withCredentials: true })
        alert(response.data.message)
        location.href = '/home'
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
      const response = await this.axios.post(`${this.backendUrl}/api/patient_code/new`, {}, { withCredentials: true })
      this.part1.pt1_patient_code = response.data.generated_patient_code
    } catch (error) {
      console.log('Error in New.vue > mounted()', error)
      alert('Error in generating patient code')
    }
  }
}
</script>

<template>
    <head>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
  </head>

  <body>
<div class="d-flex flex-column">
  <Header />
  <!-- New Body -->
  <div class="p-3" id="view-page">
    <!-- <h1 style="font-size: 25px; font-weight: bold;">Add New Patient/h1> -->
      <div class="d-flex flex-row justify-content-between mb-4" style="margin-bottom:1px; margin-top:20px">
        <h1 style="font-size: 25px; font-weight: bold;">Add New Patient</h1>
      </div>
    <!-- Part 1 -->
    <div v-if="shownDiv == 'part1Div'" ref="part1Div" class="partDiv" id="fill-page">
      <h5 style="font-weight: bold; color:#0B2509">Part 1: DEMOGRAPHICS</h5>
      <hr>
      <!-- 1.1 -->
      <b style="text-decoration:underline;color:#0B2509">1.1 Demographics</b>
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
        <input v-model="part1.pt1_age" type="number" class="form-control" placeholder="in years" style="flex: none; min-width: 100px;">
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
      <div class="input-group input-group-sm" style="margin-left: 10px;">
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
      <br>
      <b class="mt-3" style="text-decoration:underline; color:#0B2509">1.2 Physical Examination</b>
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
        <input type="number" v-model="part1.pt1_height" class="form-control" placeholder="in meters" style="flex: none; min-width: 100px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">c. Weight (in kg)</span>
        <input type="number" v-model="part1.pt1_weight" class="form-control" placeholder="in kilograms" style="flex: none; min-width: 100px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">d. Body Mass Index (BMI)</span>
        <input type="number" disabled :value="computed_bmi()" class="form-control" placeholder="kg/m2" style="flex: none; min-width: 100px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">e. Blood Pressure (BP)</span>
        <input type="text" v-model="part1.pt1_bp" class="form-control" placeholder="in mmHg" style="flex: none; min-width: 100px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">f. Heart Rate (HR)</span>
        <input type="text" v-model="part1.pt1_hr" class="form-control" placeholder="in beats per minute" style="flex: none; min-width: 100px;">
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
        <span class="input-group-text">h1. Local Symptoms</span>
        <input type="text" v-model="part1.pt1_local_symps" class="form-control" placeholder="e.g. dysuria, urinary retention, polyuria, etc." style="flex: none; min-width: 500px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">h2. Systemic Symptoms</span>
        <input type="text" v-model="part1.pt1_sys_symps" class="form-control" placeholder="e.g. bone pain, weight loss, fatigue, etc." style="flex: none; min-width: 500px;">
      </div>
      <!-- end 1.2 -->

      <!-- 1.3 -->
      <b class="mt-3" style="text-decoration:underline; color:#0B2509">1.3 Screening/Baseline</b>
      <span class="ms-1"  style="font-weight:bold">A. Laboratory</span>
      <div class="input-group input-group-sm">
        <span class="input-group-text">i. PSA</span>
        <input type="text" v-model="part1.pt1_psa" class="form-control" placeholder="" style="flex: none; min-width: 500px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">ii. Creatinine</span>
        <input type="text" v-model="part1.pt1_creatinine" class="form-control" placeholder="" style="flex: none; min-width: 500px;">
      </div>
      <div class="align-self-start d-flex flex-column p-2" style="border: 1px solid lightgray; border-radius: 5px; gap: 5px; margin-left:20px;">
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
      <span class="ms-1"  style="font-weight:bold">B. Imaging</span>
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
      <div v-if="part1.pt1_bone_scan == 'with metastasis'" class="input-group input-group-sm" style="margin-left:20px; width:calc(100% - 20);">
        <span class="input-group-text">Location</span>
        <input v-model="part1.pt1_bone_withmetas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
      </div>
      <div class="align-self-start p-2" style="border: 1px solid lightgray; border-radius: 5px; gap: 5px;">
        <span style="font-size: 14px; padding-right: 1cm;; font-weight: bold;">iv. PSMA</span>
        <div class="form-check form-check-inline">
          <input v-model="part1.pt1_psma_picked" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="ga-68">
          <label class="form-check-label" for="inlineRadio1" style="font-size: 14px; font-weight:bold;">Ga-68</label>
        </div>
        <div class="form-check form-check-inline">
          <input v-model="part1.pt1_psma_picked" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="f-18">
          <label class="form-check-label" for="inlineRadio2" style="font-size: 14px; font-weight: bold;">F-18</label>
        </div>

        <div class="d-flex flex-column" style="gap: 5px;">
          <div class="input-group input-group-sm">
            <span class="input-group-text">a. Prostate</span>
            <select v-model="part1.pt1_psma_prostate" name="pt1_psma_prostate" style="font-size: 14px;">
              <option value="psma_absent_prostate">Absent</option>
              <option value="psma_present_prostate">Present</option>
            </select>
          </div>
          <div v-if="part1.pt1_psma_prostate == 'psma_present_prostate'" class="input-group input-group-sm" style="margin-left:20px; width:calc(100% - 20px);">
            <span class="input-group-text">Location</span>
            <input v-model="part1.pt1_psma_prostate_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text" style="margin-left:20px;">SUV</span>
            <input v-model="part1.pt1_psma_prostate_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text" style="margin-left:20px;">Measurement (cm)</span>
            <input v-model="part1.pt1_psma_prostate_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          </div>

          <div class="input-group input-group-sm">
            <span class="input-group-text">b. Lymph Nodes</span>
            <select v-model="part1.pt1_psma_lymphs" name="pt1_psma_lymphs" style="font-size: 14px;">
              <option value="psma_absent_node">Absent</option>
              <option value="psma_present_node">Present</option>
            </select>
          </div>
          <div v-if="part1.pt1_psma_lymphs == 'psma_present_node'" class="input-group input-group-sm" style="margin-left:20px; width:calc(100% - 20px)">
            <span class="input-group-text">Location</span>
            <input v-model="part1.pt1_psma_lymphs_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text"  style="margin-left:20px;">SUV</span>
            <input v-model="part1.pt1_psma_lymphs_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text" style="margin-left:20px;">Measurement (cm)</span>
            <input v-model="part1.pt1_psma_lymphs_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          </div>

          <div class="input-group input-group-sm">
            <span class="input-group-text">c. Bone</span>
            <select v-model="part1.pt1_psma_bone" name="pt1_psma_bone" style="font-size: 14px;">
              <option value="psma_absent_bone">Absent</option>
              <option value="psma_present_bone">Present</option>
            </select>
          </div>
          <div v-if="part1.pt1_psma_bone == 'psma_present_bone'" class="input-group input-group-sm" style="margin-left:20px; width:calc(100% - 20px)">
            <span class="input-group-text">Location</span>
            <input v-model="part1.pt1_psma_bone_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text" style="margin-left:20px;">SUV</span>
            <input v-model="part1.pt1_psma_bone_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text" style="margin-left:20px;">Measurement (cm)</span>
            <input v-model="part1.pt1_psma_bone_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          </div>

          <div class="input-group input-group-sm">
            <span class="input-group-text">d. Brain</span>
            <select v-model="part1.pt1_psma_brain" name="pt1_psma_brain" style="font-size: 14px;">
              <option value="psma_absent_brain">Absent</option>
              <option value="psma_present_brain">Present</option>
            </select>
          </div>
          <div v-if="part1.pt1_psma_brain == 'psma_present_brain'" class="input-group input-group-sm" style="margin-left:20px; width:calc(100% - 20px)">
            <span class="input-group-text">Location</span>
            <input v-model="part1.pt1_psma_brain_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text" style="margin-left:20px;">SUV</span>
            <input v-model="part1.pt1_psma_brain_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text" style="margin-left:20px;">Measurement (cm)</span>
            <input v-model="part1.pt1_psma_brain_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          </div>

          <div class="input-group input-group-sm">
            <span class="input-group-text">e. Lungs</span>
            <select v-model="part1.pt1_psma_lungs" name="pt1_psma_lungs" style="font-size: 14px;">
              <option value="psma_absent_lungs">Absent</option>
              <option value="psma_present_lungs">Present</option>
            </select>
          </div>
          <div v-if="part1.pt1_psma_lungs == 'psma_present_lungs'" class="input-group input-group-sm" style="margin-left:20px; width:calc(100% - 20px)">
            <span class="input-group-text">Location</span>
            <input v-model="part1.pt1_psma_lungs_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text" style="margin-left:20px;">SUV</span>
            <input v-model="part1.pt1_psma_lungs_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text" style="margin-left:20px;">Measurement (cm)</span>
            <input v-model="part1.pt1_psma_lungs_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          </div>

          <div class="input-group input-group-sm">
            <span class="input-group-text">f. Liver</span>
            <select v-model="part1.pt1_psma_liver" name="pt1_psma_liver" style="font-size: 14px;">
              <option value="psma_absent_liver">Absent</option>
              <option value="psma_present_liver">Present</option>
            </select>
          </div>
          <div v-if="part1.pt1_psma_liver == 'psma_present_liver'" class="input-group input-group-sm" style="margin-left:20px; width:calc(100% - 20px)">
            <span class="input-group-text" >Location</span>
            <input v-model="part1.pt1_psma_liver_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text" style="margin-left:20px;">SUV</span>
            <input v-model="part1.pt1_psma_liver_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text" style="margin-left:20px;">Measurement (cm)</span>
            <input v-model="part1.pt1_psma_liver_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          </div>

          <div class="input-group input-group-sm">
            <span class="input-group-text">g. Others</span>
            <select v-model="part1.pt1_psma_others" name="pt1_psma_others" style="font-size: 14px;">
              <option value="psma_absent_others">Absent</option>
              <option value="psma_present_others">Present</option>
            </select>
          </div>
          <div v-if="part1.pt1_psma_others == 'psma_present_others'" class="input-group input-group-sm" style="margin-left:20px; width:calc(100% - 20px)">
            <span class="input-group-text">Location</span>
            <input v-model="part1.pt1_psma_others_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text" style="margin-left:20px;">SUV</span>
            <input v-model="part1.pt1_psma_others_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text" style="margin-left:20px;">Measurement (cm)</span>
            <input v-model="part1.pt1_psma_others_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          </div>
        </div>
      </div>

      <div class="align-self-start d-flex flex-column p-2" style="border: 1px solid lightgray; border-radius: 5px; gap: 5px;">
        <span style="padding-right:1cm; font-weight:bold;">v. FDG PET/CT</span>

        <div class="input-group input-group-sm">
        <span class="input-group-text">a. Prostate</span>
        <select v-model="part1.pt1_fdg_prostate" name="pt1_fdg_prostate" style="font-size: 14px;">
          <option value="fdg_absent_prostate">Absent</option>
          <option value="fdg_present_prostate">Present</option>
        </select>
        </div>
        <div v-if="part1.pt1_fdg_prostate == 'fdg_present_prostate'" class="input-group input-group-sm" style="margin-left:20px; width:calc(100% - 20px)">
          <span class="input-group-text">Location</span>
          <input v-model="part1.pt1_fdg_prostate_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text" style="margin-left:20px;">SUV</span>
          <input v-model="part1.pt1_fdg_prostate_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text" style="margin-left:20px;">Measurement (cm)</span>
          <input v-model="part1.pt1_fdg_prostate_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
        </div>

        <div class="input-group input-group-sm">
        <span class="input-group-text">b. Lymph Nodes</span>
        <select v-model="part1.pt1_fdg_lymphs" name="pt1_fdg_lymphs" style="font-size: 14px;">
          <option value="fdg_absent_node">Absent</option>
          <option value="fdg_present_node">Present</option>
        </select>
        </div>
        <div v-if="part1.pt1_fdg_lymphs == 'fdg_present_node'" class="input-group input-group-sm" style="margin-left:20px; width:calc(100% - 20px)">
          <span class="input-group-text">Location</span>
          <input v-model="part1.pt1_fdg_lymphs_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text" style="margin-left:20px;">SUV</span>
          <input v-model="part1.pt1_fdg_lymphs_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text" style="margin-left:20px;">Measurement (cm)</span>
          <input v-model="part1.pt1_fdg_lymphs_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
        </div>
        <div class="input-group input-group-sm">
        <span class="input-group-text">c. Bone</span>
        <select v-model="part1.pt1_fdg_bone" name="fdg_bone" style="font-size: 14px;">
          <option value="fdg_absent_bone">Absent</option>
          <option value="fdg_present_bone">Present</option>
        </select>
        </div>
        <div v-if="part1.pt1_fdg_bone == 'fdg_present_bone'" class="input-group input-group-sm" style="margin-left:20px; width:calc(100% - 20px)">
          <span class="input-group-text">Location</span>
          <input v-model="part1.pt1_fdg_bone_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text" style="margin-left:20px;">SUV</span>
          <input v-model="part1.pt1_fdg_bone_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text" style="margin-left:20px;">Measurement (cm)</span>
          <input v-model="part1.pt1_fdg_bone_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
        </div>

        <div class="input-group input-group-sm">
        <span class="input-group-text">d. Brain</span>
        <select v-model="part1.pt1_fdg_brain" name="fdg_brain" style="font-size: 14px;">
          <option value="fdg_absent_brain">Absent</option>
          <option value="fdg_present_brain">Present</option>
        </select>
        </div>
        <div v-if="part1.pt1_fdg_brain == 'fdg_present_brain'" class="input-group input-group-sm" style="margin-left:20px; width=calc(100% - 20px)">
          <span class="input-group-text">Location</span>
          <input v-model="part1.pt1_fdg_brain_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text" style="margin-left:20px;">SUV</span>
          <input v-model="part1.pt1_fdg_brain_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text" style="margin-left:20px;">Measurement (cm)</span>
          <input v-model="part1.pt1_fdg_brain_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
        </div>

        <div class="input-group input-group-sm">
        <span class="input-group-text">e. Lungs</span>
        <select v-model="part1.pt1_fdg_lungs" name="fdg_lungs" style="font-size: 14px;">
          <option value="fdg_absent_lungs">Absent</option>
          <option value="fdg_present_lungs">Present</option>
        </select>
        </div>
        <div v-if="part1.pt1_fdg_lungs == 'fdg_present_lungs'" class="input-group input-group-sm" style="margin-left:20px; width=calc(100% - 20px)">
          <span class="input-group-text">Location</span>
          <input v-model="part1.pt1_fdg_lungs_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text" style="margin-left:20px;">SUV</span>
          <input v-model="part1.pt1_fdg_lungs_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text" style="margin-left:20px;">Measurement (cm)</span>
          <input v-model="part1.pt1_fdg_lungs_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
        </div>

        <div class="input-group input-group-sm">
        <span class="input-group-text">f. Liver</span>
        <select v-model="part1.pt1_fdg_liver" name="fdg_liver" style="font-size: 14px;">
          <option value="fdg_absent_liver">Absent</option>
          <option value="fdg_present_liver">Present</option>
        </select>
        </div>
        <div v-if="part1.pt1_fdg_liver == 'fdg_present_liver'" class="input-group input-group-sm" style="margin-left:20px; width=calc(100% - 20px)">
          <span class="input-group-text">Location</span>
          <input v-model="part1.pt1_fdg_liver_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text" style="margin-left:20px;">SUV</span>
          <input v-model="part1.pt1_fdg_liver_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text" style="margin-left:20px;">Measurement (cm)</span>
          <input v-model="part1.pt1_fdg_liver_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
        </div>

        <div class="input-group input-group-sm">
        <span class="input-group-text">g. Others</span>
        <select v-model="part1.pt1_fdg_others" name="fdg_others" style="font-size: 14px;">
          <option value="fdg_absent_others">Absent</option>
          <option value="fdg_present_others">Present</option>
        </select>
        </div>
        <div v-if="part1.pt1_fdg_others == 'fdg_present_others'" class="input-group input-group-sm" style="margin-left:20px; width:calc(100% - 20px)">
          <span class="input-group-text">Location</span>
          <input v-model="part1.pt1_fdg_others_loc" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text" style="margin-left:20px;">SUV</span>
          <input v-model="part1.pt1_fdg_others_suv" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text" style="margin-left:20px;">Measurement (cm)</span>
          <input v-model="part1.pt1_fdg_others_meas" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
        </div>
      </div>

      <span class="ms-1" style="font-weight:bold">C. Assessment</span>
      <div class="input-group input-group-sm">
        <span class="input-group-text">Assessment Type</span>
        <select v-model="part1.pt1_assessment" name="part1_new_assessment" style="font-size: 14px; width: 150px;">
          <option value="low risk">Low Risk</option>
          <option value="intermediate risk">Intermediate Risk</option>
          <option value="high risk">High Risk</option>
        </select>
      </div>
      <span class="ms-1">D. Plan</span>
      <div class="input-group mb-3">
        <span class="input-group-text">Plan of Action</span>
        <textarea class="form-control" v-model="part1.pt1_new_plan" aria-label="part1_new_plan" style="font-size: 12px;"></textarea>
      </div>
      <!-- end 1.3 -->
      <button @click="switchDiv('part2Div')" type="button" class="align-self-center btn btn-lg myButton2">Next</button>
    </div>
    <!-- end Part 1 -->
    
    <!-- Part 2 -->
    <div v-if="shownDiv == 'part2Div'" ref="part2Div" class="partDiv">
      <h5 style="font-weight: bold; color:#0B2509;">Part 2: THERAPY</h5>
      <hr>
      <div class="input-group input-group-sm">
        <span class="input-group-text">Patient Code</span>
        <input disabled v-model="part1.pt1_patient_code" type="text" class="form-control" placeholder="" style="flex: none; min-width: 250px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">Age</span>
        <input disabled v-model="part1.pt1_age" type="text" class="form-control" placeholder="" style="flex: none; min-width: 100px;">
      </div>
      <br>
      <!-- Therapy -->
      <div v-for="(obj, index) in therapy_sessions" :key="index" class="d-flex flex-column p-2" style="border: 1px solid lightgray; gap: 5px;">
        <div class="input-group input-group-sm">
          <span class="input-group-text">Date of #{{index+1}} PSMA-RLT</span>
          <input v-model="therapy_sessions[index].pt2_date_psma" type="date" class="form-control" placeholder="" style="flex: none; min-width: 300px;">
        </div>
        <div class="input-group mt-3" style="font-size: 12px; width:calc(100% - 20px);">
          <span class="input-group-text" style="font-size: 14px;">Pre-medications</span>
          <textarea v-model="part2_pt2_premed" class="form-control" aria-label="new_plan"></textarea>
        </div>
        <div class="input-group mb-2" style="font-size: 12px; width:calc(100% - 20px);">
          <span class="input-group-text" style="font-size: 14px;">Medications (w/ Furosemide)</span>
          <textarea v-model="therapy_sessions[index].pt2_med" class="form-control" aria-label="new_plan"></textarea>
        </div>
        <br>
        <span class="ms-1">VITAL SIGNS</span>
        <div class="align-self-start d-flex flex-column p-2" style="border: 1px solid lightgray; border-radius: 5px; gap: 5px;">
          <div class="d-flex flex-column ms-2" style="gap: 5px;">
            <div class="input-group input-group-sm">
              <span class="input-group-text">Blood Pressure (BP)</span>
              <input v-model="therapy_sessions[index].pt2_bp" type="text" class="form-control" placeholder="mmHg" style="flex: none; min-width: 180px;">
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
        <br>
        <div class="input-group input-group-sm mt-2">
          <span class="ms-1" style="font-weight:bold">SIDE EFFECTS (report 0 or more side effects)</span>
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
      <button @click="addPart2Therapy()" type="button" class="align-self-center btn myButton1" style="width:500px;">Add Another PSMA-directed Radioligand Therapy (PSMA-RLT) Instance</button>
      <!-- end Therapy -->
      <div class="align-items-center d-flex flex-row justify-content-center mt-3" style="gap: 20px;">
        <button @click="switchDiv('part1Div')" type="button" class="align-self-center btn myButton2">Back</button>
        <button @click="toPart3()" type="button" class="align-self-center btn myButton2">Next</button>
      </div>
    </div>
    <!-- end Part 2 -->
    
    <!-- Part 3 -->
    <div v-if="shownDiv == 'part3Div'"  ref="part3Div" class="partDiv">
      <h5 style="font-weight: bold; color:#0B2509;">Part 3: POST THERAPY SCAN AND DOSIMETRY</h5>
      <hr>
      <div class="input-group input-group-sm" style="margin-bottom:10px;">
        <span class="input-group-text">Patient Code</span>
        <input disabled v-model="part1.pt1_patient_code" type="text" class="form-control" placeholder="" style="flex: none; min-width: 250px;">
      </div>
      <div class="input-group input-group-sm"  style="margin-bottom:20px">
        <span class="input-group-text">Age</span>
        <input disabled v-model="part1.pt1_age" type="text" class="form-control" placeholder="" style="flex: none; min-width: 100px;">
        <br>
      </div>

      <!-- Post Therapy Instance -->
      <div v-for="(obj, index) in post_therapy_sessions" :key="index" class="d-flex flex-column p-2" style="border: 1px solid lightgray; gap: 5px;">
        <div class="input-group input-group-sm" style="margin-bottom:10px;">
          <span class="input-group-text">Date</span>
          <input v-model="post_therapy_sessions[index].pt3_date_post_therapy" type="date" class="form-control" placeholder="" style="flex: none; min-width: 150px;">
        </div>
        <!-- Post Therapy Header -->
        <div class="align-items-center d-flex flex-row">
          <br>
          <span class="me-3">#{{index+1}} Post Theraphy Scan</span>
          <!-- Post Therapy Header Right -->
          <input v-model="post_therapy_sessions[index].pt3_hour" type="text" class="form-control p-1" placeholder="" style="flex: none; font-size: 14px; width: 30px;">
          <span class="input-group-text p-1" style="margin-right: 10px; font-size: 14px;">(Hour/s)</span>
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
            <span style="font-weight:bold;margin-bottom:10px;">LESIONS</span>
            <br>
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
            <span class="">&nbsp;&nbsp;&nbsp;&nbsp;DOSIMETRY</span>
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
            </div>

              <div class="input-group mb-1">
              <div class="input-group-text">
                <span class="input-group-text" style="margin-left:5px; font-size: 12px;">Right Kidney</span>
              </div>
              <input v-model="post_therapy_sessions[index].pt3_rk" type="text" class="form-control" aria-label="pt3_lession_textbox">
            </div>
          </div>
          </div>
          <!-- end Dosimetry Body -->
        </div>
        <!-- end Dosimetry -->
        <!-- end Post Therapy Body -->
      <!-- End Post Therapy Instance -->
      <button @click="addPostTherapy()" type="button" class="align-self-center btn myButton1" style="width:300px">Add Another Post Therapy Scan</button>
      <div class="align-items-center d-flex flex-row justify-content-center mt-3" style="gap: 20px;">
        <button @click="switchDiv('part2Div')" type="button" class="align-self-center btn myButton2">Back</button>
        <button @click="createNewPatient()" type="button" class="align-self-center btn myButton2">Submit</button>
      </div>
    </div>
    </div>
    <!-- end Part 3 -->
  </div>
  <!-- end New Body -->
</body>
</template>
<style scoped>
/* p {
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
} */
* {
  font-family: 'Roboto';
}

select {
  font-family: 'Roboto';
  font-size: 18px;
}


body {
  margin: 0;
  padding: 0;
  background: linear-gradient(to bottom, #441515, #C59A2E, #0B2509);
  min-height: 100vh;
  font-family:'Roboto';
  }

.myButton1 {
  padding: 9px;
  background-color: black;
  border-width: 1px;
  color: #ffffff;
  border-radius: 20px; /* Rounded corners for buttons */
  font-size: 14px; /* Uniform font size for buttons */
  margin: 2px;
  width: 120px;
  text-align: center; /* Center text horizontally */
  line-height: normal; /* Adjust line height for vertical centering */
}
.myButton1:hover {
  background-color:  #0B2509;
  border-color:  #0B2509;
  color: white;
  transform: scale(1.1); 
}

.myButton2 {
  padding: 10px;
  background-color:  #0B2509;
  border-width: 1px;
  border: solid 1px white;
  color: #ffffff;
  border-radius: 20px; /* Rounded corners for buttons */
  font-size: 14px; /* Uniform font size for buttons */
  margin: 2px;
  width: 150px;
  text-align: center; /* Center text horizontally */
  line-height: normal; /* Adjust line height for vertical centering */
  font-size: 16px;
}

.myButton2:hover {
  background-color:  #0B2509;
  border-color:  #0B2509;
  color: white;
  transform: scale(1.1); 
}

.partDiv {
  background-color: rgba(255, 255, 255, 0.818);
  border: 1px solid black;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 5px;
  padding: 20px;
  margin-left:80px;
  margin-right:80px;
  margin-bottom:50px;
  width: calc(100% - 200px);
}
  
#view-page {
  background-color:  rgba(255, 255, 255, 0.818);
  border: 3px solid #0B2509; 
  margin-left:150px;
  margin-right:150px;
  margin-top: 50px;
  margin-bottom: 50px;
  width: calc(100% - 300px);
}

#form-page {
  flex: 1 1 auto; 
  margin-left: 60px; 
  margin-right: 60px; 
  width: calc(100% - 120px);
}

.accordion-button {
  background-color:white;
  border:3px solid #0B2509; 
}
.input-group-text {
    background-color: rgb(195, 194, 194); /* Light blue background for input labels */
    border: 1px solid white; /* Light blue border for input labels */
    color:black; /* Soft blue for icons */
    font-weight: 100px;
} 

.accordion-body {
    width: 100%; /* This will make the accordion body span the whole width of its container */
  }

  /* Fixed width for the labels */
  .input-group-text {
    width: 200px; /* This is a fixed width for all labels */
    white-space: nowrap; /* Prevents text from wrapping */
    margin-left:20px;
  }

  /* Ensure the input groups take full width */
  .input-group {
    display: flex;
    width: 100%; /* This will make the input group span the whole width of its container */
  }

  .input-group .form-control {
    width: calc(100% - 240px); /* Adjust the width of the input to take the remaining space */
    flex-grow: 1; /* Allows input field to grow and fill the space */
  }

  /* Optional: Adjust the spacing between input groups */
  .input-group + .input-group {
    margin-top: 10px;
  }

#index-link {
  background-color:#0B2509;
  color:white;
}

#index-link:hover {
  background-color:  #0B2509;
  border-color:  #0B2509;
  color: white;
  transform: scale(1.1); 
}

</style>