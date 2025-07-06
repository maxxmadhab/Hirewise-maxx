import express from 'express';
import db from '../config/db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  console.log('✅ Received form data:', req.body);

  const {
    position,
    department,
    branch,
    full_name,
    email,
    phone,
    address,
    highest_degree,
    university,
    graduation_year,
    previous_positions,
    years_of_experience,
    publications,
    resume_path,
    cover_letter_path,
    teachingExperiences,
    researchExperiences,
    researchInfo
  } = req.body;

  try {
    // Step 1: Insert into faculty_applications
    const { rows } = await db.query(
      `INSERT INTO faculty_applications (
        position, department, branch,
        full_name, email, phone, address,
        highest_degree, university, graduation_year,
        previous_positions, years_of_experience,
        publications, resume_path, cover_letter_path
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, $12, $13,
        $14, $15
      ) RETURNING *`,
      [
        position,
        department,
        branch,
        full_name,
        email,
        phone,
        address,
        highest_degree,
        university,
        graduation_year,
        previous_positions,
        years_of_experience,
        publications,
        resume_path,
        cover_letter_path
      ]
    );

    const application = rows[0];
    const applicationId = application.id;

    // ✅ Step 2: Insert teaching experiences (renamed keys)
    if (Array.isArray(teachingExperiences)) {
      for (const t of teachingExperiences) {
        await db.query(
          `INSERT INTO teaching_experiences (
            application_id, post, institution, start_date, end_date, experience
          ) VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            applicationId,
            t.teachingPost,
            t.teachingInstitution,
            t.teachingStartDate,
            t.teachingEndDate,
            t.teachingExperience
          ]
        );
      }
    }

    // ✅ Step 3: Insert research experiences (renamed keys)
    if (Array.isArray(researchExperiences)) {
      for (const r of researchExperiences) {
        await db.query(
          `INSERT INTO research_experiences (
            application_id, post, institution, start_date, end_date, experience
          ) VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            applicationId,
            r.researchPost,
            r.researchInstitution,
            r.researchStartDate,
            r.researchEndDate,
            r.researchExperience
          ]
        );
      }
    }

    // ✅ Step 4: Insert research_info
    if (researchInfo) {
      const {
        scopus_id,
        orchid_id,
        google_scholar_id,
        scopus_general_papers,
        conference_papers,
        edited_books
      } = researchInfo;

      await db.query(
        `INSERT INTO research_info (
          application_id, scopus_id, orchid_id,
          google_scholar_id, scopus_general_papers,
          conference_papers, edited_books
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          applicationId,
          scopus_id,
          orchid_id,
          google_scholar_id,
          scopus_general_papers,
          conference_papers,
          edited_books
        ]
      );
    }

    res.status(201).json({ message: '✅ Application and all related data submitted!', application });
  } catch (err) {
    console.error('❌ Error submitting application:', err);
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

export default router;
