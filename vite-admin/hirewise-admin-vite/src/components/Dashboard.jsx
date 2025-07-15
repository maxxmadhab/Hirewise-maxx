import React, { useEffect, useState } from 'react';
import { Users, Eye, CheckCircle, XCircle, User, Building, ChevronDown, Filter, X } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Charts from './charts'; // Adjust path as needed



import StatsCardsClient from './stats-cardclient';

const Dashboard = () => {
  const [selectedView, setSelectedView] = useState('teaching');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [isDepartmentFilterOpen, setIsDepartmentFilterOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [schoolFilter, setSchoolFilter] = useState('All');
  const [isSchoolFilterOpen, setIsSchoolFilterOpen] = useState(false);
  const [isPositionFilterOpen, setIsPositionFilterOpen] = useState(false);
  const [positionFilter, setPositionFilter] = useState('All');
  

  // Remove default margins from body and html
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    
    return () => {
      // Cleanup on unmount
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.documentElement.style.margin = '';
      document.documentElement.style.padding = '';
    };
  }, []);

  //Teaching data
  const teachingData = {
    // stats: {
    //   total: 279,
    //   inReview: 134,
    //   shortlisted: 89,
    //   rejected: 56
    // },
    genderData: [
      { name: 'Male', value: 68, color: '#3B82F6' },
      { name: 'Female', value: 32, color: '#EC4899' }
    ],
    departmentData: [
      { name: 'SOET', applications: 120 },
      { name: 'SOM', applications: 85 },
      { name: 'SOL', applications: 45 },
      { name: 'SOLS', applications: 29 }
    ],
    topCandidates: [
       { 
      rank: 1, 
      name: 'Dr. Rajesh Kumar', 
      positionApplied: 'Professor',
      school: 'SOET', 
      department: 'CSE',
      institution: 'IIT Delhi',  // Added institution
      score: 95.2, 
      email: 'rajesh.kumar@email.com', 
      phone: '+91-9876543210', 
      experience: '8 years', 
      qualification: 'Ph.D in Computer Science', 
      specialization: 'Machine Learning', 
      publications: 15 
    },
    { 
      rank: 2, 
      name: 'Prof. Priya Sharma', 
      positionApplied: 'Professor',
      school: 'SOL', 
      department: 'Constitutional Law',
      institution: 'NLU Delhi',  // Added institution
      score: 94.8, 
      email: 'priya.sharma@email.com', 
      phone: '+91-9876543211', 
      experience: '12 years', 
      qualification: 'Ph.D in Law', 
      specialization: 'Constitutional Law', 
      publications: 22 
    },
    { 
      rank: 3, 
      name: 'Dr. Amit Singh', 
      positionApplied: 'Assistant Professor',
      school: 'SOLS', 
      department: 'Physics',
      institution: 'IISc Bangalore',  // Added institution
      score: 93.5, 
      email: 'amit.singh@email.com', 
      phone: '+91-9876543212', 
      experience: '6 years', 
      qualification: 'Ph.D in Physics', 
      specialization: 'Quantum Computing', 
      publications: 18 
    },
    { 
      rank: 4, 
      name: 'Dr. Vikram Mehta', 
      positionApplied: 'Professor',
      school: 'SOET', 
      department: 'ECOM',
      institution: 'IIT Bombay',  // Added institution
      score: 91.9, 
      email: 'vikram.mehta@email.com', 
      phone: '+91-9876543213', 
      experience: '10 years', 
      qualification: 'Ph.D in Electronics', 
      specialization: 'VLSI Design', 
      publications: 12 
    },
    { 
      rank: 5, 
      name: 'Prof. Ritu Gupta', 
      positionApplied: 'Assistant Professor',
      school: 'SOL', 
      department: 'Criminal Law',
      institution: 'NALSAR Hyderabad',  // Added institution
      score: 91.3, 
      email: 'ritu.gupta@email.com', 
      phone: '+91-9876543214', 
      experience: '9 years', 
      qualification: 'Ph.D in Law', 
      specialization: 'Criminal Law', 
      publications: 16 
    },
    { 
      rank: 6, 
      name: 'Dr. Suresh Yadav', 
      positionApplied: 'Professor',
      school: 'SOLS', 
      department: 'Chemistry',
      institution: 'IISER Pune',  // Added institution
      score: 90.8, 
      email: 'suresh.yadav@email.com', 
      phone: '+91-9876543215', 
      experience: '7 years', 
      qualification: 'Ph.D in Chemistry', 
      specialization: 'Organic Chemistry', 
      publications: 14 
    },
    { 
      rank: 7, 
      name: 'Dr. Manoj Tiwari', 
      positionApplied: 'Assistant Professor',
      school: 'SOET', 
      department: 'ME',
      institution: 'IIT Madras',  // Added institution
      score: 89.7, 
      email: 'manoj.tiwari@email.com', 
      phone: '+91-9876543216', 
      experience: '5 years', 
      qualification: 'Ph.D in Mechanical Engineering', 
      specialization: 'Robotics', 
      publications: 10 
    },
    { 
      rank: 8, 
      name: 'Prof. Kavita Jain', 
      positionApplied: 'Professor',
      school: 'SOL', 
      department: 'Corporate Law',
      institution: 'NUJS Kolkata',  // Added institution
      score: 89.1, 
      email: 'kavita.jain@email.com', 
      phone: '+91-9876543217', 
      experience: '11 years', 
      qualification: 'Ph.D in Law', 
      specialization: 'Corporate Law', 
      publications: 20 
    },
    { 
      rank: 9, 
      name: 'Dr. Ankit Sharma', 
      positionApplied: 'Assistant Professor',
      school: 'SOET', 
      department: 'CSE',
      institution: 'IIIT Hyderabad',  // Added institution
      score: 88.5, 
      email: 'ankit.sharma@email.com', 
      phone: '+91-9876543218', 
      experience: '4 years', 
      qualification: 'Ph.D in Computer Science', 
      specialization: 'Data Science', 
      publications: 8 
    },
    { 
      rank: 10, 
      name: 'Prof. Deepika Singh', 
      positionApplied: 'Professor',
      school: 'SOLS', 
      department: 'Mathematics',
      institution: 'ISI Kolkata',  // Added institution
      score: 88.2, 
      email: 'deepika.singh@email.com', 
      phone: '+91-9876543219', 
      experience: '13 years', 
      qualification: 'Ph.D in Mathematics', 
      specialization: 'Applied Mathematics', 
      publications: 25 
    },
       { 
      rank: 11, 
      name: 'Prof. Deepika Singh', 
      positionApplied: 'Associate Proffesor',
      school: 'SOLS', 
      department: 'Mathematics',
      institution: 'ISI Kolkata',  // Added institution
      score: 88.2, 
      email: 'deepika.singh@email.com', 
      phone: '+91-9876543219', 
      experience: '13 years', 
      qualification: 'Ph.D in Mathematics', 
      specialization: 'Applied Mathematics', 
      publications: 25 
    }
    ]
  };

  // Non-Teaching data (with institution added)
  const nonTeachingData = {
    stats: {
      total: 45,
      inReview: 22,
      shortlisted: 15,
      rejected: 8
    },
    genderData: [
      { name: 'Male', value: 58, color: '#3B82F6' },
      { name: 'Female', value: 42, color: '#EC4899' }
    ],
    departmentData: [
      { name: 'Administration', applications: 18 },
      { name: 'Technical Support', applications: 12 },
      { name: 'Library', applications: 8 },
      { name: 'Lab Assistant', applications: 7 }
    ],
    topCandidates: [
      { rank: 1, name: 'Ms. Sneha Patel', department: 'Administration', institution: 'Delhi University', score: 92.7, email: 'sneha.patel@email.com', phone: '+91-9876543220', experience: '5 years', qualification: 'MBA in Administration', specialization: 'Human Resources', certifications: 'HR Management, Payroll Systems' },
      { rank: 2, name: 'Mr. Rohit Kumar', department: 'Technical Support', institution: 'IP University', score: 91.4, email: 'rohit.kumar@email.com', phone: '+91-9876543221', experience: '4 years', qualification: 'B.Tech in IT', specialization: 'Network Administration', certifications: 'CCNA, CompTIA Network+' },
      // ... rest of non-teaching candidates with institution added
    ]
  };

  const currentData = selectedView === 'teaching' ? teachingData : nonTeachingData;

  // Get available departments/categories for filter
  const getFilterOptions = () => {
    const departments = [...new Set(currentData.topCandidates.map(candidate => candidate.department))];
    return ['All', ...departments];
  };

  // Filter candidates based on selected department
