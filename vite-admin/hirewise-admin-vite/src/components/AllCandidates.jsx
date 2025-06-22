import React, { useState } from 'react';

const AllCandidates = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState('All');

  // Mock data for professor candidates with school information
 const topCandidates = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar Sharma",
    email: "rajesh.sharma@gmail.com",
    position: "Professor of Computer Science",
    experience: "12 years",
    skills: ["Machine Learning", "Data Structures", "Algorithms", "Python"],
    phone: "+91 98765 43210",
    location: "Delhi, India",
    education: "PhD Computer Science, IIT Delhi",
    projectsCompleted: 45,
    publications: 23,
    department: "Computer Science & Engineering",
    school: "SOET"
  },
  {
    id: 2,
    name: "Dr. Priya Nair",
    email: "priya.nair@yahoo.com",
    position: "Associate Professor of Mathematics",
    experience: "8 years",
    skills: ["Linear Algebra", "Calculus", "Statistics", "Research Methodology"],
    phone: "+91 87654 32109",
    location: "Kochi, Kerala",
    education: "PhD Mathematics, IISc Bangalore",
    projectsCompleted: 32,
    publications: 18,
    department: "Mathematics",
    school: "SOM"
  },
  {
    id: 3,
    name: "Dr. Amit Patel",
    email: "amit.patel@rediffmail.com",
    position: "Professor of Mechanical Engineering",
    experience: "15 years",
    skills: ["Thermodynamics", "Fluid Mechanics", "CAD/CAM", "Manufacturing"],
    phone: "+91 76543 21098",
    location: "Ahmedabad, Gujarat",
    education: "PhD Mechanical Engineering, IIT Bombay",
    projectsCompleted: 58,
    publications: 31,
    department: "Mechanical Engineering",
    school: "SOET"
  },
  {
    id: 4,
    name: "Dr. Sunita Verma",
    email: "sunita.verma@gmail.com",
    position: "Associate Professor of Physics",
    experience: "10 years",
    skills: ["Quantum Physics", "Optics", "Nuclear Physics", "Laboratory Management"],
    phone: "+91 65432 10987",
    location: "Jaipur, Rajasthan",
    education: "PhD Physics, University of Delhi",
    projectsCompleted: 41,
    publications: 22,
    department: "Physics",
    school: "SOET"
  },
  {
    id: 5,
    name: "Dr. Vikram Singh",
    email: "vikram.singh@hotmail.com",
    position: "Professor of Electronics Engineering",
    experience: "14 years",
    skills: ["VLSI Design", "Digital Electronics", "Embedded Systems", "Signal Processing"],
    phone: "+91 54321 09876",
    location: "Pune, Maharashtra",
    education: "PhD Electronics, IIT Kanpur",
    projectsCompleted: 52,
    publications: 28,
    department: "Electronics & Communication",
    school: "SOET"
  },
  {
    id: 6,
    name: "Dr. Meera Krishnan",
    email: "meera.krishnan@gmail.com",
    position: "Assistant Professor of Chemistry",
    experience: "6 years",
    skills: ["Organic Chemistry", "Analytical Chemistry", "Spectroscopy", "Research"],
    phone: "+91 43210 98765",
    location: "Chennai, Tamil Nadu",
    education: "PhD Chemistry, IIT Madras",
    projectsCompleted: 25,
    publications: 15,
    department: "Chemistry",
    school: "SOET"
  },
  {
    id: 7,
    name: "Dr. Ravi Gupta",
    email: "ravi.gupta@yahoo.in",
    position: "Professor of Civil Engineering",
    experience: "16 years",
    skills: ["Structural Engineering", "Construction Management", "AutoCAD", "Project Planning"],
    phone: "+91 32109 87654",
    location: "Lucknow, Uttar Pradesh",
    education: "PhD Civil Engineering, IIT Roorkee",
    projectsCompleted: 63,
    publications: 35,
    department: "Civil Engineering",
    school: "SOET"
  },
  {
    id: 8,
    name: "Dr. Kavita Joshi",
    email: "kavita.joshi@rediffmail.com",
    position: "Associate Professor of Biology",
    experience: "9 years",
    skills: ["Molecular Biology", "Genetics", "Biotechnology", "Laboratory Techniques"],
    phone: "+91 21098 76543",
    location: "Indore, Madhya Pradesh",
    education: "PhD Biotechnology, JNU Delhi",
    projectsCompleted: 38,
    publications: 20,
    department: "Life Sciences",
    school: "SOLS"
  },
  {
    id: 9,
    name: "Dr. Manoj Kumar",
    email: "manoj.kumar@gmail.com",
    position: "Professor of Electrical Engineering",
    experience: "13 years",
    skills: ["Power Systems", "Control Systems", "Renewable Energy", "MATLAB"],
    phone: "+91 10987 65432",
    location: "Bhopal, Madhya Pradesh",
    education: "PhD Electrical Engineering, IIT Delhi",
    projectsCompleted: 47,
    publications: 26,
    department: "Electrical Engineering",
    school: "SOET"
  },
  {
    id: 10,
    name: "Dr. Anita Reddy",
    email: "anita.reddy@yahoo.com",
    position: "Associate Professor of Economics",
    experience: "11 years",
    skills: ["Microeconomics", "Econometrics", "Development Economics", "Statistical Analysis"],
    phone: "+91 09876 54321",
    location: "Hyderabad, Telangana",
    education: "PhD Economics, Delhi School of Economics",
    projectsCompleted: 29,
    publications: 17,
    department: "Economics",
    school: "SOM"
  },
  {
    id: 11,
    name: "Dr. Deepak Agarwal",
    email: "deepak.agarwal@hotmail.com",
    position: "Assistant Professor of Management",
    experience: "7 years",
    skills: ["Strategic Management", "Operations Management", "Marketing", "Case Study Method"],
    phone: "+91 98765 12345",
    location: "Kolkata, West Bengal",
    education: "PhD Management, IIM Calcutta",
    projectsCompleted: 21,
    publications: 12,
    department: "Management Studies",
    school: "SOM"
  },
  {
    id: 12,
    name: "Dr. Pooja Mishra",
    email: "pooja.mishra@gmail.com",
    position: "Associate Professor of English Literature",
    experience: "8 years",
    skills: ["Victorian Literature", "Postcolonial Studies", "Literary Criticism", "Creative Writing"],
    phone: "+91 87654 98765",
    location: "Varanasi, Uttar Pradesh",
    education: "PhD English Literature, BHU Varanasi",
    projectsCompleted: 16,
    publications: 14,
    department: "English",
    school: "SOL"
  },
  {
    id: 13,
    name: "Dr. Suresh Chandra",
    email: "suresh.chandra@rediffmail.com",
    position: "Professor of Metallurgical Engineering",
    experience: "18 years",
    skills: ["Materials Science", "Corrosion Engineering", "Welding Technology", "Quality Control"],
    phone: "+91 76543 87654",
    location: "Rourkela, Odisha",
    education: "PhD Metallurgy, NIT Rourkela",
    projectsCompleted: 71,
    publications: 42,
    department: "Metallurgical Engineering",
    school: "SOET"
  },
  {
    id: 14,
    name: "Dr. Neha Agrawal",
    email: "neha.agrawal@yahoo.in",
    position: "Assistant Professor of Psychology",
    experience: "5 years",
    skills: ["Clinical Psychology", "Counseling", "Research Methods", "Statistical Analysis"],
    phone: "+91 65432 76543",
    location: "Nagpur, Maharashtra",
    education: "PhD Psychology, University of Pune",
    projectsCompleted: 19,
    publications: 11,
    department: "Psychology",
    school: "SOL"
  },
  {
    id: 15,
    name: "Dr. Harish Yadav",
    email: "harish.yadav@hotmail.com",
    position: "Associate Professor of Agriculture",
    experience: "9 years",
    skills: ["Crop Science", "Soil Management", "Agricultural Technology", "Sustainable Farming"],
    phone: "+91 54321 65432",
    location: "Ludhiana, Punjab",
    education: "PhD Agriculture, Punjab Agricultural University",
    projectsCompleted: 33,
    publications: 19,
    department: "Agriculture",
    school: "SOLS"
  },
  {
    id: 16,
    name: "Dr. Shweta Pandey",
    email: "shweta.pandey@gmail.com",
    position: "Assistant Professor of Architecture",
    experience: "4 years",
    skills: ["Urban Planning", "Sustainable Design", "AutoCAD", "3D Modeling"],
    phone: "+91 43210 54321",
    location: "Chandigarh, India",
    education: "PhD Architecture, SPA Delhi",
    projectsCompleted: 12,
    publications: 8,
    department: "Architecture",
    school: "SOET"
  },
  {
    id: 17,
    name: "Dr. Rahul Tiwari",
    email: "rahul.tiwari@rediffmail.com",
    position: "Professor of Chemical Engineering",
    experience: "17 years",
    skills: ["Process Engineering", "Chemical Kinetics", "Plant Design", "Safety Management"],
    phone: "+91 32109 43210",
    location: "Kanpur, Uttar Pradesh",
    education: "PhD Chemical Engineering, IIT Kanpur",
    projectsCompleted: 61,
    publications: 37,
    department: "Chemical Engineering",
    school: "SOET"
  },
  {
    id: 18,
    name: "Dr. Ananya Das",
    email: "ananya.das@gmail.com",
    position: "Associate Professor of Law",
    experience: "10 years",
    skills: ["Constitutional Law", "Human Rights", "Legal Research", "Corporate Law"],
    phone: "+91 98765 67890",
    location: "Mumbai, Maharashtra",
    education: "PhD Law, NLU Mumbai",
    projectsCompleted: 22,
    publications: 13,
    department: "Law",
    school: "SOL"
  },
  {
    id: 19,
    name: "Dr. Arjun Mehta",
    email: "arjun.mehta@yahoo.com",
    position: "Assistant Professor of Commerce",
    experience: "5 years",
    skills: ["Accounting", "Taxation", "Financial Management", "Business Statistics"],
    phone: "+91 87654 56789",
    location: "Surat, Gujarat",
    education: "PhD Commerce, University of Mumbai",
    projectsCompleted: 18,
    publications: 9,
    department: "Commerce",
    school: "SOM"
  },
  {
    id: 20,
    name: "Dr. Nandini Rao",
    email: "nandini.rao@hotmail.com",
    position: "Professor of Biochemistry",
    experience: "14 years",
    skills: ["Enzyme Kinetics", "Molecular Biology", "Cell Biology", "Research Methodology"],
    phone: "+91 76543 45678",
    location: "Bangalore, Karnataka",
    education: "PhD Biochemistry, IISc Bangalore",
    projectsCompleted: 47,
    publications: 29,
    department: "Biochemistry",
    school: "SOLS"
  }
];

  const schools = ['All', 'SOET', 'SOM', 'SOL', 'SOLS'];

  const handleViewDetails = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const closeModal = () => {
    setSelectedCandidate(null);
  };

  const filteredCandidates = selectedSchool === 'All' 
    ? topCandidates 
    : topCandidates.filter(candidate => candidate.school === selectedSchool);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Scrollable candidates list */}
      <div className="bg-white shadow-md h-screen overflow-y-auto">
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">All Candidates</h2>
            <div className="flex space-x-2">
              {schools.map(school => (
                <button
                  key={school}
                  onClick={() => setSelectedSchool(school)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedSchool === school
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {school}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredCandidates.map((candidate, index) => (
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
                      <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                      <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                        {candidate.school}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{candidate.position}</p>
                    <p className="text-sm text-gray-500">{candidate.email}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-gray-600">{candidate.experience} experience</span>
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
          ))}
        </div>
      </div>

      {/* Modal for candidate details - remains the same */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">{selectedCandidate.name}</h2>
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
                  {selectedCandidate.school}
                </span>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Info */}
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
                  <h3 className="text-sm font-bold text-gray-800 mb-1">Location</h3>
                  <p className="text-gray-600">{selectedCandidate.location}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-1">Department</h3>
                  <p className="text-gray-600">{selectedCandidate.department}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-1">Publications</h3>
                  <p className="text-gray-600">{selectedCandidate.publications}</p>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-sm font-bold text-gray-800 mb-1">Education</h3>
                <p className="text-gray-600">{selectedCandidate.education}</p>
              </div>

              {/* Specialization */}
              <div>
                <h3 className="text-sm font-bold text-gray-800 mb-1">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                  Contact Professor
                </button>
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
                  Schedule Interview
                </button>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors">
                  Edit
                </button>
                <button onClick={closeModal} className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCandidates;