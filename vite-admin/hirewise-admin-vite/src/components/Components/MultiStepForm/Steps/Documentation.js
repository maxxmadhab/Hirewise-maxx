import React, { useState } from 'react';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';

GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.js`;

const Documentation = ({ formData, setFormData, onNext, onPrevious, onSubmit }) => {
  // No validation or required constraints
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === 'function') {
      onSubmit();
    } else {
      onNext();
    }
    alert('Thank You for Your Application in BML Munjal University');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Documentation</h2>

      <div className="form-field">
        <label htmlFor="coverLetter">Cover Letter</label>
        <input
          type="file"
          id="coverLetter"
          accept=".pdf"
          onChange={(e) => handleFileChange(e, 'coverLetter')}
        />
        <small>PDF format only, 1 page maximum (Max size: 5MB)</small>
      </div>

      <div className="form-field">
        <label htmlFor="teachingStatement">Teaching Statement*</label>
        <input
          type="file"
          id="teachingStatement"
          accept=".pdf"
          onChange={(e) => handleFileChange(e, 'teachingStatement')}
        />
        <small>PDF format only, 1 page maximum (Max size: 5MB)</small>
      </div>

      <div className="form-field">
        <label htmlFor="researchStatement">Research Statement*</label>
        <input
          type="file"
          id="researchStatement"
          accept=".pdf"
          onChange={(e) => handleFileChange(e, 'researchStatement')}
        />
        <small>PDF format only, 1 page maximum (Max size: 5MB)</small>
      </div>

      <div className="form-field">
        <label htmlFor="publications">List of Publications</label>
        <input
          type="file"
          id="publications"
          accept=".pdf"
          onChange={(e) => handleFileChange(e, 'publications')}
        />
        <small>PDF format only, in APA format (Max size: 5MB)</small>
      </div>

      <div className="form-field">
        <label htmlFor="otherPublications">Top Three Pubished Papers(Combined pdf)*</label>
        <input
          type="file"
          id="otherPublications"
          accept=".pdf"
          onChange={(e) => handleFileChange(e, 'otherPublications')}
        />
        <small>PDF format only (Max size: 5MB)</small>
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
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Documentation; 