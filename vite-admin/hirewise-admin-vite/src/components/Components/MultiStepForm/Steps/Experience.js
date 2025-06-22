import React, { useState, useEffect } from 'react';

const Experience = ({ formData, setFormData, onNext, onPrevious }) => {
  const [errors, setErrors] = useState({});

  // Initialize arrays for experiences
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
    // eslint-disable-next-line
  }, []);

  // Calculate experience duration between two dates
  const calculateExperience = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    let totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    if (end.getDate() < start.getDate()) totalMonths--;
    if (totalMonths < 0) return 0;
    return totalMonths;
  };

  // Convert months to years/months string
  const monthsToString = (months) => {
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    let str = '';
    if (years > 0) str += `${years} years`;
    if (remMonths > 0) str += (str ? ' ' : '') + `${remMonths} months`;
    return str || '0 years';
  };

  // Update total experience
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

  // Handle teaching experience change
  const handleTeachingChange = (idx, e) => {
    const { name, value } = e.target;
    const teachingArr = [...(formData.teachingExperiences || [])];
    teachingArr[idx][name] = value;
    // Update experience string
    if (teachingArr[idx].teachingStartDate && teachingArr[idx].teachingEndDate) {
      const months = calculateExperience(teachingArr[idx].teachingStartDate, teachingArr[idx].teachingEndDate);
      teachingArr[idx].teachingExperience = monthsToString(months);
    }
    setFormData(prev => ({ ...prev, teachingExperiences: teachingArr }));
    updateTotalExperience(teachingArr, formData.researchExperiences || []);
  };

  // Handle research experience change
  const handleResearchChange = (idx, e) => {
    const { name, value } = e.target;
    const researchArr = [...(formData.researchExperiences || [])];
    researchArr[idx][name] = value;
    // Update experience string
    if (researchArr[idx].researchStartDate && researchArr[idx].researchEndDate) {
      const months = calculateExperience(researchArr[idx].researchStartDate, researchArr[idx].researchEndDate);
      researchArr[idx].researchExperience = monthsToString(months);
    }
    setFormData(prev => ({ ...prev, researchExperiences: researchArr }));
    updateTotalExperience(formData.teachingExperiences || [], researchArr);
  };

  // Add new teaching experience
  const addTeachingExperience = () => {
    const teachingArr = [...(formData.teachingExperiences || [])];
    teachingArr.push({ teachingPost: '', teachingInstitution: '', teachingStartDate: '', teachingEndDate: '', teachingExperience: '' });
    setFormData(prev => ({ ...prev, teachingExperiences: teachingArr }));
  };

  // Add new research experience
  const addResearchExperience = () => {
    const researchArr = [...(formData.researchExperiences || [])];
    researchArr.push({ researchPost: '', researchInstitution: '', researchStartDate: '', researchEndDate: '', researchExperience: '' });
    setFormData(prev => ({ ...prev, researchExperiences: researchArr }));
  };

  // Validation for all entries
  const validateForm = () => {
    const newErrors = { teaching: [], research: [] };
    (formData.teachingExperiences || []).forEach((exp, idx) => {
      const entryErrors = {};
      if (!exp.teachingPost) entryErrors.teachingPost = 'Teaching post is required';
      if (!exp.teachingInstitution) entryErrors.teachingInstitution = 'Institution/University is required';
      if (!exp.teachingStartDate) entryErrors.teachingStartDate = 'Start date is required';
      if (!exp.teachingEndDate) entryErrors.teachingEndDate = 'End date is required';
      newErrors.teaching[idx] = entryErrors;
    });
    (formData.researchExperiences || []).forEach((exp, idx) => {
      const entryErrors = {};
      if (!exp.researchPost) entryErrors.researchPost = 'Research post is required';
      if (!exp.researchInstitution) entryErrors.researchInstitution = 'Institution/University is required';
      if (!exp.researchStartDate) entryErrors.researchStartDate = 'Start date is required';
      if (!exp.researchEndDate) entryErrors.researchEndDate = 'End date is required';
      newErrors.research[idx] = entryErrors;
    });
    setErrors(newErrors);
    // Check if any errors exist
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
      <h2>Work Experience</h2>
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
            <label htmlFor={`teachingPost${idx}`}>Post*</label>
            <select
              id={`teachingPost${idx}`}
              name="teachingPost"
              value={exp.teachingPost}
              onChange={e => handleTeachingChange(idx, e)}
            >
              <option value="">Select Post</option>
              <option value="Lecturer">Lecturer</option>
              <option value="Assistant Professor">Assistant Professor</option>
              <option value="Associate Professor">Associate Professor</option>
              <option value="Professor">Professor</option>
            </select>
            {errors.teaching && errors.teaching[idx] && errors.teaching[idx].teachingPost && (
              <span className="error">{errors.teaching[idx].teachingPost}</span>
            )}
          </div>
          <div className="form-field">
            <label htmlFor={`teachingInstitution${idx}`}>Institution/University*</label>
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
            <label htmlFor={`teachingStartDate${idx}`}>Start Date*</label>
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
            <label htmlFor={`teachingEndDate${idx}`}>End Date*</label>
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

export default Experience; 