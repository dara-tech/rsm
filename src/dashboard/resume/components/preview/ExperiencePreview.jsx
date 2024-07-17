import React from 'react'

const ExperiencePreview = ({resumeInfo}) => {
  return (
    <div className='my-2'>
      <h2 className='font-bold text-center' style={{ color: resumeInfo?.themeColor }}>Professional Experience</h2>
      <div className="mt-2 mb-2 border-2 rounded-full" style={{borderColor:resumeInfo?.themeColor}}></div>
      
      {/* Experience Retrieve Data */}
      {resumeInfo?.Experience.map((Experience,index)=>(
        <div key={index}>
          <h2 className='font-bold' style={{ color: resumeInfo?.themeColor }}>{Experience?.title}</h2>
          <h2 className='font-extralight'>{Experience?.campanyName}  {Experience?.city} {Experience?.state}
          <span className='flex gap-2'><h2 className='font-bold'>Start Date : </h2>  {Experience?.startDate}<h2 className='font-bold'> to :</h2> {Experience?.currentlyWorking?"Present":Experience.endDate} </span>
          </h2>
          <p className='font-extralight gap-2'>
            <h2 className='font-bold'>Responsible : </h2>
            <div className='ring-1 ring-gray-100 dark:ring-gray-800 dark:bg-gray-800 shadow-md rounded-md p-2 mt-2 mb-2'>
            <div dangerouslySetInnerHTML={{__html:Experience?.workSummary}}/>
            </div>
          </p>
        </div>
      ))}
    </div>
  )
}

export default ExperiencePreview