import express from 'express';
import supabase from '../config/db.js'; // Now using Supabase SDK

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

  if (!first_name || !last_name || !email || !phone || !gender || !date_of_birth || !nationality) {
    return res.status(400).json({ error: 'Missing required personal information fields' });
  }

  try {
    // Step 1: Insert into faculty_applications
    const { data: applicationData, error: appError } = await supabase
      .from('faculty_applications')
      .insert([
        {
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
        }
      ])
      .select()
      .single();

    if (appError) throw appError;

    const applicationId = applicationData.id;
    console.log('✅ Inserted application with ID:', applicationId);

    // Step 2: Insert teaching experiences
    if (Array.isArray(teachingExperiences) && teachingExperiences.length > 0) {
      const teachingData = teachingExperiences.map(t => ({
        application_id: applicationId,
        post: t.teachingPost,
        institution: t.teachingInstitution,
        start_date: t.teachingStartDate,
        end_date: t.teachingEndDate,
        experience: t.teachingExperience
      }));

      const { error: teachingError } = await supabase
        .from('teaching_experiences')
        .insert(teachingData);

      if (teachingError) throw teachingError;

      console.log('✅ Teaching experiences saved.');
    }

    // Step 3: Insert research experiences
    if (Array.isArray(researchExperiences) && researchExperiences.length > 0) {
      const researchData = researchExperiences.map(r => ({
        application_id: applicationId,
        post: r.researchPost,
        institution: r.researchInstitution,
        start_date: r.researchStartDate,
        end_date: r.researchEndDate,
        experience: r.researchExperience
      }));

      const { error: researchError } = await supabase
        .from('research_experiences')
        .insert(researchData);

      if (researchError) throw researchError;

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

      const { error: infoError } = await supabase
        .from('research_info')
        .insert([
          {
            application_id: applicationId,
            scopus_id,
            orchid_id,
            google_scholar_id,
            scopus_general_papers,
            conference_papers,
            edited_books
          }
        ]);

      if (infoError) throw infoError;

      console.log('✅ Research info saved.');
    }

    res.status(201).json({ message: '✅ Application submitted successfully!', application: applicationData });
  } catch (err) {
    console.error('❌ Supabase error:', err.message || err);
    res.status(500).json({ error: err.message || 'Failed to submit application' });
  }
});

export default router;
