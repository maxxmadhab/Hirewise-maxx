import express from 'express';
import db from '../config/db.js';

const router = express.Router();


router.post('/', async (req, res) => {
    console.log('✅ Received form data:', req.body);
  const {
    position, department, branch,
    full_name, email, phone, address,
    highest_degree, university, graduation_year,
    previous_positions, years_of_experience,
    publications, research_interests
  } = req.body;

  try {
    const { rows } = await db.query(
      `INSERT INTO faculty_applications (
        position, department, branch,
        full_name, email, phone, address,
        highest_degree, university, graduation_year,
        previous_positions, years_of_experience,
        publications, research_interests
      ) VALUES ($1, $2, $3, $4, $5, $6, $7,
                $8, $9, $10, $11, $12, $13, $14)
        RETURNING *`,
      [
        position, department, branch,
        full_name, email, phone, address,
        highest_degree, university, graduation_year,
        previous_positions, years_of_experience,
        publications, research_interests
      ]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error submitting application:', err);
    res.status(500).json({ error: 'Failed to submit application' });
  }
});


export default router;
