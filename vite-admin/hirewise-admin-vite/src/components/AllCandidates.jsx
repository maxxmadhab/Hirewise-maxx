import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase-client';

const AllCandidates = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const departments = ['All', 'law', 'liberal', 'engineering', 'management'];

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        
        let { data: applicationsData, error: applicationsError } = await supabase
          .from('faculty_applications')
          .select('*');

        if (applicationsError) throw applicationsError;

        const candidatesWithDetails = await Promise.all(
          applicationsData.map(async (application) => {
            const { data: teachingData } = await supabase
              .from('teaching_experiences')
              .select('*')
              .eq('application_id', application.id);

            const { data: researchData } = await supabase
              .from('research_experiences')
              .select('*')
              .eq('application_id', application.id);

            const { data: researchInfoData } = await supabase
              .from('research_info')
              .select(`
                scopus_id,
                google_scholar_id,
                orchid_id,
                scopus_general_papers,
                conference_papers,
                edited_books
              `)
              .eq('application_id', application.id)
              .single();

            return {
              ...application,
              teachingExperiences: teachingData || [],
              researchExperiences: researchData || [],
              researchInfo: researchInfoData || {
                scopus_general_papers: 0,
                conference_papers: 0,
                edited_books: 0
              },
              department: application.department || 'other',
              experience: application.years_of_experience || 'Not specified',
              publications: researchInfoData?.scopus_general_papers || 0
            };
          })
        );

        setCandidates(candidatesWithDetails);
      } catch (err) {
        console.error('Error fetching candidates:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleViewDetails = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const closeModal = () => {
    setSelectedCandidate(null);
  };

  const filteredCandidates = selectedDepartment === 'All' 
    ? candidates 
    : candidates.filter(candidate => candidate.department === selectedDepartment);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading candidates...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>Error loading candidates: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
       <div className="h-full overflow-y-auto">
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">All Candidates</h2>
            <div className="flex space-x-2">
              {departments.map(dept => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedDepartment === dept
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {dept.charAt(0).toUpperCase() + dept.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map((candidate, index) => (
              <div key={candidate.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-lg font-semibold text-blue-600">#{index + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {candidate.first_name} {candidate.last_name}
                        </h3>
                        <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                          {candidate.department}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{candidate.position}</p>
                      <p className="text-sm text-gray-500">{candidate.email}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-600">{candidate.experience}</span>
                        <span className="text-sm text-gray-600">{candidate.publications} publications</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => handleViewDetails(candidate)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No candidates found for the selected department.
            </div>
          )}
        </div>
      </div>

      {selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedCandidate.first_name} {selectedCandidate.last_name}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="mt-1 flex items-center space-x-2">
                <p className="text-lg text-gray-600">{selectedCandidate.position}</p>
                <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  {selectedCandidate.department}
                </span>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-1">Email</h3>
                  <p className="text-gray-600">{selectedCandidate.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-1">Phone</h3>
                  <p className="text-gray-600">{selectedCandidate.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-1">Experience</h3>
                  <p className="text-gray-600">{selectedCandidate.experience}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-1">Address</h3>
                  <p className="text-gray-600">{selectedCandidate.address || 'Not provided'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-1">Department</h3>
                  <p className="text-gray-600">{selectedCandidate.department}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-1">Publications</h3>
                  <p className="text-gray-600">{selectedCandidate.publications}</p>
                </div>
                {selectedCandidate.gender && (
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 mb-1">Gender</h3>
                    <p className="text-gray-600">{selectedCandidate.gender}</p>
                  </div>
                )}
                {selectedCandidate.date_of_birth && (
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 mb-1">Date of Birth</h3>
                    <p className="text-gray-600">{selectedCandidate.date_of_birth}</p>
                  </div>
                )}
                {selectedCandidate.nationality && (
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 mb-1">Nationality</h3>
                    <p className="text-gray-600">{selectedCandidate.nationality}</p>
                  </div>
                )}
              </div>

              {(selectedCandidate.highest_degree || selectedCandidate.university) && (
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-1">Education</h3>
                  <p className="text-gray-600">
                    {selectedCandidate.highest_degree} 
                    {selectedCandidate.university && `, ${selectedCandidate.university}`}
                    {selectedCandidate.graduation_year && ` (${selectedCandidate.graduation_year})`}
                  </p>
                </div>
              )}

              {selectedCandidate.previous_positions && (
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-1">Previous Positions</h3>
                  <p className="text-gray-600">{selectedCandidate.previous_positions}</p>
                </div>
              )}

              <div>
                <h3 className="text-sm font-bold text-gray-800 mb-1">Teaching Experience</h3>
                {selectedCandidate.teachingExperiences.length > 0 ? (
                  selectedCandidate.teachingExperiences.map((exp, index) => (
                    <div key={index} className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium">
                        {exp.position || exp.teachingPost} at {exp.institution || exp.teachingInstitution}
                      </p>
                      <p className="text-sm text-gray-600">
                        {exp.start_date || exp.teachingStartDate} to {exp.end_date || exp.teachingEndDate}
                      </p>
                      {(exp.description || exp.teachingExperience) && (
                        <p className="text-sm text-gray-600 mt-1">
                          {exp.description || exp.teachingExperience}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No teaching experience provided</p>
                )}
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-800 mb-1">Research Experience</h3>
                {selectedCandidate.researchExperiences.length > 0 ? (
                  selectedCandidate.researchExperiences.map((exp, index) => (
                    <div key={index} className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium">
                        {exp.position || exp.researchPost} at {exp.institution || exp.researchInstitution}
                      </p>
                      <p className="text-sm text-gray-600">
                        {exp.start_date || exp.researchStartDate} to {exp.end_date || exp.researchEndDate}
                      </p>
                      {(exp.description || exp.researchExperience) && (
                        <p className="text-sm text-gray-600 mt-1">
                          {exp.description || exp.researchExperience}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No research experience provided</p>
                )}
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-800 mb-1">Research Information</h3>
                <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-600">Scopus Papers</h4>
                    <p>{selectedCandidate.researchInfo?.scopus_general_papers ?? 0}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-600">Conference Papers</h4>
                    <p>{selectedCandidate.researchInfo?.conference_papers ?? 0}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-600">Edited Books</h4>
                    <p>{selectedCandidate.researchInfo?.edited_books ?? 0}</p>
                  </div>
                  {selectedCandidate.researchInfo?.scopus_id && (
                    <div>
                      <h4 className="text-xs font-semibold text-gray-600">Scopus ID</h4>
                      <p>{selectedCandidate.researchInfo.scopus_id}</p>
                    </div>
                  )}
                  {selectedCandidate.researchInfo?.google_scholar_id && (
                    <div>
                      <h4 className="text-xs font-semibold text-gray-600">Google Scholar ID</h4>
                      <p>{selectedCandidate.researchInfo.google_scholar_id}</p>
                    </div>
                  )}
                  {selectedCandidate.researchInfo?.orchid_id && (
                    <div>
                      <h4 className="text-xs font-semibold text-gray-600">ORCID ID</h4>
                      <p>{selectedCandidate.researchInfo.orchid_id}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {selectedCandidate.resume_path && (
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 mb-1">Resume</h3>
                    <a 
                      href={`${supabase.storage.from('resumes').getPublicUrl(selectedCandidate.resume_path).data.publicUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Download Resume
                    </a>
                  </div>
                )}
                {selectedCandidate.cover_letter_path && (
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 mb-1">Cover Letter</h3>
                    <a 
                      href={`${supabase.storage.from('cover-letters').getPublicUrl(selectedCandidate.cover_letter_path).data.publicUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Download Cover Letter
                    </a>
                  </div>
                )}
              </div>

              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                  Accept
                </button>
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
                  Reject
                </button>
                
                <button onClick={closeModal} className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllCandidates;