
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SummaryPreview from "./preview/SummaryPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationPreview from "./preview/EducationPreview";
import SkillPreview from "./preview/SkillPreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

import React, { useContext } from "react";

const ResumePreview = () => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  return (
    <div
      className="h-full ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800 rounded-sm shadow-md border-t-8 p-10"
      style={{ borderColor: resumeInfo?.themeColor }}
    >
      {/* Personal Detail */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />
      {/* Summary */}
      <SummaryPreview resumeInfo={resumeInfo} />
      {/* Experience */}
      <ExperiencePreview resumeInfo={resumeInfo} />
      {/* Educational */}
      <EducationPreview resumeInfo={resumeInfo} />
      {/* Skill */}
      <SkillPreview resumeInfo={resumeInfo}/>
    </div>
  );
};

export default ResumePreview;
