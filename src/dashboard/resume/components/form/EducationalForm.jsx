import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import * as GlobalApi from "@/service/GlobalApi"; 
import { toast } from "sonner";
import RichTextEditorfored from "@/dashboard/resume/components/RichTextEditorfored";

function Education() {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [educationalList, setEducationalList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  useEffect(() => {
    resumeInfo && setEducationalList(resumeInfo?.education);
  }, []);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    setEducationalList((prevList) =>
      prevList.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )
    );
  };

  const handleRichTextEditor = (e, name, index) => {
    const { value } = e.target;
    setEducationalList((prevList) =>
      prevList.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )
    );
  };

  const AddNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };
  const RemoveEducation = () => {
    setEducationalList((educationalList) => educationalList.slice(0, -1));
  };
  const onSave = async () => {
    setLoading(true);
  
    try {
      const data = {
        data: {
          education: educationalList.map(({ id, ...rest }) => rest),
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
  

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationalList,
    });
  }, [educationalList]);
  return (
    <div className="ring-gray-100 rounded-md border-t-8 shadow-md dark:bg-gray-900 dark:ring-gray-800 p-4 ">
      <h2 className="font-semibold text-lg">Education</h2>
      <p className="font-extralight">
        Add Education for your job as {resumeInfo?.jobTitle}{" "}
      </p>

      <div>
        {educationalList.map((item, index) => (
          <div>
            <div className="grid grid-cols-2 gap-4   my-4 text-sm font-extralight">
              <div className="col-span-2">
                <Input
                  name="universityName"
                  placeholder="University Name"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.universityName}
                />
              </div>
              <div>
                <Input
                  name="degree"
                  placeholder="Degree"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.degree}
                />
              </div>
              <div>
                <Input
                  name="major"
                  placeholder="Major"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.major}
                />
              </div>
              <div>
                <Input
                  type="date"
                  name="startDate"
                  placeholder="Start Date"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.startDate}
                />
              </div>
              <div>
                <Input
                  type="date"
                  name="endDate"
                  placeholder="End Date"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.endDate}
                />
              </div>
              <div className="col-span-2">
                {/* Work Summery  */}
                <RichTextEditorfored
                  index={index}
                  defaultValue={item.description}
                  onRichTextEditorChange={(e) =>
                    handleRichTextEditor(e, "description", index)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewEducation}
            className="text-primary"
          >
            {" "}
            + Add More{" "}
          </Button>
          <Button
            variant="outline"
            onClick={RemoveEducation}
            className="text-primary"
          >
            {" "}
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Education;
