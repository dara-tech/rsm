import React, { useContext, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle, Brain, NotebookPen } from "lucide-react";
import { AIChatSession } from "@/service/AIModel";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import Modal from "@/components/Modal"; // Assuming you have a Modal component
import Tooltip from "@/components/Tooltip"; // Assuming you have a Tooltip component

const PROMPT =
  'University: {University} Degree: {Degree} Major: {Major}, Depends on Degree University and Major give me list of summary for 3 list summary levels, Beginner Level Pro Level and Advance level in 3-4 lines in array format, With summary and Education_level Field in JSON Format';

const RichTextEditorfored = ({ onRichTextEditorChange, index, defaultValue }) => {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    const University = resumeInfo?.education[index]?.universiyName;
    const Degree = resumeInfo?.education[index]?.degree;
    const Major = resumeInfo?.education[index]?.major;
    
    // Corrected prompt string with placeholders matching variable names
    const prompt = PROMPT.replace('{University}', University).replace('{Degree}', Degree).replace('{Major}', Major);
    
    try {
      const result = await AIChatSession.sendMessage(prompt);
      const response = result.response.text();
      const parsedResponse = JSON.parse(response);
      setAiGeneratedSummaryList(parsedResponse);
      setIsModalOpen(true);
    } catch (error) {
      toast.error(`Failed to generate summary: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  

  const handleSummarySelection = (selectedSummary) => {
    setValue(selectedSummary.summary);
    setIsModalOpen(false);
  };

  

  return (
    <div>
      <ToastContainer/>
      <div className="flex justify-between my-2">
        <label className="text-2xl font-bold">Summary</label>
        <div className="flex gap-2">
          <Tooltip content="Generate AI Summary">
            <Button
              variant="outline"
              size="sm"
              onClick={GenerateSummaryFromAI}
              disabled={loading}
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <>
                  <Brain className="h-4 w-4 mx-1 " /> Generate from AI
                </>
              )}
            </Button>
          </Tooltip>
          {/* <Tooltip content="Save Summary">
            <Button
              variant="outline"
              size="sm"
              onClick={onSave}
              disabled={loading}
            >
              <NotebookPen className="h-4 w-4" /> Save
            </Button>
          </Tooltip> */}
        </div>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {aiGeneratedSummaryList.length > 0 ? (
          <div className="p-4">
            <h2 className="font-bold text-2xl">AI Generated Summaries</h2>
            {aiGeneratedSummaryList.map((item, index) => (
              <div key={index} className="mt-4">
                <h3 className="font-bold">Level: {item.position_level}</h3>
                <p
                  className="cursor-pointer font-extralight text-sm dark:ring-gray-600 ring-1 ring-gray-200 shadow-lg hover:shadow-sm rounded-md dark:bg-gray-800/70 mt-1 mb-1 p-2 px-2"
                  onClick={() => handleSummarySelection(item)}
                >
                  {item.summary}
                </p>
                <Button
                  className="mt-2"
                  type="button"
                  onClick={() => handleSummarySelection(item)}
                >
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

export default RichTextEditorfored;
