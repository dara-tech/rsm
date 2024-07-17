import React from "react";

const SkillPreview = ({ resumeInfo }) => {
  return (
    <div className="my-2">
      <h2
        className="font-bold text-center"
        style={{ color: resumeInfo?.themeColor }}
      >
        Skills
      </h2>
      <div
        className="mt-2 mb-2 border-2 rounded-full"
        style={{ borderColor: resumeInfo?.themeColor }}
      ></div>

<div className='grid grid-cols-2 gap-3 my-4'>
        {resumeInfo?.skills.map((skill,index)=>(
            <div key={index} className='flex items-center justify-between'>
                <h2 className='font-extralight text-sm '>{skill.name} {' '}</h2>
                <div className='h-2 bg-gray-200 w-[110px] rounded-full'>
                    <div className='h-2 '
                        style={{
                            backgroundColor:resumeInfo?.themeColor,
                            width:skill?.rating*20+'%'
                        }}
                    >
                    </div>
                </div>
            </div>
        ))}
    </div>
    </div>
  );
};

export default SkillPreview;
