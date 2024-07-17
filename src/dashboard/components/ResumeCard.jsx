import { NotebookIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 as Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import * as GlobalApi from "@/service/GlobalApi";
import { Ellipsis } from "lucide-react"; // Add this if not already done

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const ResumeCardItem = ({ resume, refreshData }) => {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(
      (resp) => {
        console.log(resp);
        toast("Resume Deleted!");
        refreshData();
        setLoading(false);
        setOpenAlert(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  // console.log('Resume Card Item:', resume); // Debug log

  return (
<div
  style={{
    borderTopColor: resume?.themeColor,
  }}
  className="mt-4 p-4 py-4 shadow-md hover:shadow-sm justify-center items-center ring-1 ring-gray-100 dark:bg-gray-950 dark:ring-gray-800 dark:shadow-gray-950 dark:hover:bg-gray-900 rounded-lg cursor-pointer h-[280px] transition-transform transform hover:scale-105 border-t-4"
>


      <div className="flex flex-col place-items-end">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                navigation("/my-resume/" + resume.documentId + "/view")
              }
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigation("/my-resume/" + resume.documentId + "/view")
              }
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
        <div className="flex place-items-center justify-center">
          <h2 className="font-semibold text-lg text-center text-gray-800 dark:text-gray-200">
            {resume.title}
          </h2>
        </div>
        <p className=" text-center font-extralight text-sm">
          {resume.firstName} {resume.lastName}
        </p>

        <div className="flex justify-center items-center mt-8">
          <Button>Open</Button>
        </div>
      </Link>

      <AlertDialog open={openAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenAlert(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} disabled={loading}>
              {loading ? <Loader2Icon className="animate-spin" /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ResumeCardItem;