const getFilteredCandidates = () => {
  let filtered = currentData.topCandidates;
  
  // Department filter (existing)
  if (departmentFilter !== 'All') {
    filtered = filtered.filter(candidate => candidate.department === departmentFilter);
  }
  
  // School filter (existing)
  if (schoolFilter !== 'All') {
    filtered = filtered.filter(candidate => candidate.school === schoolFilter);
  }
  
  // New position filter
  if (positionFilter !== 'All') {
    filtered = filtered.filter(candidate => candidate.positionApplied === positionFilter);
  }
  
  return filtered;
};
  const filteredCandidates = getFilteredCandidates();

  const handleCardClick = (type) => {
    console.log(`Clicked on ${type} for ${selectedView}`);
    // Add your navigation logic here
  };

  const handleViewChange = (view) => {
    setSelectedView(view);
    setIsDropdownOpen(false);
    setDepartmentFilter('All');
    setSchoolFilter('All');
  };

  const handleDepartmentFilterChange = (department) => {
    setDepartmentFilter(department);
    setIsDepartmentFilterOpen(false);
  };

  //Total application count,inreview, shortlisted value
  
  // here is the code for school filter
  const getSchoolFilterOptions = () => {
    const schools = [...new Set(currentData.topCandidates.map(candidate => candidate.school))];
    return ['All', ...schools];
  };
  
  const handleSchoolFilterChange = (school) => {
    setSchoolFilter(school);
    setIsSchoolFilterOpen(false);
  };


  //code for PositionApplied filter
