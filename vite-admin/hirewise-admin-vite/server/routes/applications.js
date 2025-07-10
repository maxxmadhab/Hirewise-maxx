import express from 'express';
import db from '../config/db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  console.log('✅ Received form data:', req.body);

  const {
    position,
    department,
    branch,
    first_name,
    last_name,
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
    gender,
    date_of_birth,
    nationality,
    teachingExperiences,
    researchExperiences,
    researchInfo
  } = req.body;

  // Validate required fields
  if (!first_name || !last_name || !email || !phone || !gender || !date_of_birth || !nationality) {
    return res.status(400).json({ error: 'Missing required personal information fields' });
  }

  try {
    // Step 1: Insert into faculty_applications
    const { rows } = await db.query(
      `INSERT INTO faculty_applications (
        position, department, branch,
        first_name, last_name, email, phone, address,
        highest_degree, university, graduation_year,
        previous_positions, years_of_experience,
        publications, resume_path, cover_letter_path,
        gender, date_of_birth, nationality
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8,
        $9, $10, $11, $12, $13, $14,
        $15, $16, $17, $18, $19
      ) RETURNING *`,
      [
        position,
        department,
        branch,
        first_name,
        last_name,
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
        gender,
        date_of_birth,
        nationality
      ]
    );

    const application = rows[0];
    const applicationId = application.id;

    console.log('✅ Inserted application with ID:', applicationId);

    // Step 2: Insert teaching experiences
    if (Array.isArray(teachingExperiences) && teachingExperiences.length > 0) {
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
      console.log('✅ Teaching experiences saved.');
    }

    // Step 3: Insert research experiences
    if (Array.isArray(researchExperiences) && researchExperiences.length > 0) {
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
      console.log('✅ Research experiences saved.');
    }

    // Step 4: Insert research_info
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
      console.log('✅ Research info saved.');
    }

    res.status(201).json({ message: '✅ Application submitted successfully!', application });
  } catch (err) {
    console.error('❌ Database error:', err);
    res.status(500).json({ error: err.message || 'Failed to submit application' });
  }
});

export default router;
