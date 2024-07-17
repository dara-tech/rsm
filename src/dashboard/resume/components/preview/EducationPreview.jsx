import React from 'react'

const EducationPreview = ({resumeInfo}) => {
  return (
    <div className='my-2'>
    <h2 className='font-bold text-center' style={{ color: resumeInfo?.themeColor }}>Educational</h2>
    <div className="mt-2 mb-2 border-2 rounded-full" style={{borderColor:resumeInfo?.themeColor}}></div>
    {/* Experience Retrieve Data */}
    {resumeInfo?.education.map((education,index)=>(
        <div key={index}>
          <h2 className='font-bold' style={{ color: resumeInfo?.themeColor }}>{education?.universityName}</h2>
          <h2 className='font-extralight'>{education?.degree} in {education?.major}, {education?.state}
          <span className='flex gap-2'><h2 className='font-bold'>Start Date : </h2>  {education?.startDate}<h2 className='font-bold'> to :</h2> {education?.currentlyWorking? "Present": education.endDate} </span>
          </h2>
          <p className='font-extralight gap-2'>
            <h2 className='font-bold'>Description :</h2>
            <div className='ring-1 ring-gray-100 dark:ring-gray-800 dark:bg-gray-800 shadow-md rounded-md p-2 mt-2 mb-2'>{education?.description}</div>
          </p>
        </div>
      ))}
    </div>
  )
}

export default EducationPreview