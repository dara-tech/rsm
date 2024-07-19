import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import * as GlobalApi from "@/service/GlobalApi"; 
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const PersonalDetailForm = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  }, [params]);

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setResumeInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { data: formData };
    try {
      const resp = await GlobalApi.UpdateResumeDetail(params?.resumeid, data);
      console.log(resp);
      toast.success("Details saved successfully!");
      enableNext(true);
    } catch (error) {
      toast.error("Failed to save details. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ring-gray-100 rounded-md border-t-8 shadow-md dark:bg-gray-900 dark:ring-gray-800 p-4">
    
      <h2 className="font-semibold text-lg">Personal Detail</h2>
      <p className="font-extralight">Get started with the basic information</p>
      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <Input
              className="font-light dark:bg-gray-800"
              placeholder="First Name"
              name="firstName"
              defaultValue={resumeInfo?.firstName}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Input
              className="font-light dark:bg-gray-800"
              placeholder="Last Name"
              name="lastName"
              defaultValue={resumeInfo?.lastName}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <Input
              className="font-light dark:bg-gray-800"
              placeholder="Job Title"
              defaultValue={resumeInfo?.jobTitle}
              name="jobTitle"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <Input
              className="font-light dark:bg-gray-800"
              placeholder="Address"
              defaultValue={resumeInfo?.address}
              name="address"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Input
              className="font-light dark:bg-gray-800"
              placeholder="Phone"
              defaultValue={resumeInfo?.phone}
              name="phone"
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Input
              className="font-light dark:bg-gray-800"
              placeholder="Email"
              defaultValue={resumeInfo?.email}
              name="email"
              required
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>  
    </div>
  );
};

export default PersonalDetailForm;
