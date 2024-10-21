// Imports
import express from 'express';
import db from './db/conn.mjs';
import gradesCTL from '../controllers/grades.Controller.mjs'
const router = express.Router();
// Routes go here
router.route('/:id').get(gradesCTL.getSingleGrade);

// router.get('student/:id', gradesCTL.getStudentGrades)
// router.get('class')
//get grades by student id

async function getStudentGrades(req, res) {
    
}
export default router;
