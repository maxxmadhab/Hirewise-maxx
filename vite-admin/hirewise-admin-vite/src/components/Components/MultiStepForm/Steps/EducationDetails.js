import React, { useState, useEffect } from 'react';

const EducationDetails = ({ formData, setFormData, onNext, onPrevious }) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Initialize new fields for Bachelor's, Master's, and Ph.D. degrees
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

    // Bachelor's Validation
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

    // Master's Validation
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

    // Ph.D. Validation
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
      <h2>Education Details</h2>

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
            type="text"
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
            type="text"
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
            type="text"
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
            type="text"
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
              type="text"
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

export default EducationDetails; 