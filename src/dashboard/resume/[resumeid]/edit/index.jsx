import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { GetResumeById } from '@/service/GlobalApi';

function EditResume() {
  const { resumeid } = useParams();
  const [resumeInfo, setResumeInfo] = useState();

  useEffect(() => {
    console.log(resumeid);
    GetResumeInfo();
  }, [resumeid]); // Add resumeid as a dependency

  const GetResumeInfo = async () => {
    try {
      const resp = await GetResumeById(resumeid);
      console.log(resp.data);
      setResumeInfo(resp.data);
    } catch (error) {
      console.error('Error fetching resume:', error);
    }
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
        <FormSection />
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
