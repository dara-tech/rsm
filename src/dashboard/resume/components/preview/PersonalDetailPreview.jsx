import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';


const PersonalDetailPreview = ({ resumeInfo }) => {
  return (
    <div>
      <h2
        className="font-extrabold text-2xl"
        style={{ color: resumeInfo?.themeColor }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      <h2 className="font-extralight text-sm ">{resumeInfo?.jobTitle}</h2>

      <div className="mt-2 p-2 flex flex-col justify-between gap-2 ring-1 ring-gray-200 dark:ring-gray-900 dark:bg-gray-800 rounded-md shadow-md">
        <h2 className="font-extralight text-sm flex flex-row relative gap-2 items-center "><FaMapMarkerAlt style={{ color: resumeInfo?.themeColor }} className=" rounded-full px-1 py-1 w-5 h-5"/>{resumeInfo?.address}</h2>
        <h2 className="font-extralight text-sm flex flex-row relative gap-2 items-center"><FaPhone style={{ color: resumeInfo?.themeColor }} className=" rounded-full px-1 py-1 w-5 h-5"/>{resumeInfo?.phone}</h2>
        <h2 className="font-extralight text-sm flex flex-row relative gap-2 items-center"><FaEnvelope style={{ color: resumeInfo?.themeColor }} className=" rounded-full px-1 py-1 w-5 h-5"/>{resumeInfo?.email}</h2>
      </div>
      <div className="mt-4 mb-2 border-2 rounded-full" style={{borderColor:resumeInfo?.themeColor}}>
      </div>
    </div>
  );
};

export default PersonalDetailPreview;
