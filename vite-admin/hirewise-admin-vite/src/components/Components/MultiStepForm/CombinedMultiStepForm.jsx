import React, { useState, useEffect } from 'react';
import './MultiStepForm.css';
import { supabase } from '../../../../lib/supabase-client';

// Step 1: PositionSelection
const PositionSelection = ({ formData, setFormData, onNext }) => {
  const [errors, setErrors] = useState({});
  const [departments, setDepartments] = useState([]);
  const [branches, setBranches] = useState([]);

  const teachingDepartments = [
    { id: 'engineering', name: 'School of Engineering' },
    { id: 'law', name: 'School of Law' },
    { id: 'management', name: 'School of Management' },
    { id: 'liberal', name: 'School of Liberal Studies' },
  ];

  const nonTeachingDepartments = [
    { id: 'admin', name: 'Administration' },
    { id: 'it', name: 'IT Maintenance' },
    { id: 'security', name: 'Security' },
    { id: 'lab', name: 'Lab Assistants' },
  ];

  const engineeringBranches = [
    { id: 'cse', name: 'Computer Science Engineering' },
    { id: 'mech', name: 'Mechanical Engineering' },
    { id: 'ece', name: 'Electronics and Communication Engineering' },
  ];

  const lawBranches = [
    { id: 'criminal', name: 'Criminal Law' },
    { id: 'corporate', name: 'Corporate Law' },
    { id: 'civil', name: 'Civil Law' },
  ];

  const managementBranches = [
    { id: 'finance', name: 'Finance' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'hr', name: 'Human Resources' },
  ];

  const liberalBranches = [
    { id: 'english', name: 'English' },
    { id: 'history', name: 'History' },
    { id: 'sociology', name: 'Sociology' },
  ];

  useEffect(() => {
    if (formData.position === 'teaching') {
      setDepartments(teachingDepartments);
    } else if (formData.position === 'non-teaching') {
      setDepartments(nonTeachingDepartments);
    } else {
      setDepartments([]);
    }
  }, [formData.position]);

  useEffect(() => {
    if (formData.department) {
      switch (formData.department) {
        case 'engineering':
          setBranches(engineeringBranches);
          break;
        case 'law':
          setBranches(lawBranches);
          break;
        case 'management':
          setBranches(managementBranches);
          break;
        case 'liberal':
          setBranches(liberalBranches);
          break;
        default:
          setBranches([]);
      }
    } else {
      setBranches([]);
    }
  }, [formData.department]);



  const validateForm = () => {
    const newErrors = {};
    if (!formData.position) {
      newErrors.position = 'Please select a position';
    }
    if (!formData.department) {
      newErrors.department = 'Please select a department';
    }
    if (formData.position === 'teaching' && !formData.branch) {
      newErrors.branch = 'Please select a branch';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="position">Position Applying For*</label>
        <select
          id="position"
          value={formData.position}
          onChange={(e) => {
            setFormData({
              ...formData,
              position: e.target.value,
              department: '',
              branch: '',
            });
          }}
        >
          <option value="">Select Position</option>
          <option value="teaching">Teaching</option>
          <option value="non-teaching">Non-Teaching</option>
        </select>
        {errors.position && <span className="error">{errors.position}</span>}
      </div>
      <div className="form-field">
        <label htmlFor="department">Schools*</label>
        <select
          id="department"
          value={formData.department}
          onChange={(e) => {
            setFormData({
              ...formData,
              department: e.target.value,
              branch: '',
            });
          }}
          disabled={!formData.position}
        >
          <option value="">Select School</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
        {errors.department && <span className="error">{errors.department}</span>}
      </div>
      {formData.position === 'teaching' && (
        <div className="form-field">
          <label htmlFor="branch">Department*</label>
          <select
            id="branch"
            value={formData.branch}
            onChange={(e) =>
              setFormData({ ...formData, branch: e.target.value })
            }
            disabled={!formData.department}
          >
            <option value="">Select Department</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
          {errors.branch && <span className="error">{errors.branch}</span>}
        </div>
      )}
      <div className="form-buttons">
        <div style={{flex: 1}}></div>
        <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
          <button type="button" className="btn btn-secondary save-exit-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.6667 4.66667V1.33333H3.33333V4.66667M8 8V14M8 14L5.33333 11.3333M8 14L10.6667 11.3333M1.33333 14.6667H14.6667V4.66667H1.33333V14.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Save & Exit
          </button>
        </div>
        <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
          <button type="submit" className="btn btn-primary">
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

// Step 2: PersonalInformation
const PersonalInformation = ({ formData, setFormData, onNext, onPrevious }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of Birth is required';
    } else {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 21) {
        newErrors.dateOfBirth = 'You must be at least 21 years old';
      }
    }
    if (!formData.nationality) {
      newErrors.nationality = 'Nationality is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-fields-row">
        <div className="form-field">
          <label htmlFor="firstName">First Name*</label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName || ''}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="lastName">Last Name*</label>
          <input
            type="text"
            id="lastName"
            value={formData.lastName || ''}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
      </div>
      <div className="form-fields-row">
        <div className="form-field">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            id="email"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="phone">Phone Number*</label>
          <input
            type="tel"
            id="phone"
            value={formData.phone || ''}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            maxLength={10}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
      </div>
      <div className="form-field">
        <label>Gender*</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={formData.gender === 'Other'}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            />
            Other
          </label>
        </div>
        {errors.gender && <span className="error">{errors.gender}</span>}
      </div>
      <div className="form-fields-row">
        <div className="form-field">
          <label htmlFor="dateOfBirth">Date of Birth*</label>
          <input
            type="date"
            id="dateOfBirth"
            value={formData.dateOfBirth || ''}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
          />
          {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="nationality">Nationality*</label>
          <input
            type="text"
            id="nationality"
            value={formData.nationality || ''}
            onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
          />
          {errors.nationality && <span className="error">{errors.nationality}</span>}
        </div>
      </div>
      <div className="form-buttons">
        <div style={{flex: 1}}>
          <button type="button" className="btn btn-secondary" onClick={onPrevious}>
            Previous
          </button>
        </div>
        <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
          <button type="button" className="btn btn-secondary save-exit-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.6667 4.66667V1.33333H3.33333V4.66667M8 8V14M8 14L5.33333 11.3333M8 14L10.6667 11.3333M1.33333 14.6667H14.6667V4.66667H1.33333V14.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Save & Exit
          </button>
        </div>
        <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
          <button type="submit" className="btn btn-primary">
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

// Step 3: EducationDetails
const EducationDetails = ({ formData, setFormData, onNext, onPrevious }) => {
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      bachelorInstitute: prev.bachelorInstitute || '',
      bachelorDegreeName: prev.bachelorDegreeName || '',
      bachelorYear: prev.bachelorYear || '',
      bachelorCgpa: prev.bachelorCgpa || '',
      masterInstitute: prev.masterInstitute || '',
      masterDegreeName: prev.masterDegreeName || '',
      masterYear: prev.masterYear || '',
      masterCgpa: prev.masterCgpa || '',
      phdStatus: prev.phdStatus || 'Not done',
      phdInstitute: prev.phdInstitute || '',
      phdAreaSpecialization: prev.phdAreaSpecialization || '',
      phdYear: prev.phdYear || '',
      phdTitle: prev.phdTitle || '',
    }));
  }, [setFormData]);
  const validateForm = () => {
    const newErrors = {};
    if (!formData.bachelorInstitute) {
      newErrors.bachelorInstitute = 'Institution/University is required';
    }
    if (!formData.bachelorDegreeName) {
      newErrors.bachelorDegreeName = 'Degree Name is required';
    }
    if (!formData.bachelorYear) {
      newErrors.bachelorYear = 'Year is required';
    }
    if (!formData.bachelorCgpa) {
      newErrors.bachelorCgpa = '%/CGPA is required';
    }
    if (!formData.masterInstitute) {
      newErrors.masterInstitute = 'Institution/University is required';
    }
    if (!formData.masterDegreeName) {
      newErrors.masterDegreeName = 'Degree Name is required';
    }
    if (!formData.masterYear) {
      newErrors.masterYear = 'Year is required';
    }
    if (!formData.masterCgpa) {
      newErrors.masterCgpa = '%/CGPA is required';
    }
    if (formData.phdStatus !== 'Not done') {
      if (!formData.phdInstitute) {
        newErrors.phdInstitute = 'Institution/University is required';
      }
      if (!formData.phdAreaSpecialization) {
        newErrors.phdAreaSpecialization = 'Area of Specialization is required';
      }
      if (!formData.phdYear) {
        newErrors.phdYear = formData.phdStatus === 'Pursuing' ? 'Pursuing Year is required' : 'Passing Year is required';
      }
      if (!formData.phdTitle) {
        newErrors.phdTitle = 'Title is required';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <form onSubmit={handleSubmit}>
      {/* Bachelor's Degree Information */}
      <h3 className="degree-section-title">Bachelor's Degree</h3>
      <div className="degree-fields-row">
        <div className="form-field">
          <label htmlFor="bachelorInstitute">Institution/University*</label>
          <input
            type="text"
            id="bachelorInstitute"
            name="bachelorInstitute"
            value={formData.bachelorInstitute || ''}
            onChange={handleInputChange}
          />
          {errors.bachelorInstitute && <span className="error">{errors.bachelorInstitute}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="bachelorDegreeName">Degree Name*</label>
          <input
            type="text"
            id="bachelorDegreeName"
            name="bachelorDegreeName"
            value={formData.bachelorDegreeName || ''}
            onChange={handleInputChange}
          />
          {errors.bachelorDegreeName && <span className="error">{errors.bachelorDegreeName}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="bachelorYear">Passing Year*</label>
          <input
            type="number"
            id="bachelorYear"
            name="bachelorYear"
            value={formData.bachelorYear || ''}
            onChange={handleInputChange}
          />
          {errors.bachelorYear && <span className="error">{errors.bachelorYear}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="bachelorCgpa">Percentage/CGPA*</label>
          <input
            type="number"
            id="bachelorCgpa"
            name="bachelorCgpa"
            value={formData.bachelorCgpa || ''}
            onChange={handleInputChange}
          />
          {errors.bachelorCgpa && <span className="error">{errors.bachelorCgpa}</span>}
        </div>
      </div>
      {/* Master's Degree Information */}
      <h3 className="degree-section-title">Master's Degree</h3>
      <div className="degree-fields-row">
        <div className="form-field">
          <label htmlFor="masterInstitute">Institution/University*</label>
          <input
            type="text"
            id="masterInstitute"
            name="masterInstitute"
            value={formData.masterInstitute || ''}
            onChange={handleInputChange}
          />
          {errors.masterInstitute && <span className="error">{errors.masterInstitute}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="masterDegreeName">Degree Name*</label>
          <input
            type="text"
            id="masterDegreeName"
            name="masterDegreeName"
            value={formData.masterDegreeName || ''}
            onChange={handleInputChange}
          />
          {errors.masterDegreeName && <span className="error">{errors.masterDegreeName}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="masterYear">Passing Year*</label>
          <input
            type="number"
            id="masterYear"
            name="masterYear"
            value={formData.masterYear || ''}
            onChange={handleInputChange}
          />
          {errors.masterYear && <span className="error">{errors.masterYear}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="masterCgpa">Percentage/CGPA*</label>
          <input
            type="number"
            id="masterCgpa"
            name="masterCgpa"
            value={formData.masterCgpa || ''}
            onChange={handleInputChange}
          />
          {errors.masterCgpa && <span className="error">{errors.masterCgpa}</span>}
        </div>
      </div>
      {/* Ph.D. Information */}
      <h3 className="degree-section-title">Ph.D.</h3>
      <div className="form-field">
        <label htmlFor="phdStatus">Status*</label>
        <select
          id="phdStatus"
          name="phdStatus"
          value={formData.phdStatus || 'Not done'}
          onChange={handleInputChange}
        >
          <option value="Not done">Not done</option>
          <option value="Pursuing">Pursuing</option>
          <option value="Submitted">Submitted</option>
          <option value="Awarded">Awarded</option>
        </select>
      </div>
      {formData.phdStatus !== 'Not done' && (
        <div className="degree-fields-row">
          <div className="form-field">
            <label htmlFor="phdInstitute">Institution/University*</label>
            <input
              type="text"
              id="phdInstitute"
              name="phdInstitute"
              value={formData.phdInstitute || ''}
              onChange={handleInputChange}
            />
            {errors.phdInstitute && <span className="error">{errors.phdInstitute}</span>}
          </div>
          <div className="form-field">
            <label htmlFor="phdAreaSpecialization">Area of Specialization*</label>
            <input
              type="text"
              id="phdAreaSpecialization"
              name="phdAreaSpecialization"
              value={formData.phdAreaSpecialization || ''}
              onChange={handleInputChange}
            />
            {errors.phdAreaSpecialization && <span className="error">{errors.phdAreaSpecialization}</span>}
          </div>
          <div className="form-field">
            <label htmlFor="phdYear">{formData.phdStatus === 'Pursuing' ? 'Pursuing Year*' : 'Passing Year*'}</label>
            <input
              type="number"
              id="phdYear"
              name="phdYear"
              value={formData.phdYear || ''}
              onChange={handleInputChange}
            />
            {errors.phdYear && <span className="error">{errors.phdYear}</span>}
          </div>
          <div className="form-field">
            <label htmlFor="phdTitle">Title*</label>
            <input
              type="text"
              id="phdTitle"
              name="phdTitle"
              value={formData.phdTitle || ''}
              onChange={handleInputChange}
            />
            {errors.phdTitle && <span className="error">{errors.phdTitle}</span>}
          </div>
        </div>
      )}
      <div className="form-buttons">
        <div style={{flex: 1}}>
          <button type="button" className="btn btn-secondary" onClick={onPrevious}>
            Previous
          </button>
        </div>
        <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
          <button type="button" className="btn btn-secondary save-exit-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.6667 4.66667V1.33333H3.33333V4.66667M8 8V14M8 14L5.33333 11.3333M8 14L10.6667 11.3333M1.33333 14.6667H14.6667V4.66667H1.33333V14.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Save & Exit
          </button>
        </div>
        <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
          <button type="submit" className="btn btn-primary">
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

// Step 4: Experience
const Experience = ({ formData, setFormData, onNext, onPrevious }) => {
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      teachingExperiences: prev.teachingExperiences || [
        { teachingPost: '', teachingInstitution: '', teachingStartDate: '', teachingEndDate: '', teachingExperience: '' }
      ],
      researchExperiences: prev.researchExperiences || [
        { researchPost: '', researchInstitution: '', researchStartDate: '', researchEndDate: '', researchExperience: '' }
      ],
      totalExperience: prev.totalExperience || '',
    }));
  }, []);
  const calculateExperience = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    let totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    if (end.getDate() < start.getDate()) totalMonths--;
    if (totalMonths < 0) return 0;
    return totalMonths;
  };
  const monthsToString = (months) => {
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    let str = '';
    if (years > 0) str += `${years} years`;
    if (remMonths > 0) str += (str ? ' ' : '') + `${remMonths} months`;
    return str || '0 years';
  };
  const updateTotalExperience = (teachingArr, researchArr) => {
    let totalMonths = 0;
    teachingArr.forEach(exp => {
      totalMonths += calculateExperience(exp.teachingStartDate, exp.teachingEndDate);
    });
    researchArr.forEach(exp => {
      totalMonths += calculateExperience(exp.researchStartDate, exp.researchEndDate);
    });
    setFormData(prev => ({ ...prev, totalExperience: monthsToString(totalMonths) }));
  };
  const handleTeachingChange = (idx, e) => {
    const { name, value } = e.target;
    const teachingArr = [...(formData.teachingExperiences || [])];
    teachingArr[idx][name] = value;
    if (teachingArr[idx].teachingStartDate && teachingArr[idx].teachingEndDate) {
      const months = calculateExperience(teachingArr[idx].teachingStartDate, teachingArr[idx].teachingEndDate);
      teachingArr[idx].teachingExperience = monthsToString(months);
    }
    setFormData(prev => ({ ...prev, teachingExperiences: teachingArr }));
    updateTotalExperience(teachingArr, formData.researchExperiences || []);
  };
  const handleResearchChange = (idx, e) => {
    const { name, value } = e.target;
    const researchArr = [...(formData.researchExperiences || [])];
    researchArr[idx][name] = value;
    if (researchArr[idx].researchStartDate && researchArr[idx].researchEndDate) {
      const months = calculateExperience(researchArr[idx].researchStartDate, researchArr[idx].researchEndDate);
      researchArr[idx].researchExperience = monthsToString(months);
    }
    setFormData(prev => ({ ...prev, researchExperiences: researchArr }));
    updateTotalExperience(formData.teachingExperiences || [], researchArr);
  };
  const addTeachingExperience = () => {
    const teachingArr = [...(formData.teachingExperiences || [])];
    teachingArr.push({ teachingPost: '', teachingInstitution: '', teachingStartDate: '', teachingEndDate: '', teachingExperience: '' });
    setFormData(prev => ({ ...prev, teachingExperiences: teachingArr }));
  };
  const addResearchExperience = () => {
    const researchArr = [...(formData.researchExperiences || [])];
    researchArr.push({ researchPost: '', researchInstitution: '', researchStartDate: '', researchEndDate: '', researchExperience: '' });
    setFormData(prev => ({ ...prev, researchExperiences: researchArr }));
  };
  const validateForm = () => {
    const newErrors = { teaching: [], research: [] };
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    // Teaching experience validation (optional, but check dates if present)
    (formData.teachingExperiences || []).forEach((exp, idx) => {
      const entryErrors = {};
      if (exp.teachingStartDate && exp.teachingStartDate > today) {
        entryErrors.teachingStartDate = 'Start date cannot be in the future';
      }
      if (exp.teachingEndDate && exp.teachingEndDate > today) {
        entryErrors.teachingEndDate = 'End date cannot be in the future';
      }
      newErrors.teaching[idx] = entryErrors;
    });
    // Research experience validation (required, and check dates)
    (formData.researchExperiences || []).forEach((exp, idx) => {
      const entryErrors = {};
      if (!exp.researchPost) entryErrors.researchPost = 'Research post is required';
      if (!exp.researchInstitution) entryErrors.researchInstitution = 'Institution/University is required';
      if (!exp.researchStartDate) entryErrors.researchStartDate = 'Start date is required';
      else if (exp.researchStartDate > today) entryErrors.researchStartDate = 'Start date cannot be in the future';
      if (!exp.researchEndDate) entryErrors.researchEndDate = 'End date is required';
      else if (exp.researchEndDate > today) entryErrors.researchEndDate = 'End date cannot be in the future';
      newErrors.research[idx] = entryErrors;
    });
    setErrors(newErrors);
    const hasTeachingErrors = newErrors.teaching.some(e => Object.keys(e).length > 0);
    const hasResearchErrors = newErrors.research.some(e => Object.keys(e).length > 0);
    return !(hasTeachingErrors || hasResearchErrors);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {/* Teaching Experience Section */}
      <h3 className="degree-section-title">Teaching Experience</h3>
      {(formData.teachingExperiences || []).map((exp, idx) => (
        <div className="degree-fields-row" key={idx} style={{marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem', position: 'relative'}}>
          {idx > 0 && (
            <button type="button" onClick={() => {
              const teachingArr = [...formData.teachingExperiences];
              teachingArr.splice(idx, 1);
              setFormData(prev => ({ ...prev, teachingExperiences: teachingArr }));
            }}
              style={{position: 'absolute', top: 0, right: 0, background: '#f8d7da', color: '#721c24', border: 'none', borderRadius: '50%', width: '24px', height: '24px', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
              aria-label="Remove Teaching Experience"
            >
              &minus;
            </button>
          )}
          <div className="form-field">
            <label htmlFor={`teachingPost${idx}`}>Post</label>
            <select
              id={`teachingPost${idx}`}
              name="teachingPost"
              value={exp.teachingPost}
              onChange={e => handleTeachingChange(idx, e)}
            >
              <option value="">Select Post</option>
              <option value="Assistant Professor">Assistant Professor</option>
              <option value="Associate Professor">Associate Professor</option>
              <option value="Professor">Professor</option>
            </select>
            {errors.teaching && errors.teaching[idx] && errors.teaching[idx].teachingPost && (
              <span className="error">{errors.teaching[idx].teachingPost}</span>
            )}
          </div>
          <div className="form-field">
            <label htmlFor={`teachingInstitution${idx}`}>Institution/University</label>
            <input
              type="text"
              id={`teachingInstitution${idx}`}
              name="teachingInstitution"
              value={exp.teachingInstitution}
              onChange={e => handleTeachingChange(idx, e)}
            />
            {errors.teaching && errors.teaching[idx] && errors.teaching[idx].teachingInstitution && (
              <span className="error">{errors.teaching[idx].teachingInstitution}</span>
            )}
          </div>
          <div className="form-field">
            <label htmlFor={`teachingStartDate${idx}`}>Start Date</label>
            <input
              type="date"
              id={`teachingStartDate${idx}`}
              name="teachingStartDate"
              value={exp.teachingStartDate}
              onChange={e => handleTeachingChange(idx, e)}
            />
            {errors.teaching && errors.teaching[idx] && errors.teaching[idx].teachingStartDate && (
              <span className="error">{errors.teaching[idx].teachingStartDate}</span>
            )}
          </div>
          <div className="form-field">
            <label htmlFor={`teachingEndDate${idx}`}>End Date</label>
            <input
              type="date"
              id={`teachingEndDate${idx}`}
              name="teachingEndDate"
              value={exp.teachingEndDate}
              onChange={e => handleTeachingChange(idx, e)}
            />
            {errors.teaching && errors.teaching[idx] && errors.teaching[idx].teachingEndDate && (
              <span className="error">{errors.teaching[idx].teachingEndDate}</span>
            )}
          </div>
          <div className="form-field">
            <label>Experience</label>
            <input
              type="text"
              value={exp.teachingExperience}
              readOnly
              className="readonly-field"
            />
          </div>
        </div>
      ))}
      <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem'}}>
        <button type="button" className="btn btn-primary" onClick={addTeachingExperience} style={{fontSize: '0.9rem', padding: '0.5rem 1.2rem', borderRadius: '6px'}}>
          + Add Teaching Experience
        </button>
      </div>
      {/* Research Experience Section */}
      <h3 className="degree-section-title">Research Experience</h3>
      {(formData.researchExperiences || []).map((exp, idx) => (
        <div className="degree-fields-row" key={idx} style={{marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem', position: 'relative'}}>
          {idx > 0 && (
            <button type="button" onClick={() => {
              const researchArr = [...formData.researchExperiences];
              researchArr.splice(idx, 1);
              setFormData(prev => ({ ...prev, researchExperiences: researchArr }));
            }}
              style={{position: 'absolute', top: 0, right: 0, background: '#f8d7da', color: '#721c24', border: 'none', borderRadius: '50%', width: '24px', height: '24px', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
              aria-label="Remove Research Experience"
            >
              &minus;
            </button>
          )}
          <div className="form-field">
            <label htmlFor={`researchPost${idx}`}>Post*</label>
            <input
              type="text"
              id={`researchPost${idx}`}
              name="researchPost"
              value={exp.researchPost}
              onChange={e => handleResearchChange(idx, e)}
              placeholder="e.g., Research Associate"
            />
            {errors.research && errors.research[idx] && errors.research[idx].researchPost && (
              <span className="error">{errors.research[idx].researchPost}</span>
            )}
          </div>
          <div className="form-field">
            <label htmlFor={`researchInstitution${idx}`}>Institution/University*</label>
            <input
              type="text"
              id={`researchInstitution${idx}`}
              name="researchInstitution"
              value={exp.researchInstitution}
              onChange={e => handleResearchChange(idx, e)}
            />
            {errors.research && errors.research[idx] && errors.research[idx].researchInstitution && (
              <span className="error">{errors.research[idx].researchInstitution}</span>
            )}
          </div>
          <div className="form-field">
            <label htmlFor={`researchStartDate${idx}`}>Start Date*</label>
            <input
              type="date"
              id={`researchStartDate${idx}`}
              name="researchStartDate"
              value={exp.researchStartDate}
              onChange={e => handleResearchChange(idx, e)}
            />
            {errors.research && errors.research[idx] && errors.research[idx].researchStartDate && (
              <span className="error">{errors.research[idx].researchStartDate}</span>
            )}
          </div>
          <div className="form-field">
            <label htmlFor={`researchEndDate${idx}`}>End Date*</label>
            <input
              type="date"
              id={`researchEndDate${idx}`}
              name="researchEndDate"
              value={exp.researchEndDate}
              onChange={e => handleResearchChange(idx, e)}
            />
            {errors.research && errors.research[idx] && errors.research[idx].researchEndDate && (
              <span className="error">{errors.research[idx].researchEndDate}</span>
            )}
          </div>
          <div className="form-field">
            <label>Experience</label>
            <input
              type="text"
              value={exp.researchExperience}
              readOnly
              className="readonly-field"
            />
          </div>
        </div>
      ))}
      <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem'}}>
        <button type="button" className="btn btn-primary" onClick={addResearchExperience} style={{fontSize: '0.9rem', padding: '0.5rem 1.2rem', borderRadius: '6px'}}>
          + Add Research Experience
        </button>
      </div>
      {/* Total Experience */}
      <div className="form-field total-experience">
        <label>Total Experience</label>
        <input
          type="text"
          value={formData.totalExperience || ''}
          readOnly
          className="readonly-field"
        />
      </div>
      <div className="form-buttons">
        <div style={{flex: 1}}>
          <button type="button" className="btn btn-secondary" onClick={onPrevious}>
            Previous
          </button>
        </div>
        <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
          <button type="button" className="btn btn-secondary save-exit-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.6667 4.66667V1.33333H3.33333V4.66667M8 8V14M8 14L5.33333 11.3333M8 14L10.6667 11.3333M1.33333 14.6667H14.6667V4.66667H1.33333V14.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Save & Exit
          </button>
        </div>
        <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
          <button type="submit" className="btn btn-primary">
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

// Step 5: ResearchInformation
const ResearchInformation = ({ formData, setFormData, onNext, onPrevious, onSubmit }) => {
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    if (!formData.scopusId) newErrors.scopusId = 'Scopus ID is required';
    if (!formData.googleScholarId) {
      newErrors.googleScholarId = 'Google Scholar ID is required';
    } else if (!/^[a-zA-Z0-9]{10,20}$/.test(formData.googleScholarId)) {
      newErrors.googleScholarId = 'Google Scholar ID must be alphanumeric, e.g., YBxwE6gAAAAJ';
    }
    if (formData.scopusIndexCount) {
      if (!/^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/.test(formData.scopusIndexCount)) {
        newErrors.scopusIndexCount = 'ORCID ID must be in the format 0000-0001-5109-3700';
      }
    }
    if (!formData.temp1) newErrors.temp1 = 'No. of Scopus Index General Papers is required';
    if (!formData.temp2) newErrors.temp2 = 'No. of Scopus Index Conference Papers is required';
    if (!formData.temp3) newErrors.temp3 = 'No. of Edited Books is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-fields-row">
        <div className="form-field">
          <label htmlFor="scopusId">Scopus ID*</label>
          <input
            type="text"
            id="scopusId"
            name="scopusId"
            value={formData.scopusId || ''}
            onChange={handleInputChange}
          />
          {errors.scopusId && <span className="error">{errors.scopusId}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="scopusIndexCount">Orchid ID</label>
          <input
            type="text"
            id="scopusIndexCount"
            name="scopusIndexCount"
            value={formData.scopusIndexCount || ''}
            onChange={handleInputChange}
          />
          {errors.scopusIndexCount && <span className="error">{errors.scopusIndexCount}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="googleScholarId">Google Scholar ID*</label>
          <input
            type="text"
            id="googleScholarId"
            name="googleScholarId"
            value={formData.googleScholarId || ''}
            onChange={handleInputChange}
          />
          {errors.googleScholarId && <span className="error">{errors.googleScholarId}</span>}
        </div>
      </div>
      <div className="form-fields-row">
        <div className="form-field">
          <label htmlFor="temp1">No. of Scopus Index General Papers*</label>
          <input
            type="number"
            id="temp1"
            name="temp1"
            value={formData.temp1 || ''}
            onChange={handleInputChange}
          />
          {errors.temp1 && <span className="error">{errors.temp1}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="temp2">No. of Scopus Index Conference Papers*</label>
          <input
            type="number"
            id="temp2"
            name="temp2"
            value={formData.temp2 || ''}
            onChange={handleInputChange}
          />
          {errors.temp2 && <span className="error">{errors.temp2}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="temp3">No. of Edited Books*</label>
          <input
            type="number"
            id="temp3"
            name="temp3"
            value={formData.temp3 || ''}
            onChange={handleInputChange}
          />
          {errors.temp3 && <span className="error">{errors.temp3}</span>}
        </div>
      </div>
      <div className="form-buttons">
        <div style={{flex: 1}}>
          <button type="button" className="btn btn-secondary" onClick={onPrevious}>
            Previous
          </button>
        </div>
        <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
          <button type="button" className="btn btn-secondary save-exit-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.6667 4.66667V1.33333H3.33333V4.66667M8 8V14M8 14L5.33333 11.3333M8 14L10.6667 11.3333M1.33333 14.6667H14.6667V4.66667H1.33333V14.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Save & Exit
          </button>
        </div>
        <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
          <button type="submit" className="btn btn-primary">
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

// Step 6: Documentation
const Documentation = ({ formData, setFormData, onPrevious, onSubmit }) => {
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [field]: file }));
    }
  };

  return (
    <form>
      
      

      <div className="form-field">
        <label>Cover Letter </label>
        <input type="file" onChange={(e) => handleFileChange(e, 'coverLetterPath')} />
      </div>

      <div className="form-field">
        <label>Teaching Statement *</label>
        <input type="file" onChange={(e) => handleFileChange(e, 'teachingStatement')} />
      </div>

      <div className="form-field">
        <label>Research Statement *</label>
        <input type="file" onChange={(e) => handleFileChange(e, 'researchStatement')} />
      </div>

      <div className="form-field">
        <label>Publications</label>
        <input type="file" onChange={(e) => handleFileChange(e, 'publications')} />
      </div>

      <div className="form-field">
        <label>Top 3 Published Papers(1 compiled pdf)*</label>
        <input type="file" onChange={(e) => handleFileChange(e, 'otherPublications')} />
      </div>

      <div className="flex justify-between items-center mt-4">
  <button type="button" className="btn btn-secondary" onClick={onPrevious}>
    Previous
  </button>
  <button type="button" className="btn btn-primary" onClick={onSubmit}>
    Submit Application
  </button>
</div>
    </form>
  );
};


// Main MultiStepForm
const CombinedMultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  

  const [formData, setFormData] = useState({
    position: '',
    department: '',
    branch: '',
  });
const [profile, setProfile] = useState({
  full_name: '',
  loading: true,
  error: null
});
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id) // ✅ Correct column name for your case
        .maybeSingle();

      if (error) throw error;

      setProfile({
        full_name: data?.full_name || '',
        loading: false,
        error: null
      });
    } catch (err) {
      console.error('Error fetching profile:', err);
      setProfile(prev => ({
        ...prev,
        loading: false,
        error: err.message
      }));
    }
  };

  fetchProfile();
}, []);




const { loading, error, full_name: fullName } = profile;


  const [completedSteps, setCompletedSteps] = useState([]);

  const steps = [
    { id: 1, name: 'Position Selection' },
    { id: 2, name: 'Personal Information' },
    { id: 3, name: 'Education Details' },
    { id: 4, name: 'Experience' },
    { id: 5, name: 'Research Information' },
    { id: 6, name: 'Documentation' },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

 const onSubmitFinalApplication = async () => {
  const formattedSubmission = {
    // Faculty application core details
   position: formData.position || '',
  department: formData.department || '',
  branch: formData.branch || '',
  first_name: formData.firstName || '',       // Changed from full_name
  last_name: formData.lastName || '',        // New
  email: formData.email || '',
  phone: formData.phone || '',
  address: formData.address || '',
  highest_degree: formData.highest_degree || '',
  university: formData.university || '',
  graduation_year: formData.graduation_year || '',
  previous_positions: formData.previous_positions || '',
  years_of_experience: formData.totalExperience || '',
  publications: formData.publications || '',
  resume_path: formData.resume_path || null,
  cover_letter_path: formData.cover_letter_path || null,
  gender: formData.gender || '',             // New
  date_of_birth: formData.dateOfBirth || '', // New (ensure format is YYYY-MM-DD)
  nationality: formData.nationality || ''  ,

    // Teaching experiences (array of objects)
    teachingExperiences: (formData.teachingExperiences || []).map(t => ({
      teachingPost: t.teachingPost || '', // Changed from 'post'
      teachingInstitution: t.teachingInstitution || '', // Changed from 'institution'
      teachingStartDate: t.teachingStartDate || '', // Changed from 'startDate'
      teachingEndDate: t.teachingEndDate || '', // Changed from 'endDate'
      teachingExperience: t.teachingExperience || '' // Changed from 'experience'
    })),

    // Research experiences (array of objects)
    researchExperiences: (formData.researchExperiences || []).map(r => ({
      researchPost: r.researchPost || '', // Changed from 'post'
      researchInstitution: r.researchInstitution || '', // Changed from 'institution'
      researchStartDate: r.researchStartDate || '', // Changed from 'startDate'
      researchEndDate: r.researchEndDate || '', // Changed from 'endDate'
      researchExperience: r.researchExperience || '' // Changed from 'experience'
    })),

    // Research Info (single object)
    researchInfo: {
      scopus_id: formData.scopusId || '',
      orchid_id: formData.orchidId || '', // Changed from 'scopusIndexCount'
      google_scholar_id: formData.googleScholarId || '',
      scopus_general_papers: Number(formData.scopus_general_papers) || 0, // Changed from 'temp1'
      conference_papers: Number(formData.conference_papers) || 0, // Changed from 'temp2'
      edited_books: Number(formData.edited_books) || 0 // Changed from 'temp3'
    }
  };

  try {
    const response = await fetch('http://localhost:5000/api/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedSubmission)
    });

    if (!response.ok) {
      const errorRes = await response.json();
      throw new Error(errorRes.error || 'Failed to submit');
    }

    alert('✅ Application submitted successfully!');
  } catch (err) {
    console.error('❌ Submission error:', err);
    alert('❌ Submission failed: ' + err.message);
  }
};

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PositionSelection formData={formData} setFormData={setFormData} onNext={handleNext} />;
      case 2:
        return <PersonalInformation formData={formData} setFormData={setFormData} onNext={handleNext} onPrevious={handlePrevious} />;
      case 3:
        return <EducationDetails formData={formData} setFormData={setFormData} onNext={handleNext} onPrevious={handlePrevious} />;
      case 4:
        return <Experience formData={formData} setFormData={setFormData} onNext={handleNext} onPrevious={handlePrevious} />;
      case 5:
        return <ResearchInformation formData={formData} setFormData={setFormData} onNext={handleNext} onPrevious={handlePrevious} />;
      case 6:
        return <Documentation formData={formData} setFormData={setFormData} onPrevious={handlePrevious} onSubmit={onSubmitFinalApplication} />;
      default:
        return null;
    }
  };

  return (
    <div className="multi-step-form">
    <div className="form-header" style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between', // This creates space between left and right content
  width: '100%',
  padding: '0 20px', // Add horizontal padding
}}>
  {/* Left side - University info */}
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <div className="university-logo" style={{ width: '60px', marginRight: '15px' }}>
      <img src="/image 2.png" alt="University Logo" style={{ width: '100%', height: 'auto' }} />
    </div>
    <div className="university-info">
      <div className="university-name" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>BML Munjal University</div>
      <div className="recruitment-text" style={{ color: '#555' }}>Faculty Recruitment 2025</div>
    </div>
  </div>

  {/* Right side - Welcome message */}
  <div className="profile-display" style={{ marginLeft: 'auto' }}>
    {loading ? (
      <div>Loading...</div>
    ) : error ? (
      <div className="error">Error: {error}</div>
    ) : (
      fullName && (
        <div className="user-name" style={{
          fontWeight: '600',
          fontSize: '1.1rem',
          color: '#333',
          fontFamily: 'Arial, sans-serif'
        }}>
          Welcome, <span style={{ fontWeight: '700', color: '#000' }}>{fullName}</span>
        </div>
      )
    )}
  </div>
</div>


      <div className="form-progress">
        {steps.map((step) => {
          const isCompleted = completedSteps.includes(step.id);
          const isActive = currentStep === step.id;
          return (
            <div
              key={step.id}
              className={`step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isCompleted ? 'clickable' : 'disabled'}`}
              onClick={() => {
                if (isCompleted) setCurrentStep(step.id);
              }}
              style={{ cursor: isCompleted ? 'pointer' : 'not-allowed' }}
              aria-disabled={!isCompleted}
              tabIndex={isCompleted ? 0 : -1}
            >
              <div className="step-number">{step.id}</div>
              <div className="step-name">
                {step.name}
                {isCompleted && <span className="checkmark">&#10003;</span>}
              </div>
            </div>
          );
        })}
      </div>
      <div className="form-content">
        {renderStep()}
      </div>
    </div>
  );
};

export default CombinedMultiStepForm;
