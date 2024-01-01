<script>
import Header from '../components/Header.vue'
export default {
  name: 'FollowUp',
  components: {Header},
  data() {
    return {
      part4: {}
    }
  }
}
</script>
<template>
  <!-- 1.3 -->
  <div class="p-3">
    <h2 style="font-weight: bold;">Add Follow Up Record</h2>
    <div class="partDiv">
      <div class="input-group input-group-sm">
        <span class="input-group-text">Date of Follow Up</span>
        <input v-model="part4.pt4_date_psma" type="date" class="form-control" placeholder="" style="flex: none; min-width: 300px;">
      </div>
      <span style="font-size: 16px; font-weight: bold;">Diagnosis</span>
      <span class="ms-1">a. Laboratory</span>
      <div class="input-group input-group-sm">
        <span class="input-group-text">i. PSA</span>
        <input type="text" class="form-control" placeholder="" style="flex: none; min-width: 500px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">ii. Creatinine</span>
        <input type="text" class="form-control" placeholder="" style="flex: none; min-width: 500px;">
      </div>
      <div class="align-self-start d-flex flex-column p-2" style="border: 1px solid lightgray; border-radius: 5px; gap: 5px;">
        <span class="ms-1" style="font-size: 14px;">iii. CBC</span>
        <div class="d-flex flex-column ms-2" style="gap: 5px;">
          <div class="input-group input-group-sm">
            <span class="input-group-text">WBC</span>
            <input type="text" class="form-control" placeholder="" style="flex: 1;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">RBC</span>
            <input type="text" class="form-control" placeholder="" style="flex: 1;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">Hemoglobin</span>
            <input type="text" class="form-control" placeholder="" style="flex: 1;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">Hematocrit</span>
            <input type="text" class="form-control" placeholder="" style="flex: 1;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">Platelet Count</span>
            <input type="text" class="form-control" placeholder="" style="flex: 1;">
          </div>
        </div>
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">iv. Lactate Dehydrogenase</span>
        <input type="text" class="form-control" placeholder="" style="flex: none; min-width: 500px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">v. Alkaline Phosphatase</span>
        <input type="text" class="form-control" placeholder="" style="flex: none; min-width: 500px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">vi. SGPT, SGOT, Bilirubins</span>
        <input type="text" class="form-control" placeholder="" style="flex: none; min-width: 500px;">
      </div>
      <span class="ms-1">b. Imaging</span>
      <div class="input-group input-group-sm">
        <span class="input-group-text">i. Salivary Gland</span>
        <select v-model="part4.pt4_salivary_gland" name="salivary_gland" style="font-size: 14px; width: 150px;">
          <option value="normal">Normal</option>
          <option value="obstruction_right">Obstruction Right</option>
          <option value="obstruction_left">Obstruction Left</option>
        </select>
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">ii. Renal Scinitigraphy</span>
        <input type="text" class="form-control" placeholder="MAG3 or DTPA" style="flex: none; min-width: 500px;">
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text">iii. Bone Scan</span>
        <select v-model="part4.pt4_bone_scan" name="bone_scan" style="font-size: 14px;">
          <option value="no_mestastasis">No Metastasis</option>
          <option value="with_metastasis">With Metastasis</option>
        </select>
      </div>
      <div v-if="part4.pt4.bone_scan == 'with_metastasis'" class="input-group input-group-sm">
        <span class="input-group-text">Location</span>
        <input v-model="part4.pt4_with_metastasis" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
      </div>
      <div class="align-self-start p-2" style="border: 1px solid lightgray; border-radius: 5px; gap: 5px;">
        <span style="font-size: 14px; padding-right: 1cm;">iv. PSMA</span>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="fu_ga">
        <label class="form-check-label" for="inlineRadio1" style="font-size: 14px;">Ga-18</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="fu_f" checked>
        <label class="form-check-label" for="inlineRadio2" style="font-size: 14px;">F-18</label>
      </div>
        <div class="d-flex flex-column" style="gap: 5px;">
          <div class="input-group input-group-sm">
            <span class="input-group-text">a. Prostate</span>
            <select v-model="part4.pt4_psma_prostate" name="psma_prostate" style="font-size: 14px;">
              <option value="absent_prostate">Absent</option>
              <option value="psma_present_prostate">Present</option>
            </select>
          </div>
          <div v-if="part4.pt4_psma_prostate == 'psma_present_prostate'" class="input-group input-group-sm">
            <span class="input-group-text">Location</span>
            <input v-model="part4.pt4_psma_present_prostate" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text">SUV</span>
            <input v-model="part4.pt4_psma_present_prostate" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text">Measurement (cm)</span>
            <input v-model="part4.pt4_psma_present_prostate" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">b. Lymph Nodes</span>
            <select v-model="part4.pt4_psma_lymphn" name="psma_lymphn" style="font-size: 14px;">
              <option value="absent_node">Absent</option>
              <option value="psma_present_node">Present</option>
            </select>
          </div>
          <div v-if="part4.pt4_psma_lymphn == 'psma_present_node'" class="input-group input-group-sm">
            <span class="input-group-text">Location</span>
            <input v-model="part4.pt4_psma_present_node" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text">SUV</span>
            <input v-model="part4.pt4_psma_present_node" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text">Measurement (cm)</span>
            <input v-model="part4.pt4_psma_present_node" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">c. Bone</span>
            <select v-model="part4.pt4_psma_bone" name="psma_bone" style="font-size: 14px;">
              <option value="absent_bone">Absent</option>
              <option value="psma_present_bone">Present</option>
            </select>
          </div>
          <div v-if="part4.pt4_psma_bone == 'psma_present_bone'" class="input-group input-group-sm">
            <span class="input-group-text">Location</span>
            <input v-model="part4.pt4_psma_present_bone" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text">SUV</span>
            <input v-model="part4.pt4_psma_present_bone" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text">Measurement (cm)</span>
            <input v-model="part4.pt4_psma_present_bone" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">d. Brain</span>
            <select v-model="part4.pt4_psma_brain" name="psma_brain" style="font-size: 14px;">
              <option value="absent_brain">Absent</option>
              <option value="psma_present_brain">Present</option>
            </select>
          </div>
          <div v-if="part4.pt4_psma_brain == 'psma_present_brain'" class="input-group input-group-sm">
            <span class="input-group-text">Location</span>
            <input v-model="part4.pt4_psma_present_brain" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text">SUV</span>
            <input v-model="part4.pt4_psma_present_brain" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text">Measurement (cm)</span>
            <input v-model="part4.pt4_psma_present_brain" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">e. Lungs</span>
            <select v-model="part4.pt4_psma_lungs" name="psma_lungs" style="font-size: 14px;">
              <option value="absent_lungs">Absent</option>
              <option value="psma_present_lungs">Present</option>
            </select>
          </div>
          <div v-if="part4.pt4_psma_lungs == 'psma_present_lungs'" class="input-group input-group-sm">
            <span class="input-group-text">Location</span>
            <input v-model="part4.pt4_psma_present_lungs" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text">SUV</span>
            <input v-model="part4.pt4_psma_present_lungs" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text">Measurement (cm)</span>
            <input v-model="part4.pt4_psma_present_lungs" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">f. Liver</span>
            <select v-model="part4.pt4_psma_liver" name="psma_liver" style="font-size: 14px;">
              <option value="absent_liver">Absent</option>
              <option value="psma_present_liver">Present</option>
            </select>
          </div>
          <div v-if="part4.pt4_psma_liver == 'psma_present_liver'" class="input-group input-group-sm">
            <span class="input-group-text">Location</span>
            <input v-model="part4.pt4_psma_present_liver" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text">SUV</span>
            <input v-model="part4.pt4_psma_present_liver" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text">Measurement (cm)</span>
            <input v-model="part4.pt4_psma_present_liver" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          </div>
          <div class="input-group input-group-sm">
            <span class="input-group-text">g. Others</span>
            <select v-model="part4.pt4_psma_others" name="psma_others" style="font-size: 14px;">
              <option value="absent_other">Absent</option>
              <option value="psma_present_others">Present</option>
            </select>
          </div>
          <div v-if="part4.pt4_psma_others == 'psma_present_others'" class="input-group input-group-sm">
            <span class="input-group-text">Location</span>
            <input v-model="part4.pt4_psma_present_others" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text">SUV</span>
            <input v-model="part4.pt4_psma_present_others" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
            <span class="input-group-text">Measurement (cm)</span>
            <input v-model="part4.pt4_psma_present_others" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          </div>
        </div>
      </div>
      <div class="align-self-start d-flex flex-column p-2" style="border: 1px solid lightgray; border-radius: 5px; gap: 5px;">
        <span style="padding-right:1cm">v. FDG PET/CT</span>
        <div class="input-group input-group-sm">
        <span class="input-group-text">a. Prostate</span>
        <select v-model="part4.pt4_fdg_prostate" name="fdg_prostate" style="font-size: 14px;">
          <option value="absent_prostate">Absent</option>
          <option value="fdg_present_prostate">Present</option>
        </select>
        </div>
        <div v-if="part4.pt4_fdg_prostate == 'fdg_present_prostate'" class="input-group input-group-sm">
          <span class="input-group-text">Location</span>
          <input v-model="part4.pt4_fdg_present_prostate" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text">SUV</span>
          <input v-model="part4.pt4_fdg_present_prostate" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text">Measurement (cm)</span>
          <input v-model="part4.pt4_fdg_present_prostate" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
        </div>
        <div class="input-group input-group-sm">
        <span class="input-group-text">b. Lymph Nodes</span>
        <select v-model="part4.pt4_fdg_lymphn" name="fdg_lymphn" style="font-size: 14px;">
          <option value="absent_node">Absent</option>
          <option value="fdg_present_node">Present</option>
        </select>
        </div>
        <div v-if="part4.pt4_fdg_lymphn == 'fdg_present_node'" class="input-group input-group-sm">
          <span class="input-group-text">Location</span>
          <input v-model="part4.pt4_fdg_present_node" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text">SUV</span>
          <input v-model="part4.pt4_fdg_present_node" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text">Measurement (cm)</span>
          <input v-model="part4.pt4_fdg_present_node" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
        </div>
        <div class="input-group input-group-sm">
        <span class="input-group-text">c. Bone</span>
        <select v-model="part4.pt4_fdg_bone" name="fdg_bone" style="font-size: 14px;">
          <option value="absent_bone">Absent</option>
          <option value="fdg_present_bone">Present</option>
        </select>
        </div>
        <div v-if="part4.pt4_fdg_bone == 'fdg_present_bone'" class="input-group input-group-sm">
          <span class="input-group-text">Location</span>
          <input v-model="part4.pt4_fdg_present_bone" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text">SUV</span>
          <input v-model="part4.pt4_fdg_present_bone" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text">Measurement (cm)</span>
          <input v-model="part4.pt4_fdg_present_bone" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
        </div>
        <div class="input-group input-group-sm">
        <span class="input-group-text">d. Brain</span>
        <select v-model="part4.pt4_fdg_brain" name="fdg_brain" style="font-size: 14px;">
          <option value="absent_brain">Absent</option>
          <option value="fdg_present_brain">Present</option>
        </select>
        </div>
        <div v-if="part4.pt4_fdg_brain == 'fdg_present_brain'" class="input-group input-group-sm">
          <span class="input-group-text">Location</span>
          <input v-model="part4.pt4_fdg_present_brain" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text">SUV</span>
          <input v-model="part4.pt4_fdg_present_brain" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text">Measurement (cm)</span>
          <input v-model="part4.pt4_fdg_present_brain" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
        </div>
        <div class="input-group input-group-sm">
        <span class="input-group-text">e. Lungs</span>
        <select v-model="part4.pt4_fdg_lungs" name="fdg_lungs" style="font-size: 14px;">
          <option value="absent_lungs">Absent</option>
          <option value="fdg_present_lungs">Present</option>
        </select>
        </div>
        <div v-if="part4.pt4_fdg_lungs == 'fdg_present_lungs'" class="input-group input-group-sm">
          <span class="input-group-text">Location</span>
          <input v-model="part4.pt4_fdg_present_lungs" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text">SUV</span>
          <input v-model="part4.pt4_fdg_present_lungs" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text">Measurement (cm)</span>
          <input v-model="part4.pt4_fdg_present_lungs" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
        </div>
        <div class="input-group input-group-sm">
        <span class="input-group-text">f. Liver</span>
        <select v-model="part4.pt4_fdg_liver" name="fdg_liver" style="font-size: 14px;">
          <option value="absent_liver">Absent</option>
          <option value="fdg_present_liver">Present</option>
        </select>
        </div>
        <div v-if="part4.pt4_fdg_liver == 'fdg_present_liver'" class="input-group input-group-sm">
          <span class="input-group-text">Location</span>
          <input v-model="part4.pt4_fdg_present_liver" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text">SUV</span>
          <input v-model="part4.pt4_fdg_present_liver" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text">Measurement (cm)</span>
          <input v-model="part4.pt4_fdg_present_liver" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
        </div>
        <div class="input-group input-group-sm">
        <span class="input-group-text">g. Others</span>
        <select v-model="part4.pt4_fdg_others" name="fdg_others" style="font-size: 14px;">
          <option value="absent_other">Absent</option>
          <option value="fdg_present_others">Present</option>
        </select>
        </div>
        <div v-if="part4.pt4_fdg_others == 'fdg_present_others'" class="input-group input-group-sm">
          <span class="input-group-text">Location</span>
          <input v-model="part4.pt4_fdg_present_others" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text">SUV</span>
          <input v-model="part4.pt4_fdg_present_others" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
          <span class="input-group-text">Measurement (cm)</span>
          <input v-model="part4.pt4_fdg_present_others" type="text" class="form-control" placeholder="" style="flex: none; min-width: 200px;">
        </div>
      </div>
      <div class="input-group input-group-sm">
        <span class="input-group-text" style="font-size: 16px;">c. Assessment</span>
        <select v-model="part4.pt4_new_assessment" name="fu_new_assessment" style="font-size: 14px; width: 150px;">
          <option value="low_risk">Low Risk</option>
          <option value="inter_risk">Intermediate Risk</option>
          <option value="high_risk">High Risk</option>
        </select>
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" style="font-size: 16px;">d. Plan</span>
        <textarea class="form-control" v-model="part4.pt4_new_plan" name="fu_new_plan" aria-label="new_plan" style="font-size: 12px;"></textarea>
      </div>
    </div>
  </div>
  <!-- end 1.3 -->
  <button @click="" type="button" class="align-self-center btn btn-lg btn-secondary mb-3">Save Follow-up</button>
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
