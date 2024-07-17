import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import * as GlobalApi from "@/service/GlobalApi"; 
import { LoaderCircle } from 'lucide-react';
import { toast } from "sonner"
const formField ={
  title:'',
  campanyName:'',
  city:'',
  state:'',
  startDate:'',
  endDate:'',
  workSummary:'',

}
function Experience() {
  formField
  const [experinceList,setExperinceList]=useState([]);
  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
  const params=useParams();
  const [loading,setLoading]=useState(false);

  useEffect(() => {
      if (resumeInfo?.Experience?.length > 0) {
          setExperinceList(resumeInfo.Experience);
      }
  }, [resumeInfo]);
  

  const handleChange=(index,event)=>{
      const newEntries=experinceList.slice();
      const {name,value}=event.target;
      newEntries[index][name]=value;
      console.log(newEntries)
      setExperinceList(newEntries);
  }

  const AddNewExperience=()=>{
  
      setExperinceList([...experinceList,{
          title:'',
          campanyName:'',
          city:'',
          state:'',
          startDate:'',
          endDate:'',
          workSummary:'',
      }])
  }

  const RemoveExperience=()=>{
      setExperinceList(experinceList=>experinceList.slice(0,-1))
  }

  const handleRichTextEditor=(e,name,index)=>{
      const newEntries=experinceList.slice();
      newEntries[index][name]=e.target.value;
     
      setExperinceList(newEntries);
  }

  useEffect(()=>{
      console.log('experinceList updated:', experinceList);
      setResumeInfo({
          ...resumeInfo,
          Experience:experinceList
      });
   
  },[experinceList]);


  const onSave = async () => {
      setLoading(true);
    
      try {
        const data = {
          data: {
            Experience: experinceList.map(({ id, ...rest }) => rest),
          },
        };
    
        const resp = await GlobalApi.UpdateResumeDetail(params?.resumeid, data);
        console.log(resp);
        setLoading(false);
        toast.success('Details updated');
      } catch (error) {
        setLoading(false);
        console.error('API error:', error);
        if (error.response) {
          // Handle specific server errors based on HTTP status codes
          if (error.response.status === 404) {
            toast.error('Resume not found');
          } else {
            toast.error('Server Error, Please try again!');
          }
        } else if (error.request) {
          // Handle network errors
          toast.error('Network Error, Please check your connection');
        } else {
          // Handle other errors
          toast.error('An error occurred, Please try again later');
        }
      }
    };
   
return (
  <div className="ring-gray-100 rounded-md border-t-8 shadow-md dark:bg-gray-900 dark:ring-gray-800 p-4 ">
    <h2 className="font-semibold text-lg">Professional Experiences</h2>
    <p className="font-extralight">Add your experiences for your job as {resumeInfo?.jobTitle} </p>
      <div>
          {experinceList.map((item,index)=>(
              <div key={index}>
                  <div className='grid grid-cols-2 gap-4   my-4 text-sm font-extralight'>
                      <div>
                          
                          <Input name="title" placeholder='Position Title'
                          onChange={(event)=>handleChange(index,event)}
                          defaultValue={item?.title}
                          />
                      </div>
                      <div>
                          
                          <Input name="campanyName" placeholder='Campany Name'
                          onChange={(event)=>handleChange(index,event)}
                          defaultValue={item?.campanyName} />
                      </div>
                      <div>
                          
                          <Input name="city" placeholder='City'
                          onChange={(event)=>handleChange(index,event)} 
                          defaultValue={item?.city}/>
                      </div>
                      <div>
                          
                          <Input name="state" placeholder='State'
                          onChange={(event)=>handleChange(index,event)}
                          defaultValue={item?.state}
                           />
                      </div>
                      <div>
                          <label className='text-sm '>Start Date</label>
                          <Input type="date"  
                          name="startDate" 
                          onChange={(event)=>handleChange(index,event)} 
                          defaultValue={item?.startDate}/>
                      </div>
                      <div>
                          <label className='text-xs'>End Date</label>
                          <Input type="date" name="endDate" 
                          onChange={(event)=>handleChange(index,event)} 
                          defaultValue={item?.endDate}
                          />
                      </div>
                      <div className='col-span-2'>
                         {/* Work Summery  */}
                         <RichTextEditor
                         index={index}
                         defaultValue={item?.workSummary}
                         onRichTextEditorChange={(event)=>handleRichTextEditor(event,'workSummary',index)}  />
                      </div>
                  </div>
              </div>
          ))} <div className='flex justify-between'>
          <div className='flex gap-2'>
          <Button variant="outline" onClick={AddNewExperience} className="text-primary"> + Add More</Button>
          <Button variant="outline" onClick={RemoveExperience} className="text-primary"> - Remove</Button>

          </div>
          <Button disabled={loading} onClick={()=>onSave()}>
          {loading?<LoaderCircle className='animate-spin' />:'Save'}    
          </Button>
      </div>    
      </div>

      </div>

)
}
export default Experience;
