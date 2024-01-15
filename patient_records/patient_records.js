const database = require('../database/database')
const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')

// Routes

  // generate patient_code
  router.post('/api/patient_code/new', loggedInOnly, async(req,res) => {
    try {
      const generated_patient_code = uuidv4()
      res.json({generated_patient_code: generated_patient_code}).send()
    } catch (error) {
      console.log('Error on api > patient_code > new', error)
      res.status(401).json({message: error}).send()
    }
  })
  // end generate patient_code

  // add new patient
  router.post('/api/patient/create', loggedInOnly, async(req, res) => {
    // req.body = {
    // part1: {}
    // therapy_sessions: []
    // post_therapy_sessions: [] 
    // }
    try {
      const source = './database/db.sqlite'
      const db = await database.openOrCreateDB(source)
      // generate patient_code
      const generated_patient_code = uuidv4()
      // end generate patient_code
      // create row in patient table
      await database.run(db, `
        INSERT OR REPLACE INTO patient (
          pt1_patient_code,
          first_visit,
          last_visit
        ) VALUES (?, ?, ?)
      `, [
        generated_patient_code,
        Date.now(),
        Date.now()
      ], false)
      // end create row in patient table
      // generate patient_record
      const generated_patient_record = uuidv4()
      // end generate patient_record
      // create row in part1 table
      await database.run(db, `
        INSERT OR REPLACE INTO part1 (
          pt1_patient_record,
          pt1_patient_code,
          pt1_first_name,
          pt1_last_name,
          pt1_age,
          pt1_city,
          pt1_date_diag,
          pt1_date_surgery,
          pt1_histo,
          pt1_gs,
          pt1_date_treatment,
          pt1_type_treatment,
          pt1_type_treatment_others,
          pt1_ecog_score,
          pt1_height,
          pt1_weight,
          pt1_bmi,
          pt1_bp,
          pt1_hr,
          pt1_pain_score,
          pt1_local_symps,
          pt1_sys_symps,
          pt1_psa,
          pt1_creatinine,
          pt1_wbc,
          pt1_rbc,
          pt1_hemoglobin,
          pt1_hematocrit,
          pt1_platelet,
          pt1_lactate,
          pt1_alkaline,
          pt1_ssb,
          pt1_salivary,
          pt1_renal,
          pt1_bone_scan,
          pt1_bone_withmetas,
          pt1_psma_picked,
          pt1_psma_prostate,
          pt1_psma_prostate_loc,
          pt1_psma_prostate_suv,
          pt1_psma_prostate_meas,
          pt1_psma_lymphs,
          pt1_psma_lymphs_loc,
          pt1_psma_lymphs_suv,
          pt1_psma_lymphs_meas,
          pt1_psma_bone,
          pt1_psma_bone_loc,
          pt1_psma_bone_suv,
          pt1_psma_bone_meas,
          pt1_psma_brain,
          pt1_psma_brain_loc,
          pt1_psma_brain_suv,
          pt1_psma_brain_meas,
          pt1_psma_lungs,
          pt1_psma_lungs_loc,
          pt1_psma_lungs_suv,
          pt1_psma_lungs_meas,
          pt1_psma_liver,
          pt1_psma_liver_loc,
          pt1_psma_liver_suv,
          pt1_psma_liver_meas,
          pt1_psma_others,
          pt1_psma_others_loc,
          pt1_psma_others_suv,
          pt1_psma_others_meas,
          pt1_fdg_prostate,
          pt1_fdg_prostate_loc,
          pt1_fdg_prostate_suv,
          pt1_fdg_prostate_meas,
          pt1_fdg_lymphs,
          pt1_fdg_lymphs_loc,
          pt1_fdg_lymphs_suv,
          pt1_fdg_lymphs_meas,
          pt1_fdg_bone,
          pt1_fdg_bone_loc,
          pt1_fdg_bone_suv,
          pt1_fdg_bone_meas,
          pt1_fdg_brain,
          pt1_fdg_brain_loc,
          pt1_fdg_brain_suv,
          pt1_fdg_brain_meas,
          pt1_fdg_lungs,
          pt1_fdg_lungs_loc,
          pt1_fdg_lungs_suv,
          pt1_fdg_lungs_meas,
          pt1_fdg_liver,
          pt1_fdg_liver_loc,
          pt1_fdg_liver_suv,
          pt1_fdg_liver_meas,
          pt1_fdg_others,
          pt1_fdg_others_loc,
          pt1_fdg_others_suv,
          pt1_fdg_others_meas,
          pt1_assessment,
          pt1_plan          
        ) VALUES (
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?)
      `, [
        generated_patient_record,
        generated_patient_code,
        req.body.part1.pt1_first_name.toLowerCase(),
        req.body.part1.pt1_last_name.toLowerCase(),
        req.body.part1.pt1_age,
        req.body.part1.pt1_city,
        req.body.part1.pt1_date_diag,
        req.body.part1.pt1_date_surgery,
        req.body.part1.pt1_histo,
        req.body.part1.pt1_gs,
        req.body.part1.pt1_date_treatment,
        req.body.part1.pt1_type_treatment,
        req.body.part1.pt1_type_treatment_others,
        req.body.part1.pt1_ecog_score,
        req.body.part1.pt1_height,
        req.body.part1.pt1_weight,
        req.body.part1.pt1_bmi,
        req.body.part1.pt1_bp,
        req.body.part1.pt1_hr,
        req.body.part1.pt1_pain_score,
        req.body.part1.pt1_local_symps,
        req.body.part1.pt1_sys_symps,
        req.body.part1.pt1_psa,
        req.body.part1.pt1_creatinine,
        req.body.part1.pt1_wbc,
        req.body.part1.pt1_rbc,
        req.body.part1.pt1_hemoglobin,
        req.body.part1.pt1_hematocrit,
        req.body.part1.pt1_platelet,
        req.body.part1.pt1_lactate,
        req.body.part1.pt1_alkaline,
        req.body.part1.pt1_ssb,
        req.body.part1.pt1_salivary,
        req.body.part1.pt1_renal,
        req.body.part1.pt1_bone_scan,
        req.body.part1.pt1_bone_withmetas,
        req.body.part1.pt1_psma_picked,
        req.body.part1.pt1_psma_prostate,
        req.body.part1.pt1_psma_prostate_loc,
        req.body.part1.pt1_psma_prostate_suv,
        req.body.part1.pt1_psma_prostate_meas,
        req.body.part1.pt1_psma_lymphs,
        req.body.part1.pt1_psma_lymphs_loc,
        req.body.part1.pt1_psma_lymphs_suv,
        req.body.part1.pt1_psma_lymphs_meas,
        req.body.part1.pt1_psma_bone,
        req.body.part1.pt1_psma_bone_loc,
        req.body.part1.pt1_psma_bone_suv,
        req.body.part1.pt1_psma_bone_meas,
        req.body.part1.pt1_psma_brain,
        req.body.part1.pt1_psma_brain_loc,
        req.body.part1.pt1_psma_brain_suv,
        req.body.part1.pt1_psma_brain_meas,
        req.body.part1.pt1_psma_lungs,
        req.body.part1.pt1_psma_lungs_loc,
        req.body.part1.pt1_psma_lungs_suv,
        req.body.part1.pt1_psma_lungs_meas,
        req.body.part1.pt1_psma_liver,
        req.body.part1.pt1_psma_liver_loc,
        req.body.part1.pt1_psma_liver_suv,
        req.body.part1.pt1_psma_liver_meas,
        req.body.part1.pt1_psma_others,
        req.body.part1.pt1_psma_others_loc,
        req.body.part1.pt1_psma_others_suv,
        req.body.part1.pt1_psma_others_meas,
        req.body.part1.pt1_fdg_prostate,
        req.body.part1.pt1_fdg_prostate_loc,
        req.body.part1.pt1_fdg_prostate_suv,
        req.body.part1.pt1_fdg_prostate_meas,
        req.body.part1.pt1_fdg_lymphs,
        req.body.part1.pt1_fdg_lymphs_loc,
        req.body.part1.pt1_fdg_lymphs_suv,
        req.body.part1.pt1_fdg_lymphs_meas,
        req.body.part1.pt1_fdg_bone,
        req.body.part1.pt1_fdg_bone_loc,
        req.body.part1.pt1_fdg_bone_suv,
        req.body.part1.pt1_fdg_bone_meas,
        req.body.part1.pt1_fdg_brain,
        req.body.part1.pt1_fdg_brain_loc,
        req.body.part1.pt1_fdg_brain_suv,
        req.body.part1.pt1_fdg_brain_meas,
        req.body.part1.pt1_fdg_lungs,
        req.body.part1.pt1_fdg_lungs_loc,
        req.body.part1.pt1_fdg_lungs_suv,
        req.body.part1.pt1_fdg_lungs_meas,
        req.body.part1.pt1_fdg_liver,
        req.body.part1.pt1_fdg_liver_loc,
        req.body.part1.pt1_fdg_liver_suv,
        req.body.part1.pt1_fdg_liver_meas,
        req.body.part1.pt1_fdg_others,
        req.body.part1.pt1_fdg_others_loc,
        req.body.part1.pt1_fdg_others_suv,
        req.body.part1.pt1_fdg_others_meas,
        req.body.part1.pt1_assessment,
        req.body.part1.pt1_plan
      ], false)
      // end create row in part1 table
      // console.log('done part 1') // temp
      // create row in part2 table
      for (let i=0; i<req.body.therapy_sessions.length; i++) {
        // for each therapy session instance:
        await database.run(db, `
          INSERT OR REPLACE INTO part2 (
            therapy_session_id,
            pt1_patient_record,
            pt1_patient_code,
            pt2_date_psma,
            pt2_premed,
            pt2_med,
            pt2_bp,
            pt2_hr,
            pt2_rr,
            pt2_o2,
            pt2_date_therapy,
            pt2_radiopharm,
            pt2_activity,
            pt2_fatigue,
            pt2_fatigue_text,
            pt2_nausea,
            pt2_nausea_text,
            pt2_dry_lips,
            pt2_dry_lips_text,
            pt2_headache,
            pt2_headache_text,
            pt2_bone_pain,
            pt2_bone_pain_text,
            pt2_others,
            pt2_others_text
          ) VALUES (
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?
          )
        `, [
          uuidv4(),
          generated_patient_record,
          generated_patient_code,
          req.body.therapy_sessions[i].pt2_date_psma,
          req.body.therapy_sessions[i].pt2_premed,
          req.body.therapy_sessions[i].pt2_med,
          req.body.therapy_sessions[i].pt2_bp,
          req.body.therapy_sessions[i].pt2_hr,
          req.body.therapy_sessions[i].pt2_rr,
          req.body.therapy_sessions[i].pt2_o2,
          req.body.therapy_sessions[i].pt2_date_therapy,
          req.body.therapy_sessions[i].pt2_radiopharm,
          req.body.therapy_sessions[i].pt2_activity,
          req.body.therapy_sessions[i].pt2_fatigue,
          req.body.therapy_sessions[i].pt2_fatigue_text,
          req.body.therapy_sessions[i].pt2_nausea,
          req.body.therapy_sessions[i].pt2_nausea_text,
          req.body.therapy_sessions[i].pt2_dry_lips,
          req.body.therapy_sessions[i].pt2_dry_lips_text,
          req.body.therapy_sessions[i].pt2_headache,
          req.body.therapy_sessions[i].pt2_headache_text,
          req.body.therapy_sessions[i].pt2_bone_pain,
          req.body.therapy_sessions[i].pt2_bone_pain_text,
          req.body.therapy_sessions[i].pt2_others,
          req.body.therapy_sessions[i].pt2_others_text          
        ], false)
        // end create row in part2 table
      }
      // console.log('done part 2') // temp
      // start of part 3
      for (let i=0; i<req.body.post_therapy_sessions.length; i++) {
        // for each post therapy session:
        // create row in part3 table
        await database.run(db, `
          INSERT OR REPLACE INTO part3 (
            post_therapy_session_id,
            pt1_patient_record,
            pt1_patient_code,
            pt3_date_post_therapy,
            pt3_hour,
            pt3_spectct,
            pt3_prostate,
            pt3_prostate_text,
            pt3_lymph_nodes,
            pt3_lymph_nodes_text,
            pt3_bones,
            pt3_bones_text,
            pt3_lungs,
            pt3_lungs_text,
            pt3_liver,
            pt3_liver_text,
            pt3_sg,
            pt3_rk,
            pt3_lk
          ) VALUES (
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?,?,?,?
          )
        `, [
          uuidv4(),
          generated_patient_record,
          generated_patient_code,
          req.body.post_therapy_sessions[i].pt3_date_post_therapy,
          req.body.post_therapy_sessions[i].pt3_hour,
          req.body.post_therapy_sessions[i].pt3_spectct,
          req.body.post_therapy_sessions[i].pt3_prostate,
          req.body.post_therapy_sessions[i].pt3_prostate_text,
          req.body.post_therapy_sessions[i].pt3_lymph_nodes,
          req.body.post_therapy_sessions[i].pt3_lymph_nodes_text,
          req.body.post_therapy_sessions[i].pt3_bones,
          req.body.post_therapy_sessions[i].pt3_bones_text,
          req.body.post_therapy_sessions[i].pt3_lungs,
          req.body.post_therapy_sessions[i].pt3_lungs_text,
          req.body.post_therapy_sessions[i].pt3_liver,
          req.body.post_therapy_sessions[i].pt3_liver_text,
          req.body.post_therapy_sessions[i].pt3_sg,
          req.body.post_therapy_sessions[i].pt3_rk,
          req.body.post_therapy_sessions[i].pt3_lk
        ], false)
        // end create row in part3 table        
      
      }
      // end of part 3
      res.json({message: 'Create Success'}).send()
    } catch (error) {
      console.log('Error on api > patient_consultation > create')
      console.log(error)
      res.status(401).json({message: error}).send()
    }
  })
  // end add new patient

  // edit patient
  router.post('/api/patient/edit', async (req, res) => {
    // req.body = {
    //  part1: {},
    //  therapy_sessions: [],
    //  post_therapy_sessions: [],
    //  part4: []
    // }
    try {
      const source = './database/db.sqlite'
      const db = await database.openOrCreateDB(source)
      // create row in part1 table
      await database.run(db, `
        INSERT OR REPLACE INTO part1 (
          pt1_patient_record,
          pt1_patient_code,
          pt1_first_name,
          pt1_last_name,
          pt1_age,
          pt1_city,
          pt1_date_diag,
          pt1_date_surgery,
          pt1_histo,
          pt1_gs,
          pt1_date_treatment,
          pt1_type_treatment,
          pt1_type_treatment_others,
          pt1_ecog_score,
          pt1_height,
          pt1_weight,
          pt1_bmi,
          pt1_bp,
          pt1_hr,
          pt1_pain_score,
          pt1_local_symps,
          pt1_sys_symps,
          pt1_psa,
          pt1_creatinine,
          pt1_wbc,
          pt1_rbc,
          pt1_hemoglobin,
          pt1_hematocrit,
          pt1_platelet,
          pt1_lactate,
          pt1_alkaline,
          pt1_ssb,
          pt1_salivary,
          pt1_renal,
          pt1_bone_scan,
          pt1_bone_withmetas,
          pt1_psma_picked,
          pt1_psma_prostate,
          pt1_psma_prostate_loc,
          pt1_psma_prostate_suv,
          pt1_psma_prostate_meas,
          pt1_psma_lymphs,
          pt1_psma_lymphs_loc,
          pt1_psma_lymphs_suv,
          pt1_psma_lymphs_meas,
          pt1_psma_bone,
          pt1_psma_bone_loc,
          pt1_psma_bone_suv,
          pt1_psma_bone_meas,
          pt1_psma_brain,
          pt1_psma_brain_loc,
          pt1_psma_brain_suv,
          pt1_psma_brain_meas,
          pt1_psma_lungs,
          pt1_psma_lungs_loc,
          pt1_psma_lungs_suv,
          pt1_psma_lungs_meas,
          pt1_psma_liver,
          pt1_psma_liver_loc,
          pt1_psma_liver_suv,
          pt1_psma_liver_meas,
          pt1_psma_others,
          pt1_psma_others_loc,
          pt1_psma_others_suv,
          pt1_psma_others_meas,
          pt1_fdg_prostate,
          pt1_fdg_prostate_loc,
          pt1_fdg_prostate_suv,
          pt1_fdg_prostate_meas,
          pt1_fdg_lymphs,
          pt1_fdg_lymphs_loc,
          pt1_fdg_lymphs_suv,
          pt1_fdg_lymphs_meas,
          pt1_fdg_bone,
          pt1_fdg_bone_loc,
          pt1_fdg_bone_suv,
          pt1_fdg_bone_meas,
          pt1_fdg_brain,
          pt1_fdg_brain_loc,
          pt1_fdg_brain_suv,
          pt1_fdg_brain_meas,
          pt1_fdg_lungs,
          pt1_fdg_lungs_loc,
          pt1_fdg_lungs_suv,
          pt1_fdg_lungs_meas,
          pt1_fdg_liver,
          pt1_fdg_liver_loc,
          pt1_fdg_liver_suv,
          pt1_fdg_liver_meas,
          pt1_fdg_others,
          pt1_fdg_others_loc,
          pt1_fdg_others_suv,
          pt1_fdg_others_meas,
          pt1_assessment,
          pt1_plan          
        ) VALUES (
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?)
      `, [
        req.body.part1.pt1_patient_record,
        req.body.part1.pt1_patient_code,
        req.body.part1.pt1_first_name.toLowerCase(),
        req.body.part1.pt1_last_name.toLowerCase(),
        req.body.part1.pt1_age,
        req.body.part1.pt1_city,
        req.body.part1.pt1_date_diag,
        req.body.part1.pt1_date_surgery,
        req.body.part1.pt1_histo,
        req.body.part1.pt1_gs,
        req.body.part1.pt1_date_treatment,
        req.body.part1.pt1_type_treatment,
        req.body.part1.pt1_type_treatment_others,
        req.body.part1.pt1_ecog_score,
        req.body.part1.pt1_height,
        req.body.part1.pt1_weight,
        req.body.part1.pt1_bmi,
        req.body.part1.pt1_bp,
        req.body.part1.pt1_hr,
        req.body.part1.pt1_pain_score,
        req.body.part1.pt1_local_symps,
        req.body.part1.pt1_sys_symps,
        req.body.part1.pt1_psa,
        req.body.part1.pt1_creatinine,
        req.body.part1.pt1_wbc,
        req.body.part1.pt1_rbc,
        req.body.part1.pt1_hemoglobin,
        req.body.part1.pt1_hematocrit,
        req.body.part1.pt1_platelet,
        req.body.part1.pt1_lactate,
        req.body.part1.pt1_alkaline,
        req.body.part1.pt1_ssb,
        req.body.part1.pt1_salivary,
        req.body.part1.pt1_renal,
        req.body.part1.pt1_bone_scan,
        req.body.part1.pt1_bone_withmetas,
        req.body.part1.pt1_psma_picked,
        req.body.part1.pt1_psma_prostate,
        req.body.part1.pt1_psma_prostate_loc,
        req.body.part1.pt1_psma_prostate_suv,
        req.body.part1.pt1_psma_prostate_meas,
        req.body.part1.pt1_psma_lymphs,
        req.body.part1.pt1_psma_lymphs_loc,
        req.body.part1.pt1_psma_lymphs_suv,
        req.body.part1.pt1_psma_lymphs_meas,
        req.body.part1.pt1_psma_bone,
        req.body.part1.pt1_psma_bone_loc,
        req.body.part1.pt1_psma_bone_suv,
        req.body.part1.pt1_psma_bone_meas,
        req.body.part1.pt1_psma_brain,
        req.body.part1.pt1_psma_brain_loc,
        req.body.part1.pt1_psma_brain_suv,
        req.body.part1.pt1_psma_brain_meas,
        req.body.part1.pt1_psma_lungs,
        req.body.part1.pt1_psma_lungs_loc,
        req.body.part1.pt1_psma_lungs_suv,
        req.body.part1.pt1_psma_lungs_meas,
        req.body.part1.pt1_psma_liver,
        req.body.part1.pt1_psma_liver_loc,
        req.body.part1.pt1_psma_liver_suv,
        req.body.part1.pt1_psma_liver_meas,
        req.body.part1.pt1_psma_others,
        req.body.part1.pt1_psma_others_loc,
        req.body.part1.pt1_psma_others_suv,
        req.body.part1.pt1_psma_others_meas,
        req.body.part1.pt1_fdg_prostate,
        req.body.part1.pt1_fdg_prostate_loc,
        req.body.part1.pt1_fdg_prostate_suv,
        req.body.part1.pt1_fdg_prostate_meas,
        req.body.part1.pt1_fdg_lymphs,
        req.body.part1.pt1_fdg_lymphs_loc,
        req.body.part1.pt1_fdg_lymphs_suv,
        req.body.part1.pt1_fdg_lymphs_meas,
        req.body.part1.pt1_fdg_bone,
        req.body.part1.pt1_fdg_bone_loc,
        req.body.part1.pt1_fdg_bone_suv,
        req.body.part1.pt1_fdg_bone_meas,
        req.body.part1.pt1_fdg_brain,
        req.body.part1.pt1_fdg_brain_loc,
        req.body.part1.pt1_fdg_brain_suv,
        req.body.part1.pt1_fdg_brain_meas,
        req.body.part1.pt1_fdg_lungs,
        req.body.part1.pt1_fdg_lungs_loc,
        req.body.part1.pt1_fdg_lungs_suv,
        req.body.part1.pt1_fdg_lungs_meas,
        req.body.part1.pt1_fdg_liver,
        req.body.part1.pt1_fdg_liver_loc,
        req.body.part1.pt1_fdg_liver_suv,
        req.body.part1.pt1_fdg_liver_meas,
        req.body.part1.pt1_fdg_others,
        req.body.part1.pt1_fdg_others_loc,
        req.body.part1.pt1_fdg_others_suv,
        req.body.part1.pt1_fdg_others_meas,
        req.body.part1.pt1_assessment,
        req.body.part1.pt1_plan
      ], false)
      // end create row in part1 table
      // console.log('done part 1') // temp
      // create row in part2 table
      for (let i=0; i<req.body.therapy_sessions.length; i++) {
        // for each therapy session instance:
        await database.run(db, `
          INSERT OR REPLACE INTO part2 (
            therapy_session_id,
            pt1_patient_record,
            pt1_patient_code,
            pt2_date_psma,
            pt2_premed,
            pt2_med,
            pt2_bp,
            pt2_hr,
            pt2_rr,
            pt2_o2,
            pt2_date_therapy,
            pt2_radiopharm,
            pt2_activity,
            pt2_fatigue,
            pt2_fatigue_text,
            pt2_nausea,
            pt2_nausea_text,
            pt2_dry_lips,
            pt2_dry_lips_text,
            pt2_headache,
            pt2_headache_text,
            pt2_bone_pain,
            pt2_bone_pain_text,
            pt2_others,
            pt2_others_text
          ) VALUES (
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?
          )
        `, [
          req.body.therapy_sessions[i].therapy_session_id,
          req.body.part1.pt1_patient_record,
          req.body.part1.pt1_patient_code,
          req.body.therapy_sessions[i].pt2_date_psma,
          req.body.therapy_sessions[i].pt2_premed,
          req.body.therapy_sessions[i].pt2_med,
          req.body.therapy_sessions[i].pt2_bp,
          req.body.therapy_sessions[i].pt2_hr,
          req.body.therapy_sessions[i].pt2_rr,
          req.body.therapy_sessions[i].pt2_o2,
          req.body.therapy_sessions[i].pt2_date_therapy,
          req.body.therapy_sessions[i].pt2_radiopharm,
          req.body.therapy_sessions[i].pt2_activity,
          req.body.therapy_sessions[i].pt2_fatigue,
          req.body.therapy_sessions[i].pt2_fatigue_text,
          req.body.therapy_sessions[i].pt2_nausea,
          req.body.therapy_sessions[i].pt2_nausea_text,
          req.body.therapy_sessions[i].pt2_dry_lips,
          req.body.therapy_sessions[i].pt2_dry_lips_text,
          req.body.therapy_sessions[i].pt2_headache,
          req.body.therapy_sessions[i].pt2_headache_text,
          req.body.therapy_sessions[i].pt2_bone_pain,
          req.body.therapy_sessions[i].pt2_bone_pain_text,
          req.body.therapy_sessions[i].pt2_others,
          req.body.therapy_sessions[i].pt2_others_text          
        ], false)
        // end create row in part2 table
      }
      // console.log('done part 2') // temp
      // start of part 3
      for (let i=0; i<req.body.post_therapy_sessions.length; i++) {
        // for each post therapy session:
        // create row in part3 table
        await database.run(db, `
          INSERT OR REPLACE INTO part3 (
            post_therapy_session_id,
            pt1_patient_record,
            pt1_patient_code,
            pt3_date_post_therapy,
            pt3_hour,
            pt3_spectct,
            pt3_prostate,
            pt3_prostate_text,
            pt3_lymph_nodes,
            pt3_lymph_nodes_text,
            pt3_bones,
            pt3_bones_text,
            pt3_lungs,
            pt3_lungs_text,
            pt3_liver,
            pt3_liver_text,
            pt3_sg,
            pt3_rk,
            pt3_lk
          ) VALUES (
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?,?,?,?
          )
        `, [
          req.body.post_therapy_sessions[i].post_therapy_session_id,
          req.body.part1.pt1_patient_record,
          req.body.part1.pt1_patient_code,
          req.body.post_therapy_sessions[i].pt3_date_post_therapy,
          req.body.post_therapy_sessions[i].pt3_hour,
          req.body.post_therapy_sessions[i].pt3_spectct,
          req.body.post_therapy_sessions[i].pt3_prostate,
          req.body.post_therapy_sessions[i].pt3_prostate_text,
          req.body.post_therapy_sessions[i].pt3_lymph_nodes,
          req.body.post_therapy_sessions[i].pt3_lymph_nodes_text,
          req.body.post_therapy_sessions[i].pt3_bones,
          req.body.post_therapy_sessions[i].pt3_bones_text,
          req.body.post_therapy_sessions[i].pt3_lungs,
          req.body.post_therapy_sessions[i].pt3_lungs_text,
          req.body.post_therapy_sessions[i].pt3_liver,
          req.body.post_therapy_sessions[i].pt3_liver_text,
          req.body.post_therapy_sessions[i].pt3_sg,
          req.body.post_therapy_sessions[i].pt3_rk,
          req.body.post_therapy_sessions[i].pt3_lk
        ], false)
        // end create row in part3 table        
      
      }
      // end of part 3  
      // part 4
      for (let i=0; i<req.body.part4.length; i++) {
        await database.run(db, `
          INSERT OR REPLACE INTO part4 (
            record_id,
            pt1_patient_code,
            pt4_date,
            pt4_psa,
            pt4_creatinine,
            pt4_wbc,
            pt4_rbc,
            pt4_hemoglobin,
            pt4_hematocrit,
            pt4_platelet,
            pt4_lactate,
            pt4_alkaline,
            pt4_ssb,
            pt4_salivary,
            pt4_renal,
            pt4_bone_scan,
            pt4_bone_withmetas,
            pt4_psma_picked,
            pt4_psma_prostate,
            pt4_psma_prostate_loc,
            pt4_psma_prostate_suv,
            pt4_psma_prostate_meas,
            pt4_psma_lymphs,
            pt4_psma_lymphs_loc,
            pt4_psma_lymphs_suv,
            pt4_psma_lymphs_meas,
            pt4_psma_bone,
            pt4_psma_bone_loc,
            pt4_psma_bone_suv,
            pt4_psma_bone_meas,
            pt4_psma_brain,
            pt4_psma_brain_loc,
            pt4_psma_brain_suv,
            pt4_psma_brain_meas,
            pt4_psma_lungs,
            pt4_psma_lungs_loc,
            pt4_psma_lungs_suv,
            pt4_psma_lungs_meas,
            pt4_psma_liver,
            pt4_psma_liver_loc,
            pt4_psma_liver_suv,
            pt4_psma_liver_meas,
            pt4_psma_others,
            pt4_psma_others_loc,
            pt4_psma_others_suv,
            pt4_psma_others_meas,
            pt4_fdg_prostate,
            pt4_fdg_prostate_loc,
            pt4_fdg_prostate_suv,
            pt4_fdg_prostate_meas,
            pt4_fdg_lymphs,
            pt4_fdg_lymphs_loc,
            pt4_fdg_lymphs_suv,
            pt4_fdg_lymphs_meas,
            pt4_fdg_bone,
            pt4_fdg_bone_loc,
            pt4_fdg_bone_suv,
            pt4_fdg_bone_meas,
            pt4_fdg_brain,
            pt4_fdg_brain_loc,
            pt4_fdg_brain_suv,
            pt4_fdg_brain_meas,
            pt4_fdg_lungs,
            pt4_fdg_lungs_loc,
            pt4_fdg_lungs_suv,
            pt4_fdg_lungs_meas,
            pt4_fdg_liver,
            pt4_fdg_liver_loc,
            pt4_fdg_liver_suv,
            pt4_fdg_liver_meas,
            pt4_fdg_others,
            pt4_fdg_others_loc,
            pt4_fdg_others_suv,
            pt4_fdg_others_measure,
            pt4_assessment,
            pt4_plan
          ) VALUES (
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?
          )
        `, [
          req.body.part4[i].record_id,
          req.body.part1.pt1_patient_code,
          req.body.part4[i].pt4_date,
          req.body.part4[i].pt4_psa,
          req.body.part4[i].pt4_creatinine,
          req.body.part4[i].pt4_wbc,
          req.body.part4[i].pt4_rbc,
          req.body.part4[i].pt4_hemoglobin,
          req.body.part4[i].pt4_hematocrit,
          req.body.part4[i].pt4_platelet,
          req.body.part4[i].pt4_lactate,
          req.body.part4[i].pt4_alkaline,
          req.body.part4[i].pt4_ssb,
          req.body.part4[i].pt4_salivary,
          req.body.part4[i].pt4_renal,
          req.body.part4[i].pt4_bone_scan,
          req.body.part4[i].pt4_bone_withmetas,
          req.body.part4[i].pt4_psma_picked,
          req.body.part4[i].pt4_psma_prostate,
          req.body.part4[i].pt4_psma_prostate_loc,
          req.body.part4[i].pt4_psma_prostate_suv,
          req.body.part4[i].pt4_psma_prostate_meas,
          req.body.part4[i].pt4_psma_lymphs,
          req.body.part4[i].pt4_psma_lymphs_loc,
          req.body.part4[i].pt4_psma_lymphs_suv,
          req.body.part4[i].pt4_psma_lymphs_meas,
          req.body.part4[i].pt4_psma_bone,
          req.body.part4[i].pt4_psma_bone_loc,
          req.body.part4[i].pt4_psma_bone_suv,
          req.body.part4[i].pt4_psma_bone_meas,
          req.body.part4[i].pt4_psma_brain,
          req.body.part4[i].pt4_psma_brain_loc,
          req.body.part4[i].pt4_psma_brain_suv,
          req.body.part4[i].pt4_psma_brain_meas,
          req.body.part4[i].pt4_psma_lungs,
          req.body.part4[i].pt4_psma_lungs_loc,
          req.body.part4[i].pt4_psma_lungs_suv,
          req.body.part4[i].pt4_psma_lungs_meas,
          req.body.part4[i].pt4_psma_liver,
          req.body.part4[i].pt4_psma_liver_loc,
          req.body.part4[i].pt4_psma_liver_suv,
          req.body.part4[i].pt4_psma_liver_meas,
          req.body.part4[i].pt4_psma_others,
          req.body.part4[i].pt4_psma_others_loc,
          req.body.part4[i].pt4_psma_others_suv,
          req.body.part4[i].pt4_psma_others_meas,
          req.body.part4[i].pt4_fdg_prostate,
          req.body.part4[i].pt4_fdg_prostate_loc,
          req.body.part4[i].pt4_fdg_prostate_suv,
          req.body.part4[i].pt4_fdg_prostate_meas,
          req.body.part4[i].pt4_fdg_lymphs,
          req.body.part4[i].pt4_fdg_lymphs_loc,
          req.body.part4[i].pt4_fdg_lymphs_suv,
          req.body.part4[i].pt4_fdg_lymphs_meas,
          req.body.part4[i].pt4_fdg_bone,
          req.body.part4[i].pt4_fdg_bone_loc,
          req.body.part4[i].pt4_fdg_bone_suv,
          req.body.part4[i].pt4_fdg_bone_meas,
          req.body.part4[i].pt4_fdg_brain,
          req.body.part4[i].pt4_fdg_brain_loc,
          req.body.part4[i].pt4_fdg_brain_suv,
          req.body.part4[i].pt4_fdg_brain_meas,
          req.body.part4[i].pt4_fdg_lungs,
          req.body.part4[i].pt4_fdg_lungs_loc,
          req.body.part4[i].pt4_fdg_lungs_suv,
          req.body.part4[i].pt4_fdg_lungs_meas,
          req.body.part4[i].pt4_fdg_liver,
          req.body.part4[i].pt4_fdg_liver_loc,
          req.body.part4[i].pt4_fdg_liver_suv,
          req.body.part4[i].pt4_fdg_liver_meas,
          req.body.part4[i].pt4_fdg_others,
          req.body.part4[i].pt4_fdg_others_loc,
          req.body.part4[i].pt4_fdg_others_suv,
          req.body.part4[i].pt4_fdg_others_measure,
          req.body.part4[i].pt4_assessment,
          req.body.part4[i].pt4_plan
        ], false)
      }
      // end part 4
      res.json({message: 'Edit success'}).send()    
    } catch (error) {
      console.log('Error in api > patient > edit', error)
      res.status(401).json({message: error}).send()
    }
  })
  // end edit patient

  // read
  router.post('/api/patient/read', loggedInOnly, async(req, res) => {
    try {
      const source = './database/db.sqlite'
      const db = await database.openOrCreateDB(source)
      // read all patients
      var rows = await database.all(db, `
        SELECT * FROM patient
      `, [], false)
      // end read all patients
      // for each patient, retrieve parts 1, 2, 3
      // part 1
      for (let i=0; i<rows.length; i++) {
        const part1_row = await database.get(db, `
          SELECT * FROM part1 WHERE pt1_patient_code = ?
        `, [rows[i].pt1_patient_code], false)
        rows[i].part1 = part1_row
      }
      // end part 1

      // if searchString is not empty, do filter by search
      if (req.body.searchString) {
        var filteredRows = [] // this is where we will store filtered rows
        // loop all patients, and push matching searchString names into new list
        for (let i=0; i<rows.length; i++) {
          const converted_searchString = req.body.searchString.toLowerCase()
          const converted_first_name = rows[i].part1.pt1_first_name.toLowerCase()
          const converted_last_name = rows[i].part1.pt1_last_name.toLowerCase()
          if (converted_first_name.includes(converted_searchString) || converted_last_name.includes(converted_searchString)){
            filteredRows.push(rows[i])
          }
        }
        rows = filteredRows
      }
      // end if searchString is not empty, do filter

      // if filter is enabled, filter
      if (req.body.filter == 'true') {
        var filteredRows = [] // this is where we will store filtered rows
        if (req.body.l1dropdown == 'assessment') {
          // then filter by assessment given by req.body.filter_config
          for (let i=0; i<rows.length; i++) {
            if (rows[i].part1?.pt1_assessment == req.body.filter_config || req.body.filter_config == '') {
              filteredRows.push(rows[i])
            }
          }
          rows = filteredRows
        } else if (req.body.l1dropdown == 'bone metastasis') {
          // then filter by bone metastasis given by req.body.filter_config
          for (let i=0; i<rows.length; i++) {
            if (rows[i].part1?.pt1_bone_scan == req.body.filter_config || req.body.filter_config == '') {
              filteredRows.push(rows[i])
            }
          }
          rows = filteredRows
        } else if (req.body.l1dropdown == 'lesions during screening') {
          // then filter patients matching lesions in specific parts
          // reduce to matching psma_dropdown
          var reduced_psma_dropdown = [] // this will store rows that has matching psma dropdown choice
          for (let i=0; i<rows.length; i++) {
            if (req.body.filter_config.psma_dropdown == "") { // if psma dropdown is "Choose One", ignore this filtering
              reduced_psma_dropdown.push(rows[i])
            } else {
              if (req.body.filter_config.psma_dropdown == rows[i].part1?.pt1_psma_picked) {
                reduced_psma_dropdown.push(rows[i])
              }
            }
          }
          // console.log("reduced_psma_dropdown is", reduced_psma_dropdown); // temp
          // end reduce to matching psma_dropdown
          // remove those that did not match psma_checkboxes
          var reduced_psma_checkboxes = []
          // console.log(`req.body.filter_config.psma_checkboxes.prostate is ${req.body.filter_config.psma_checkboxes.prostate}`) // temp
          // console.log(`typeof req.body.filter_config.psma_checkboxes.prostate is ${typeof(req.body.filter_config.psma_checkboxes.prostate)}`) // temp
          // console.log("reduced_psma_dropdown.length is", reduced_psma_dropdown.length); // temp
          // console.log("req.body.filter_config.psma_checkboxes is", req.body.filter_config.psma_checkboxes); // debug
          if (
            req.body.filter_config.psma_checkboxes.prostate ||
            req.body.filter_config.psma_checkboxes.bone ||
            req.body.filter_config.psma_checkboxes.brain ||
            req.body.filter_config.psma_checkboxes.liver ||
            req.body.filter_config.psma_checkboxes.lungs ||
            req.body.filter_config.psma_checkboxes.lymph_nodes ||
            req.body.filter_config.psma_checkboxes.other
          ) {
            // console.log("performing psma dropdown check"); // temp
            for (let i=0; i<reduced_psma_dropdown.length; i++) {
              if ( (reduced_psma_dropdown[i].part1?.pt1_psma_prostate == 'psma_present_prostate' && req.body.filter_config.psma_checkboxes.prostate) || (reduced_psma_dropdown[i].part1?.pt1_psma_prostate == 'psma_absent_prostate' && !req.body.filter_config.psma_checkboxes.prostate) ) {
                console.log('winner!!') // temp
                if ( (reduced_psma_dropdown[i].part1?.pt1_psma_lymphs == 'psma_present_node' && req.body.filter_config.psma_checkboxes.lymph_nodes) || (reduced_psma_dropdown[i].part1?.pt1_psma_lymphs == 'psma_absent_node' && !req.body.filter_config.psma_checkboxes.lymph_nodes) ) {
                  if ( (reduced_psma_dropdown[i].part1?.pt1_psma_bone == 'psma_present_bone' && req.body.filter_config.psma_checkboxes.bone) || (reduced_psma_dropdown[i].part1?.pt1_psma_bone == 'psma_absent_bone' && !req.body.filter_config.psma_checkboxes.bone) ) {
                    if ( (reduced_psma_dropdown[i].part1?.pt1_psma_brain == 'psma_present_brain' && req.body.filter_config.psma_checkboxes.brain) || (reduced_psma_dropdown[i].part1?.pt1_psma_brain == 'psma_absent_brain' && !req.body.filter_config.psma_checkboxes.brain) ) {
                      if ( (reduced_psma_dropdown[i].part1?.pt1_psma_lungs == 'psma_present_lungs' && req.body.filter_config.psma_checkboxes.lungs) || (reduced_psma_dropdown[i].part1?.pt1_psma_lungs == 'psma_absent_lungs' && !req.body.filter_config.psma_checkboxes.lungs) ) {
                        if ( (reduced_psma_dropdown[i].part1?.pt1_psma_liver == 'psma_present_liver' && req.body.filter_config.psma_checkboxes.liver) || (reduced_psma_dropdown[i].part1?.pt1_psma_liver == 'psma_absent_liver' && !req.body.filter_config.psma_checkboxes.liver) ) {
                          if ( (reduced_psma_dropdown[i].part1?.pt1_psma_others == 'psma_present_others' && req.body.filter_config.psma_checkboxes.other) || (reduced_psma_dropdown[i].part1?.pt1_psma_others == 'psma_absent_others' && !req.body.filter_config.psma_checkboxes.other) ) {
                            // winners
                            reduced_psma_checkboxes.push(reduced_psma_dropdown[i])
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          } else {
            reduced_psma_checkboxes = reduced_psma_dropdown;
          }
          console.log(`reduced_psma_checkboxes.length is ${reduced_psma_checkboxes.length}`) // temp
          // end remove those that did not match psma_checkboxes
          // remove those that did not match fdg_checkboxes
          var reduced_fdg_checkboxes = []
          for (let i=0; i<reduced_psma_checkboxes.length; i++) {
            if ( (reduced_psma_checkboxes[i].part1?.pt1_fdg_prostate == 'fdg_present_prostate' && req.body.filter_config.fdg_checkboxes.prostate) || (reduced_psma_checkboxes[i].part1?.pt1_fdg_prostate == 'fdg_absent_prostate' && !req.body.filter_config.fdg_checkboxes.prostate) ) {
              if ( (reduced_psma_checkboxes[i].part1?.pt1_fdg_lymphs == 'fdg_present_node' && req.body.filter_config.fdg_checkboxes.lymph_nodes) || (reduced_psma_checkboxes[i].part1?.pt1_fdg_lymphs == 'fdg_absent_node' && !req.body.filter_config.fdg_checkboxes.lymph_nodes) ) {
                if ( (reduced_psma_checkboxes[i].part1?.pt1_fdg_bone == 'fdg_present_bone' && req.body.filter_config.fdg_checkboxes.bone) || (reduced_psma_checkboxes[i].part1?.pt1_fdg_bone == 'fdg_absent_bone' && !req.body.filter_config.fdg_checkboxes.bone) ) {
                  if ( (reduced_psma_checkboxes[i].part1?.pt1_fdg_brain == 'fdg_present_brain' && req.body.filter_config.fdg_checkboxes.brain) || (reduced_psma_checkboxes[i].part1?.pt1_fdg_brain == 'fdg_absent_brain' && !req.body.filter_config.fdg_checkboxes.brain) ) {
                    if ( (reduced_psma_checkboxes[i].part1?.pt1_fdg_lungs == 'fdg_present_lungs' && req.body.filter_config.fdg_checkboxes.lungs) || (reduced_psma_checkboxes[i].part1?.pt1_fdg_lungs == 'fdg_absent_lungs' && !req.body.filter_config.fdg_checkboxes.lungs) ) {
                      if ( (reduced_psma_checkboxes[i].part1?.pt1_fdg_liver == 'fdg_present_liver' && req.body.filter_config.fdg_checkboxes.liver) || (reduced_psma_checkboxes[i].part1?.pt1_fdg_liver == 'fdg_absent_liver' && !req.body.filter_config.fdg_checkboxes.liver) ) {
                        if ( (reduced_psma_checkboxes[i].part1?.pt1_fdg_others == 'fdg_present_others' && req.body.filter_config.fdg_checkboxes.other) || (reduced_psma_checkboxes[i].part1?.pt1_fdg_others == 'fdg_absent_others' && !req.body.filter_config.fdg_checkboxes.other) ) {
                          // winners
                          reduced_fdg_checkboxes.push(reduced_psma_checkboxes[i])
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          // end remove those that did not match fdg_checkboxes
          rows = reduced_fdg_checkboxes
        } else {

        }
        // rows = filteredRows
      }
      // end if filter is enabled, filter

      // part 2
      for (let i=0; i<rows.length; i++) {
        const part2_rows = await database.all(db, `
          SELECT * FROM part2 WHERE pt1_patient_code = ?
        `, [rows[i].pt1_patient_code], false)
        rows[i].therapy_sessions = part2_rows
      }
      // end part 2


      // check for more filters
      if (req.body.filter == 'true') {
        if (req.body.l1dropdown == 'has side effects during therapy') {
          // then filter by those with side effects
          var filteredRows = []
          for (let i=0; i<rows.length; i++) {
            // for each patient, loop each therapy session
            var hasSideEffect = false
            for (let j=0; j<rows[i].therapy_sessions.length; j++) {
              // for each therapy session
              if (rows[i].therapy_sessions[j].pt2_fatigue == '1') {
                hasSideEffect = true
              }
              if (rows[i].therapy_sessions[j].pt2_nausea == '1'){
                hasSideEffect = true
              }
              if (rows[i].therapy_sessions[j].pt2_dry_lips == '1') {
                hasSideEffect = true
              }
              if (rows[i].therapy_sessions[j].pt2_headache == '1') {
                hasSideEffect = true
              }
              if (rows[i].therapy_sessions[j].pt2_bone_pain == '1') {
                hasSideEffect = true
              }
              if (rows[i].therapy_sessions[j].pt2_others == '1') {
                hasSideEffect = true 
              }
            }
            // if any side effect is present, then add this patient to filtered
            if (hasSideEffect) {
              filteredRows.push(rows[i])
            }
          }
          rows = filteredRows // update rows to those with patients with side effects only
        }
      }
      // end check for more filters

      // part 3
      for (let i=0; i<rows.length; i++) {
        const part3_rows = await database.all(db, `
          SELECT * FROM part3 WHERE pt1_patient_code = ?
        `, [rows[i].pt1_patient_code], false)
        rows[i].post_therapy_sessions = part3_rows
      }
      // end part 3

      // post therapy filters
      if (req.body.filter == 'true') {
        if (req.body.l1dropdown == 'lesions during post therapy') {
          // for each therapy # checked in post_therapy_config, check if patient's post therapy # matches parts checked in l2_lesion_post_therapy
          var post_therapy_filtered = [] // will store winners from below
          for (let i=0; i<rows.length; i++) {
          // for each patient
            // if config # > patient pt length, will yield undefined
            // console.log(`undefined check: comparing ${req.body.filter_config.post_therapy_config+1} with ${rows[i].post_therapy_sessions.length}`) // temp
            if (req.body.filter_config.post_therapy_config+1 > rows[i].post_therapy_sessions.length) {
              // will yield undefined so dont check
            } else {
              // this patient has that # of pt
              // access that pt and compare lesions
              var configParsed_prostate
              if (!req.body.filter_config.l2_lesion_post_therapy.prostate) {
                configParsed_prostate = null
              } else {
                configParsed_prostate = '1'
              }
              // console.log(`rows[i].pt1_patient_code is ${rows[i].pt1_patient_code} and index is ${req.body.filter_config.post_therapy_config}`) // temp
              if ( configParsed_prostate == rows[i].post_therapy_sessions[req.body.filter_config.post_therapy_config]?.pt3_prostate ) {             
                // console.log('someone passed battle 1 prostate') // temp
                var configParsed_lymph_nodes
                if (!req.body.filter_config.l2_lesion_post_therapy.lymph_nodes) {
                  configParsed_lymph_nodes = null
                } else {
                  configParsed_lymph_nodes = '1'
                }
                // console.log(`comparing ${configParsed_lymph_nodes} with ${rows[i].post_therapy_sessions[req.body.filter_config.post_therapy_config].pt3_lymph_nodes}`)
                if ( configParsed_lymph_nodes == rows[i].post_therapy_sessions[req.body.filter_config.post_therapy_config].pt3_lymph_nodes ) {
                  var configParsed_bones
                  if (!req.body.filter_config.l2_lesion_post_therapy.bone) {
                    configParsed_bones = null
                  } else {
                    configParsed_bones = '1'
                  }
                  // console.log('someone passed battle 2 lymph nodes') // temp
                  if ( configParsed_bones == rows[i].post_therapy_sessions[req.body.filter_config.post_therapy_config].pt3_bones ) {
                    // console.log('someone passed battle 3 bone') // temp
                    var configParsed_lungs
                    if (!req.body.filter_config.l2_lesion_post_therapy.lungs) {
                      configParsed_lungs = null
                    } else {
                      configParsed_lungs = '1'
                    }
                    if ( configParsed_lungs == rows[i].post_therapy_sessions[req.body.filter_config.post_therapy_config].pt3_lungs) {
                      // console.log('someone passed battle 4 lungs') // temp
                      var configParsed_liver
                      if (!req.body.filter_config.l2_lesion_post_therapy.liver) {
                        configParsed_liver = null
                      } else {
                        configParsed_liver = '1'
                      }
                      if ( configParsed_liver == rows[i].post_therapy_sessions[req.body.filter_config.post_therapy_config].pt3_liver ) {
                        // console.log('someone passed final battle liver') // temp
                        // winners
                        post_therapy_filtered.push(rows[i])
                      }
                    }
                  }
                }
              }
            }
          }
          rows = post_therapy_filtered
        }
      }
      // end post therapy filters

      // part 4
      for (let i=0; i<rows.length; i++) {
        const part4_rows = await database.all(db, `
          SELECT * FROM part4 WHERE pt1_patient_code = ?
        `, [rows[i].pt1_patient_code], false)
        rows[i].part4 = part4_rows
      }
      // end part 4

      // do follow up filters
      if (req.body.filter == 'true') {
        if (req.body.l1dropdown == 'lesions during follow up') {

          var filtered_psma_dropdown = []
          for (let i=0; i<rows.length; i++) {
            // if config # > patient follow up length, will yield undefined
            // console.log(`comparing length ${req.body.filter_config.follow_up_config+1} and ${rows[i].part4.length}`) // temp
            if (req.body.filter_config.follow_up_config+1 > rows[i].part4.length) {
              // will yield undefined so dont check
            } else {
              // console.log(`comparing ${req.body.filter_config.l3_follow_up_lesion.psma_dropdown} and ${rows[i].part4[req.body.filter_config.follow_up_config].pt4_psma_picked}`) // temp
              if (req.body.filter_config.l3_follow_up_lesion.psma_dropdown == rows[i].part4[req.body.filter_config.follow_up_config].pt4_psma_picked) {
                filtered_psma_dropdown.push(rows[i])
              }
            }
          }
          rows = filtered_psma_dropdown

          // console.log(`rows after filtering psma dropdown has length ${rows.length}`) // temp

          // console.log('doing psma follow up filters') // temp
          var follow_up_filtered_psma = [] // will store winners from below
          for (let i=0; i<rows.length; i++) {
          // for each patient
            // if config # > patient follow up length, will yield undefined
            if (req.body.filter_config.follow_up_config+1 > rows[i].part4.length) {
              // will yield undefined so dont check
            } else {
              // this patient has that # of follow up
              // access that follow up and compare lesions
              var configParsed_prostate
              if (!req.body.filter_config.l3_follow_up_lesion.psma_checkboxes.prostate) {
                configParsed_prostate = 'psma_absent_prostate'
              } else {
                configParsed_prostate = 'psma_present_prostate'
              }
              // console.log(`rows[i].pt1_patient_code is ${rows[i].pt1_patient_code} and index is ${req.body.filter_config.post_therapy_config}`) // temp
              if ( configParsed_prostate == rows[i].part4[req.body.filter_config.follow_up_config].pt4_psma_prostate ) {             
                // console.log('someone passed battle 1 prostate') // temp
                var configParsed_lymph_nodes
                if (!req.body.filter_config.l3_follow_up_lesion.psma_checkboxes.lymph_nodes) {
                  configParsed_lymph_nodes = 'psma_absent_node'
                } else {
                  configParsed_lymph_nodes = 'psma_present_node'
                }
                // console.log(`comparing ${configParsed_lymph_nodes} with ${rows[i].post_therapy_sessions[req.body.filter_config.post_therapy_config].pt3_lymph_nodes}`)
                if ( configParsed_lymph_nodes == rows[i].part4[req.body.filter_config.follow_up_config].pt4_psma_lymphs ) {
                  var configParsed_bones
                  if (!req.body.filter_config.l3_follow_up_lesion.psma_checkboxes.bone) {
                    configParsed_bones = 'psma_absent_bone'
                  } else {
                    configParsed_bones = 'psma_present_bone'
                  }
                  // console.log('someone passed battle 2 lymph nodes') // temp
                  if ( configParsed_bones == rows[i].part4[req.body.filter_config.follow_up_config].pt4_psma_bone ) {
                    // console.log('someone passed battle 3 bone') // temp
                    var configParsed_brain
                    if (!req.body.filter_config.l3_follow_up_lesion.psma_checkboxes.brain) {
                      configParsed_brain = 'psma_absent_brain'
                    } else {
                      configParsed_brain = 'psma_present_brain'
                    }
                    if ( configParsed_brain == rows[i].part4[req.body.filter_config.follow_up_config].pt4_psma_brain ) {
                      // console.log('someone passed battle 3 brain') // temp
                      var configParsed_lungs
                      if (!req.body.filter_config.l3_follow_up_lesion.psma_checkboxes.lungs) {
                        configParsed_lungs = 'psma_absent_lungs'
                      } else {
                        configParsed_lungs = 'psma_present_lungs'
                      }
                      if ( configParsed_lungs == rows[i].part4[req.body.filter_config.follow_up_config].pt4_psma_lungs) {
                        // console.log('someone passed battle 4 lungs') // temp
                        var configParsed_liver
                        if (!req.body.filter_config.l3_follow_up_lesion.psma_checkboxes.liver) {
                          configParsed_liver = 'psma_absent_liver'
                        } else {
                          configParsed_liver = 'psma_present_liver'
                        }
                        if ( configParsed_liver == rows[i].part4[req.body.filter_config.follow_up_config].pt4_psma_liver ) {
                          // console.log('someone passed final battle liver') // temp
                          // winners
                          follow_up_filtered_psma.push(rows[i])
                        }
                      }
                    }  
                  }
                }
              }
            }
          }
          rows = follow_up_filtered_psma

          // console.log(`rows length here is ${rows.length}`) // temp

          // repeat for fdg
          var follow_up_filtered_fdg = [] // will store winners from below
          for (let i=0; i<rows.length; i++) {
          // for each patient
            // if config # > patient follow up length, will yield undefined
            if (req.body.filter_config.follow_up_config+1 > rows[i].part4.length) {
              // will yield undefined so dont check
            } else {
              // this patient has that # of follow up
              // access that follow up and compare lesions
              var configParsed_prostate
              if (!req.body.filter_config.l3_follow_up_lesion.fdg_checkboxes.prostate) {
                configParsed_prostate = 'fdg_absent_prostate'
              } else {
                configParsed_prostate = 'fdg_present_prostate'
              }
              // console.log(`rows[i].pt1_patient_code is ${rows[i].pt1_patient_code} and index is ${req.body.filter_config.post_therapy_config}`) // temp
              if ( configParsed_prostate == rows[i].part4[req.body.filter_config.follow_up_config].pt4_fdg_prostate ) {             
                // console.log('someone passed battle 1 prostate') // temp
                var configParsed_lymph_nodes
                if (!req.body.filter_config.l3_follow_up_lesion.fdg_checkboxes.lymph_nodes) {
                  configParsed_lymph_nodes = 'fdg_absent_node'
                } else {
                  configParsed_lymph_nodes = 'fdg_present_node'
                }
                // console.log(`comparing ${configParsed_lymph_nodes} with ${rows[i].post_therapy_sessions[req.body.filter_config.post_therapy_config].pt3_lymph_nodes}`)
                if ( configParsed_lymph_nodes == rows[i].part4[req.body.filter_config.follow_up_config].pt4_fdg_lymphs ) {
                  var configParsed_bones
                  if (!req.body.filter_config.l3_follow_up_lesion.fdg_checkboxes.bone) {
                    configParsed_bones = 'fdg_absent_bone'
                  } else {
                    configParsed_bones = 'fdg_present_bone'
                  }
                  // console.log('someone passed battle 2 lymph nodes') // temp
                  if ( configParsed_bones == rows[i].part4[req.body.filter_config.follow_up_config].pt4_fdg_bone ) {
                    // console.log('someone passed battle 3 bone') // temp
                    var configParsed_brain
                    if (!req.body.filter_config.l3_follow_up_lesion.fdg_checkboxes.brain) {
                      configParsed_brain = 'fdg_absent_brain'
                    } else {
                      configParsed_brain = 'fdg_present_brain'
                    }
                    if ( configParsed_brain == rows[i].part4[req.body.filter_config.follow_up_config].pt4_fdg_brain ) {
                      // console.log('someone passed battle 3 brain') // temp
                      var configParsed_lungs
                      if (!req.body.filter_config.l3_follow_up_lesion.fdg_checkboxes.lungs) {
                        configParsed_lungs = 'fdg_absent_lungs'
                      } else {
                        configParsed_lungs = 'fdg_present_lungs'
                      }  
                      if ( configParsed_lungs == rows[i].part4[req.body.filter_config.follow_up_config].pt4_fdg_lungs) {
                        // console.log('someone passed battle 4 lungs') // temp
                        var configParsed_liver
                        if (!req.body.filter_config.l3_follow_up_lesion.fdg_checkboxes.liver) {
                          configParsed_liver = 'fdg_absent_liver'
                        } else {
                          configParsed_liver = 'fdg_present_liver'
                        }
                        if ( configParsed_liver == rows[i].part4[req.body.filter_config.follow_up_config].pt4_fdg_liver ) {
                          // console.log('someone passed final battle liver') // temp
                          // winners
                          follow_up_filtered_fdg.push(rows[i])
                        }
                      }
                    }
                  }
                }
              }
            }
          }

          rows = follow_up_filtered_fdg         
          // end repeat for fdg
        }
      }
      // end do follow up filters

      res.json({rows: rows}).send()
    } catch (error) {
      console.log('Error on api > patient > read')
      console.log(error)
      res.status(401).json({message: error}).send()
    }
  })
  // end read

  // add follow up
  router.post('/api/patient/followup/new', async (req, res) => {
    try {
      const source = './database/db.sqlite'
      const db = await database.openOrCreateDB(source)
      await database.run(db, `
        INSERT OR REPLACE INTO part4 (
          record_id,
          pt1_patient_code,
          pt4_date,
          pt4_psa,
          pt4_creatinine,
          pt4_wbc,
          pt4_rbc,
          pt4_hemoglobin,
          pt4_hematocrit,
          pt4_platelet,
          pt4_lactate,
          pt4_alkaline,
          pt4_ssb,
          pt4_salivary,
          pt4_renal,
          pt4_bone_scan,
          pt4_bone_withmetas,
          pt4_psma_picked,
          pt4_psma_prostate,
          pt4_psma_prostate_loc,
          pt4_psma_prostate_suv,
          pt4_psma_prostate_meas,
          pt4_psma_lymphs,
          pt4_psma_lymphs_loc,
          pt4_psma_lymphs_suv,
          pt4_psma_lymphs_meas,
          pt4_psma_bone,
          pt4_psma_bone_loc,
          pt4_psma_bone_suv,
          pt4_psma_bone_meas,
          pt4_psma_brain,
          pt4_psma_brain_loc,
          pt4_psma_brain_suv,
          pt4_psma_brain_meas,
          pt4_psma_lungs,
          pt4_psma_lungs_loc,
          pt4_psma_lungs_suv,
          pt4_psma_lungs_meas,
          pt4_psma_liver,
          pt4_psma_liver_loc,
          pt4_psma_liver_suv,
          pt4_psma_liver_meas,
          pt4_psma_others,
          pt4_psma_others_loc,
          pt4_psma_others_suv,
          pt4_psma_others_meas,
          pt4_fdg_prostate,
          pt4_fdg_prostate_loc,
          pt4_fdg_prostate_suv,
          pt4_fdg_prostate_meas,
          pt4_fdg_lymphs,
          pt4_fdg_lymphs_loc,
          pt4_fdg_lymphs_suv,
          pt4_fdg_lymphs_meas,
          pt4_fdg_bone,
          pt4_fdg_bone_loc,
          pt4_fdg_bone_suv,
          pt4_fdg_bone_meas,
          pt4_fdg_brain,
          pt4_fdg_brain_loc,
          pt4_fdg_brain_suv,
          pt4_fdg_brain_meas,
          pt4_fdg_lungs,
          pt4_fdg_lungs_loc,
          pt4_fdg_lungs_suv,
          pt4_fdg_lungs_meas,
          pt4_fdg_liver,
          pt4_fdg_liver_loc,
          pt4_fdg_liver_suv,
          pt4_fdg_liver_meas,
          pt4_fdg_others,
          pt4_fdg_others_loc,
          pt4_fdg_others_suv,
          pt4_fdg_others_measure,
          pt4_assessment,
          pt4_plan
        ) VALUES (
          ?,?,?,?,?,?,?,?,?,?,
          ?,?,?,?,?,?,?,?,?,?,
          ?,?,?,?,?,?,?,?,?,?,
          ?,?,?,?,?,?,?,?,?,?,
          ?,?,?,?,?,?,?,?,?,?,
          ?,?,?,?,?,?,?,?,?,?,
          ?,?,?,?,?,?,?,?,?,?,
          ?,?,?,?,?,?
        )
      `, [
        uuidv4(),
        req.body.pt1_patient_code,
        req.body.pt4_date,
        req.body.pt4_psa,
        req.body.pt4_creatinine,
        req.body.pt4_wbc,
        req.body.pt4_rbc,
        req.body.pt4_hemoglobin,
        req.body.pt4_hematocrit,
        req.body.pt4_platelet,
        req.body.pt4_lactate,
        req.body.pt4_alkaline,
        req.body.pt4_ssb,
        req.body.pt4_salivary,
        req.body.pt4_renal,
        req.body.pt4_bone_scan,
        req.body.pt4_bone_withmetas,
        req.body.pt4_psma_picked,
        req.body.pt4_psma_prostate,
        req.body.pt4_psma_prostate_loc,
        req.body.pt4_psma_prostate_suv,
        req.body.pt4_psma_prostate_meas,
        req.body.pt4_psma_lymphs,
        req.body.pt4_psma_lymphs_loc,
        req.body.pt4_psma_lymphs_suv,
        req.body.pt4_psma_lymphs_meas,
        req.body.pt4_psma_bone,
        req.body.pt4_psma_bone_loc,
        req.body.pt4_psma_bone_suv,
        req.body.pt4_psma_bone_meas,
        req.body.pt4_psma_brain,
        req.body.pt4_psma_brain_loc,
        req.body.pt4_psma_brain_suv,
        req.body.pt4_psma_brain_meas,
        req.body.pt4_psma_lungs,
        req.body.pt4_psma_lungs_loc,
        req.body.pt4_psma_lungs_suv,
        req.body.pt4_psma_lungs_meas,
        req.body.pt4_psma_liver,
        req.body.pt4_psma_liver_loc,
        req.body.pt4_psma_liver_suv,
        req.body.pt4_psma_liver_meas,
        req.body.pt4_psma_others,
        req.body.pt4_psma_others_loc,
        req.body.pt4_psma_others_suv,
        req.body.pt4_psma_others_meas,
        req.body.pt4_fdg_prostate,
        req.body.pt4_fdg_prostate_loc,
        req.body.pt4_fdg_prostate_suv,
        req.body.pt4_fdg_prostate_meas,
        req.body.pt4_fdg_lymphs,
        req.body.pt4_fdg_lymphs_loc,
        req.body.pt4_fdg_lymphs_suv,
        req.body.pt4_fdg_lymphs_meas,
        req.body.pt4_fdg_bone,
        req.body.pt4_fdg_bone_loc,
        req.body.pt4_fdg_bone_suv,
        req.body.pt4_fdg_bone_meas,
        req.body.pt4_fdg_brain,
        req.body.pt4_fdg_brain_loc,
        req.body.pt4_fdg_brain_suv,
        req.body.pt4_fdg_brain_meas,
        req.body.pt4_fdg_lungs,
        req.body.pt4_fdg_lungs_loc,
        req.body.pt4_fdg_lungs_suv,
        req.body.pt4_fdg_lungs_meas,
        req.body.pt4_fdg_liver,
        req.body.pt4_fdg_liver_loc,
        req.body.pt4_fdg_liver_suv,
        req.body.pt4_fdg_liver_meas,
        req.body.pt4_fdg_others,
        req.body.pt4_fdg_others_loc,
        req.body.pt4_fdg_others_suv,
        req.body.pt4_fdg_others_measure,
        req.body.pt4_assessment,
        req.body.pt4_plan
      ], false)
      res.json({message: 'Added follow up record successfully'}).send()
    } catch (error) {
      console.log('Error on api > patient > followup > new', error)
      res.status(401).json({message: error}).send()
    }
  })
  // end add follow up

  // read follow up records
  router.post('/api/followup/read', async (req, res) => {
    try {
      const source = './database/db.sqlite'
      const db = await database.openOrCreateDB(source)
      const rows =  await database.all(db, `
        SELECT * FROM part4 WHERE pt1_patient_code = ?
      `, [
        req.body.pt1_patient_code
      ], false)
      res.json({rows: rows}).send()
    } catch (error) {
      console.log('Error on api > followup > read', error)
      res.status(401).json({message: error}).send()
    }
  })
  // end read follow up records

  // update
  // router.post('/api/patient_consultation/update', loggedInOnly, async(req, res) => {
  //   try {
  //     const source = './database/db.sqlite'
  //     const db = await database.openOrCreateDB(source)
  //     await database.run(db, `
  //       UPDATE patient_consultation SET consultation = ? WHERE patient_id = ?
  //     `, [req.body.consultation, req.body.patient_id], false)
  //     res.json({message: 'Update Success'}).send()
  //   } catch (error) {
  //     console.log('Error on api > patient_consultation > update')
  //     console.log(error)
  //     res.status(401).json({message: error}).send()
  //   }
  // })
  // end update

// end Routes

// Middleware
function loggedInOnly(req, res, next) {
  try {
    if (!req.user) {
      throw 'User not logged in'
    } else {
      next()
    }
  } catch (error) {
    console.log('Error on patient_records.js > loggedInOnly')
    console.log(error)
    res.status(401).send()
  }
}
// end Middleware

module.exports = {router}