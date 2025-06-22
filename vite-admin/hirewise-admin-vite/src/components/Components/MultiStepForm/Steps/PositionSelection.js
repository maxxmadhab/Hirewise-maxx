import React, { useState, useEffect } from 'react';

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
      <h2>Position Selection</h2>
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

export default PositionSelection; 