import React, { useContext, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import * as GlobalApi from "@/service/GlobalApi"; 
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

function Skills() {

  const [skillsList,setSkillsList]=useState([{
      name:'',
      rating:0
  }])
  const {resumeid}=useParams();

  const [loading,setLoading]=useState(false);
  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
 
  useEffect(()=>{
      resumeInfo&&setSkillsList(resumeInfo?.skills)
    },[])
 
  const handleChange=(index,name,value)=>{
      const newEntries=skillsList.slice();
    
      newEntries[index][name]=value;
      setSkillsList(newEntries);
  }

  const AddNewSkills=()=>{
      setSkillsList([...skillsList,{
          name:'',
      rating:0 
      }])
  }
  const RemoveSkills=()=>{
      setSkillsList(skillsList=>skillsList.slice(0,-1))
  }

  const onSave=()=>{

      setLoading(true);
      const data={
          data:{
              skills:skillsList.map(({ id, ...rest }) => rest)
          }
      }

      GlobalApi.UpdateResumeDetail(resumeid,data)
      .then(resp=>{
          console.log(resp);
          setLoading(false);
          toast('Details updated !')
      },(error)=>{
          setLoading(false);
          toast('Server Error, Try again!')
      })
  }

  useEffect(()=>{
      setResumeInfo({
          ...resumeInfo,
          skills:skillsList
      })
  },[skillsList])
return (
  <div className="ring-gray-100 rounded-md border-t-8 shadow-md dark:bg-gray-900 dark:ring-gray-800 p-4 ">
    <h2 className="font-semibold text-lg">Summary</h2>
    <p className="font-extralight">Add Summary for your job as {resumeInfo?.jobTitle} </p>

  <div>
      {skillsList.map((item,index)=>(
          <div className='flex justify-between mb-4 mt-4 ring-1 ring-gray-200 shadow-md dark:ring-gray-700 rounded-lg p-4 '>
              <div className='font-extralight'>
              
                  <Input className="w-full" placeholder='Add your skills'
                  defaultValue={item.name}
                  onChange={(e)=>handleChange(index,'name',e.target.value)} />
              </div>
              <Rating style={{ maxWidth: 120 }} value={item.rating} 
              onChange={(v)=>handleChange(index,'rating',v)}/>

          </div>
      ))}
  </div>
  <div className='flex justify-between'>
          <div className='flex gap-2'>
          <Button variant="outline" onClick={AddNewSkills} className="text-primary"> + Add More </Button>
          <Button variant="outline" onClick={RemoveSkills} className="text-primary"> - Remove</Button>

          </div>
          <Button disabled={loading} onClick={()=>onSave()}>
          {loading?<LoaderCircle className='animate-spin' />:'Save'}    
          </Button>
      </div>
  </div>
)
}

export default Skills;
