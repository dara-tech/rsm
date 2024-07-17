import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderPinwheel, LoaderCircle, Loader, NotebookPen } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import * as GlobalApi from "@/service/GlobalApi"; 
import { toast } from "sonner"
import { AIChatSession } from "@/service/AIModel";
import Modal from "@/components/Modal";
import Tooltip from "@/components/Tooltip";

const promptTemplate =
  "Job Title: {jobTitle}, Depending on job title give me a list of summaries for 3 experience levels: Pro Level, Mid Level, and Fresher Level in 3-4 lines in array format, with summary and experience_level field in JSON format.";

  const SummaryForm = ({ enableNext }) => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingSave, setLoadingSave] = useState(false);
    const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const params = useParams();
  
    const GenerateSummaryFromAI = async () => {
      setLoading(true);
      const prompt = promptTemplate.replace('{jobTitle}', resumeInfo?.jobTitle || "");
      try {
        const result = await AIChatSession.sendMessage(prompt);
        const response = await result.response.text();
        const parsedResponse = JSON.parse(response);
        setAiGeneratedSummaryList(parsedResponse);
        setIsModalOpen(true);
      } catch (error) {
        toast.error(`Failed to generate summary: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    
  
    useEffect(() => {
      if (summary) {
        setResumeInfo((prev) => ({ ...prev, summary }));
      }
    }, [summary, setResumeInfo]);
  
    const onSave = (e) => {
      e.preventDefault();
      setLoadingSave(true); // Use a separate loading state for save operation
    
      const data = {
        data: {
          summary: summary
        }
      };
    
      GlobalApi.UpdateResumeDetail(params?.resumeid, data)
        .then((resp) => {
          console.log(resp);
          enableNext(true); // Assuming this enables some next step upon successful save
          setLoadingSave(false);
          toast.success("Details updated"); // Use toast.success for success message
        })
        .catch((error) => {
          console.error("Failed to update details:", error);
          setLoadingSave(false); // Make sure to reset loading state on error
          toast.error(`Failed to update details: ${error.message}`); // Provide specific error message to user
        });
    };
    
    const handleSummarySelection = (selectedSummary) => {
      setSummary(selectedSummary);
      setAiGeneratedSummaryList([]); // Clear the suggestions after selection
      setIsModalOpen(false);
    };
  
    return (
      <div className="ring-gray-100 rounded-md border-t-8 shadow-md dark:bg-gray-900 dark:ring-gray-800 p-4 ">
        <h2 className="font-semibold text-lg">Summary</h2>
        <p className="font-extralight">Add Summary for your job as {resumeInfo?.jobTitle} </p>
        <form className="mt-4 flex flex-col gap-4" onSubmit={onSave}>
          <div className="flex flex-col gap-4">
            <Textarea
              placeholder="Add summary about your job"
              className="font-extralight resize-y-auto"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between">
            <Tooltip content="Generate AI summary">
              <Button
                className="text-center flex gap-1"
                type="button"
                onClick={GenerateSummaryFromAI}
                disabled={loading}
              >
                Generate
                <LoaderPinwheel className={`p-1 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </Tooltip>
            <Tooltip content="Save summary">
            
            </Tooltip>
            <Button type="submit"
                  disabled={loading}>
                      {loadingSave?<LoaderCircle className='animate-spin' />:'Save'}
                      </Button>
            
          </div><div className="flex items-center"><NotebookPen className="p-1 "/><p className="font-extralight text-sm text-red-600 mx-1">The job summary is generated according to the job title.</p></div>
        </form>
  
        {loading && (
          <div className="flex justify-center items-center mt-4">
            <Loader className="animate-spin" size={20} />
            <p className="ml-2">Generating summaries...</p>
          </div>
        )}
  
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {aiGeneratedSummaryList.length > 0 ? (
            <div className="p-4">
              <h2 className="font-bold text-2xl">AI Generated Summaries</h2>
              <h2 className="font-extralight">Suggestions</h2>
              {aiGeneratedSummaryList.map((item, index) => (
                <div key={index} className="mt-2">
                  <h3 className="font-bold">Level: {item.experience_level}</h3>
                  <p className="cursor-pointer font-extralight text-sm dark:ring-gray-600 ring-1 ring-gray-200 shadow-lg hover:shadow-sm rounded-md dark:bg-gray-800/70 mt-1 mb-1 p-2 px-2 "onClick={() => handleSummarySelection(item.summary)}>{item.summary}</p>
                  <Button className="mt-2" type="button" onClick={() => handleSummarySelection(item.summary)}>
                    Use this summary
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p>No summaries generated. Try again.</p>
          )}
        </Modal>
        
      </div>
    );
  };
export default SummaryForm;
