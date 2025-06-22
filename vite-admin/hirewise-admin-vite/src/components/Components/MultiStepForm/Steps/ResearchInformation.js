import React, { useState } from 'react';

const ResearchInformation = ({ formData, setFormData, onNext, onPrevious, onSubmit }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.scopusId) newErrors.scopusId = 'Scopus ID is required';
    if (!formData.scopusIndexCount) newErrors.scopusIndexCount = 'Orchid ID is required';
    if (!formData.googleScholarId) newErrors.googleScholarId = 'Google Scholar ID is required';
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
      <h2>Research Information</h2>
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
          <label htmlFor="scopusIndexCount">Orchid ID*</label>
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

export default ResearchInformation; 