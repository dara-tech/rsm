import React from 'react'

const SummaryPreview = ({resumeInfo}) => {
  return (
   <p className='font-extralight'>
    {resumeInfo?.summary}
   </p>
  )
}

export default SummaryPreview