import { Loader2, PlusSquareIcon } from "lucide-react";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { CreateNewResume } from "@/service/GlobalApi";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddResume = () => {
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const [error, setError] = useState("");

  const onCreate = async () => {
    setLoading(true);
    setError("");

    try {
      const uuid = uuidv4();
      const data = {
        data: {
          title: resumeTitle,
          resumeid: uuid,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userName: user?.fullName,
        },
      };

      console.log('Creating resume with data:', data);

      const response = await CreateNewResume(data);

      console.log('Response from CreateNewResume:', response);

      if (response) {
        setLoading(false);
        // Additional success handling, e.g., close dialog
        console.log('Resume created successfully');
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred while creating the resume. Please try again.");
      console.error('Error in onCreate:', error);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="mt-4 mb-4 p-10 py-20 shadow-md hover:shadow-sm flex justify-center items-center ring-1 ring-gray-100 bg-gray-200 dark:bg-gray-950 dark:ring-gray-800 dark:shadow-gray-950 dark:hover:bg-gray-900 rounded-lg cursor-pointer h-[280px]">
            <PlusSquareIcon />
          </div>
        </DialogTrigger>
        <DialogContent className="rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-start">Create New Resume</DialogTitle>
            <DialogDescription>
              <p className="font-extralight text-start">Add title for new resume</p>
              <Input
                onChange={(e) => setResumeTitle(e.target.value)}
                className="mt-2 mb-2"
                placeholder="Ex. Full Stack Developer"
              />
            </DialogDescription>
            <div className="flex justify-end gap-4">
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <Button disabled={!resumeTitle || loading} onClick={onCreate}>
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <ToastContainer limit={1} />
    </div>
  );
};

export default AddResume;
