
import React, { useState } from 'react';
import HeaderSection from '@/components/HeaderSection';
import EligibilityForm from '@/components/EligibilityForm';
import Certificate from '@/components/Certificate';
import FooterSection from '@/components/FooterSection';

type ApplicationData = {
  name: string;
  tenthMarks: number;
  twelfthMarks: number;
  photo: string | null;
};

const Index = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [applicantData, setApplicantData] = useState<ApplicationData | null>(null);

  const handleFormSubmit = (data: ApplicationData) => {
    setApplicantData(data);
    setFormSubmitted(true);
    
    // Scroll to certificate after short delay
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {!formSubmitted ? (
          <>
            <HeaderSection />
            
            <div className="my-12 lg:mt-16">
              <EligibilityForm onSubmit={handleFormSubmit} />
            </div>
          </>
        ) : (
          <div className="py-8">
            <div className="mb-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bangers text-brand-red tracking-wider mb-2">
                🎉 Congratulations! 🎉
              </h2>
              <p className="text-gray-600 mb-8">
                You passed our rigorous selection process!
              </p>
            </div>
            
            {applicantData && (
              <Certificate 
                name={applicantData.name} 
                photo={applicantData.photo} 
              />
            )}
            
            <div className="mt-8 text-center">
              <button
                onClick={() => setFormSubmitted(false)}
                className="text-brand-blue underline font-medium"
              >
                ← Back to application form
              </button>
            </div>
          </div>
        )}
        
        <FooterSection />
      </div>
    </div>
  );
};

export default Index;
