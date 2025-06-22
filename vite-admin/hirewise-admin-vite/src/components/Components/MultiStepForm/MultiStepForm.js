import React, { useState } from 'react';
import './MultiStepForm.css';
import PositionSelection from './Steps/PositionSelection';
import PersonalInformation from './Steps/PersonalInformation';
import EducationDetails from './Steps/EducationDetails';
import Experience from './Steps/Experience';
import Documentation from './Steps/Documentation';
import ResearchInformation from './Steps/ResearchInformation';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    position: '',
    department: '',
    branch: '',
    // Add other form fields here
  });
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
        return <Documentation formData={formData} setFormData={setFormData} onPrevious={handlePrevious} onSubmit={() => {/* handle submit here */}} />;
      default:
        return null;
    }
  };

  return (
    <div className="multi-step-form">
      <div className="form-header">
        <div className="university-logo">
  <img src="/image 2.png" alt="University Logo" style={{ width: '100%', height: 'auto' }} />
</div>
        <div className="university-info">
          <div className="university-name">BML Munjal University</div>
          <div className="recruitment-text">Faculty Recruitment 2025</div>
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
                {isCompleted && (
                  <span className="checkmark">✓</span>
                )}
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

export default MultiStepForm; 