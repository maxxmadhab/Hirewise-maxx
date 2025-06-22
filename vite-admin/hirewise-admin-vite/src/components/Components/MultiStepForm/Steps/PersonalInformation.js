import React, { useState } from 'react';

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
      const age = today.getFullYear() - birthDate.getFullYear();
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
      <h2>Applicant Information</h2>
      
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

export default PersonalInformation; 