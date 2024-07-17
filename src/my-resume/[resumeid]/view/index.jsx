import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import ResumePreview from '@/dashboard/resume/components/ResumePreview';
import React, { useEffect, useState, useRef } from 'react';
import * as GlobalApi from '@/service/GlobalApi';
import { useParams } from 'react-router-dom';
import { RWebShare } from 'react-web-share';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeid } = useParams();
  const [loading, setLoading] = useState(true);
  const resumeRef = useRef();
  const hiddenResumeRef = useRef();

  useEffect(() => {
    const fetchResumeInfo = async () => {
      try {
        const response = await GlobalApi.GetResumeById(resumeid);
        setResumeInfo(response.data);
      } catch (error) {
        console.error("Error fetching resume info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeInfo();
  }, [resumeid]);

  const handleDownload = async () => {
    try {
      const element = hiddenResumeRef.current;
      if (!element) {
        console.error("Resume element not found");
        return;
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        width: element.scrollWidth,
        height: element.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let position = 0;
      let heightLeft = imgHeight;

      while (heightLeft > 0) {
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, Math.min(heightLeft, pdfHeight));
        heightLeft -= pdfHeight;
        if (heightLeft > 0) {
          position = -heightLeft;  // Move position up for next page
          pdf.addPage();
        }
      }

      pdf.save(`${resumeInfo?.firstName}_${resumeInfo?.lastName}_Resume.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
          <h2 className='text-center text-2xl font-medium'>
            Congrats! Your Ultimate AI-generated Resume is ready!
          </h2>
          <p className='text-center text-gray-400'>
            Now you are ready to download your resume and share the unique URL with your friends and family.
          </p>
          <div className='flex justify-between mt-4 my-10  md:mx-20 lg:mx-36'>
            <Button onClick={handleDownload}>Download</Button>
            <RWebShare
              data={{
                text: "Hello Everyone, this is my resume! Please open the URL to view it.",
                url: `${import.meta.env.VITE_BASE_URL}/my-resume/${resumeid}/view`,
                title: `${resumeInfo?.firstName} ${resumeInfo?.lastName} Resume`,
              }}
              onClick={() => console.log("Shared successfully!")}
            >
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>
      <div className='my-10 mx-10 md:mx-20 lg:mx-36 flex justify-center'>
        <div id="print-area" ref={resumeRef} style={{ width: '210mm', minHeight: '297mm', backgroundColor: 'white', padding: '0mm', boxSizing: 'border-box' }}>
          {loading ? (
            <div className='mt-4 rounded-lg bg-slate-200 animate-pulse h-40'></div>
          ) : (
            <ResumePreview />
          )}
        </div>
      </div>
      <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', width: '270mm', minHeight: '297mm', backgroundColor: 'white', padding: '0mm', boxSizing: 'border-box' }} ref={hiddenResumeRef}>
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
