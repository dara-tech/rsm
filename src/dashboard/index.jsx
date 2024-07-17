import React, { useEffect, useState } from 'react';
import AddResume from '@/dashboard/components/AddResume';
import { useUser } from '@clerk/clerk-react';
import { GetUserResumes } from '../service/GlobalApi';
import ResumeCardItem from '@/dashboard/components/ResumeCard';

const Dashboard = () => {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      getResumesList();
    }
  }, [user]);

  const getResumesList = () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      setLoading(true);
      GetUserResumes(user.primaryEmailAddress.emailAddress)
        .then(resp => {
          console.log('Response from API:', resp.data);
          setResumeList(resp.data);
        })
        .catch(error => {
          console.error('Error fetching resumes:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.warn('User email address not available.');
    }
  };

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating AI resume for your next job role</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10'>
        <AddResume />
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className='mt-4 rounded-lg bg-slate-200 animate-pulse h-[280px]'></div>
          ))
        ) : (
          resumeList.length > 0 ? (
            resumeList.map((resume, index) => (
              <ResumeCardItem
                resume={resume}
                key={index}
                refreshData={getResumesList}
              />
            ))
          ) : (
            <p>No resumes available.</p>
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;