const getPositionFilterOptions = () => {
  if (!currentData?.topCandidates) return ['All'];
  
  // Extract all unique positions from data
  const allPositions = [...new Set(currentData.topCandidates.map(c => c.positionApplied))];
  
  // Define the order you want positions to appear
  const orderedPositions = [
    'Professor',
    'Assistant Professor', 
    'Associate Officer',
    // Add any other positions you want to specifically include
  ];
  
  // Combine ordered positions with any others found in data
  const positions = [
    ...orderedPositions.filter(pos => allPositions.includes(pos)),
    ...allPositions.filter(pos => !orderedPositions.includes(pos))
  ];
  
  return ['All', ...positions];
};

  const openCandidatePopup = (candidate) => {
    setSelectedCandidate(candidate);
    setIsPopupOpen(true);
  };

  const closeCandidatePopup = () => {
    setSelectedCandidate(null);
    setIsPopupOpen(false);
  };

  const getDepartmentColor = (department) => {
    if (selectedView === 'teaching') {
      switch (department) {
        case 'SOET': return 'bg-blue-100 text-blue-800';
        case 'SOL': return 'bg-purple-100 text-purple-800';
        case 'Research': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    } else {
      switch (department) {
        case 'Administration': return 'bg-blue-100 text-blue-800';
        case 'Technical Support': return 'bg-purple-100 text-purple-800';
        case 'Library': return 'bg-green-100 text-green-800';
        case 'Lab Assistant': return 'bg-orange-100 text-orange-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    }
  };

  return (
    <div className="h-screen bg-gray-50 overflow-hidden w-full">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            
            {/* Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span className="font-medium">
                  {selectedView === 'teaching' ? 'Teaching' : 'Non-Teaching'}
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border z-50">
                  <div className="py-1">
                    <button
                      onClick={() => handleViewChange('teaching')}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                        selectedView === 'teaching' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      Teaching
                    </button>
                    <button
                      onClick={() => handleViewChange('non-teaching')}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                        selectedView === 'non-teaching' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      Non-Teaching
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="h-full overflow-y-auto">
        <div className="px-6 py-4 space-y-4">
          {/* Stats Cards */}
          <StatsCardsClient />
        </div>

        {/* Charts Section */}
        
           <Charts />


        {/* Top 10 Selected Candidates */}
        <div className="bg-white rounded-lg shadow-sm p-4 mx-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">
              Top 10 Selected Candidates 
            </h2>
{/* Position Filter */}
<div className="relative">
  <button
    onClick={() => setIsPositionFilterOpen(!isPositionFilterOpen)}
    className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
  >
    <Filter className="h-4 w-4" />
    <span className="text-sm font-medium">
      {positionFilter === 'All' ? 'All Positions' : positionFilter}
    </span>
    <ChevronDown className={`h-4 w-4 transition-transform ${isPositionFilterOpen ? 'rotate-180' : ''}`} />
  </button>
  
  {isPositionFilterOpen && (
    <div className="absolute top-full right-0 mt-1 w-56 bg-white rounded-lg shadow-lg border z-50 max-h-60 overflow-y-auto">
      <div className="py-1">
        {getPositionFilterOptions().map((option) => (
          <button
            key={option}
            onClick={() => {
              setPositionFilter(option);
              setIsPositionFilterOpen(false);
            }}
            className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
              positionFilter === option ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )}
</div>

            {/* School filter */}
            <div className="flex gap-4">
              {/* New school filter */}
              <div className="relative">
                <button
                  onClick={() => setIsSchoolFilterOpen(!isSchoolFilterOpen)}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Filter className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {schoolFilter === 'All' ? 'All Schools' : schoolFilter}
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isSchoolFilterOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isSchoolFilterOpen && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border z-50">
                    <div className="py-1">
                      {getSchoolFilterOptions().map((option) => (
                        <button
                          key={option}
                          onClick={() => handleSchoolFilterChange(option)}
                          className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                            schoolFilter === option ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                          }`}
                        >
                          {option === 'All' ? 'All Schools' : option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            
            {/* Department Filter */}
            <div className="relative">
              <button
                onClick={() => setIsDepartmentFilterOpen(!isDepartmentFilterOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {departmentFilter === 'All' ? 'All Departments' : departmentFilter}
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isDepartmentFilterOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDepartmentFilterOpen && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border z-50">
                  <div className="py-1">
                    {getFilterOptions().map((option) => (
                      <button
                        key={option}
                        onClick={() => handleDepartmentFilterChange(option)}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                          departmentFilter === option ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        {option === 'All' ? 'All Departments' : option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-2 text-sm font-medium text-gray-700">Rank</th>
                  <th className="text-left py-2 px-2 text-sm font-medium text-gray-700">Name</th>
                  <th className="text-left py-2 px-2 text-sm font-medium text-gray-700">Position Applied</th>
                  <th className="text-left py-2 px-2 text-sm font-medium text-gray-700">School</th>
                  <th className="text-left py-2 px-2 text-sm font-medium text-gray-700">
                    {selectedView === 'teaching' ? 'Department' : 'Category'}
                  </th>
                  <th className="text-left py-2 px-2 text-sm font-medium text-gray-700">Score</th>
                  <th className="text-left py-2 px-2 text-sm font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.map((candidate) => (
                  <tr key={candidate.rank} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-2">
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                          candidate.rank <= 3 ? 'bg-gold' : 'bg-gray-400'
                        } ${candidate.rank === 1 ? 'bg-yellow-500' : candidate.rank === 2 ? 'bg-gray-400' : candidate.rank === 3 ? 'bg-amber-600' : ''}`}>
                          {candidate.rank}
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-2 text-sm font-medium text-gray-900">{candidate.name}</td>
                    <td className="py-2 px-2 text-sm text-gray-700">{candidate.positionApplied}</td>
                    <td className="py-2 px-2 text-sm text-gray-700">{candidate.school}</td>
                    <td className="py-2 px-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getDepartmentColor(candidate.department)}`}>
                        {candidate.department}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-sm font-bold text-gray-900">{candidate.score}</td>
                    <td className="py-2 px-2">
                      <button
                        onClick={() => openCandidatePopup(candidate)}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}

      {/* Click outside to close department filter */}
      {isDepartmentFilterOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsDepartmentFilterOpen(false)}
        />
      )}

      {/* Candidate Details Popup */}
      {isPopupOpen && selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Close button only in top-right corner */}
            <button
              onClick={closeCandidatePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="p-6 space-y-6">
              {/* Line 1: Rank and Name */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                    selectedCandidate.rank <= 3 ? 'bg-gold' : 'bg-gray-400'
                  } ${selectedCandidate.rank === 1 ? 'bg-yellow-500' : selectedCandidate.rank === 2 ? 'bg-gray-400' : selectedCandidate.rank === 3 ? 'bg-amber-600' : ''}`}>
                    {selectedCandidate.rank}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedCandidate.name}</h2>
                </div>
              </div>

              {/* Line 2: Institution */}
              <div>
                <p className="text-sm font-bold text-gray-800 mb-1">PHD INSTITUTION</p>
                <p className="text-base font-normal text-gray-500">{selectedCandidate.institution || "Not specified"}</p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 my-4"></div>

              {/* Rest of the details in grid layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-1">POSITION APPLIED</p>
                  <p className="text-base font-normal text-gray-500">{selectedCandidate.positionApplied}</p>
                </div>
                
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-1">SCHOOL</p>
                  <p className="text-base font-normal text-gray-500">{selectedCandidate.school}</p>
                </div>
                
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-1">
                    {selectedView === 'teaching' ? 'DEPARTMENT' : 'CATEGORY'}
                  </p>
                  <span className={`inline-flex px-3 py-1 text-sm font-normal rounded-full ${getDepartmentColor(selectedCandidate.department)}`}>
                    {selectedCandidate.department}
                  </span>
                </div>
                
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-1">SCORE</p>
                  <p className="text-base font-normal text-gray-500">{selectedCandidate.score}</p>
                </div>
                
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-1">EMAIL</p>
                  <p className="text-base font-normal text-gray-500">{selectedCandidate.email}</p>
                </div>
                
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-1">PHONE</p>
                  <p className="text-base font-normal text-gray-500">{selectedCandidate.phone}</p>
                </div>
                
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-1">EXPERIENCE</p>
                  <p className="text-base font-normal text-gray-500">{selectedCandidate.experience}</p>
                </div>
                
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-1">QUALIFICATION</p>
                  <p className="text-base font-normal text-gray-500">{selectedCandidate.qualification}</p>
                </div>
              </div>

              {/* Full width fields */}
              <div>
                <p className="text-sm font-bold text-gray-800 mb-1">SPECIALIZATION</p>
                <p className="text-base font-normal text-gray-500">{selectedCandidate.specialization}</p>
              </div>
              
              <div>
                <p className="text-sm font-bold text-gray-800 mb-1">
                  {selectedView === 'teaching' ? 'PUBLICATIONS' : 'CERTIFICATIONS'}
                </p>
                <p className="text-base font-normal text-gray-500">
                  {selectedView === 'teaching' ? selectedCandidate.publications : selectedCandidate.certifications}
                </p>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex justify-end gap-3 p-6 border-t bg-gray-50 sticky bottom-0">
              <button
                onClick={closeCandidatePopup}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => console.log('Contact candidate:', selectedCandidate.name)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Contact Candidate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;