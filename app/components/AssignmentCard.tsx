import Link from "next/link";
import React, { useState } from "react";
import { BiSolidCalendar } from "react-icons/bi";
import { PiDownloadSimple } from "react-icons/pi";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@app/components/ui/dialog";
import { Input } from "@app/components/ui/input";
import { Label } from "@app/components/ui/label";
import { Button } from "@app/components/ui/button";
import { Textarea } from "@app/components/ui/textarea";
import { UploadButton, UploadDropzone } from "@utils/uploadthing";
import { FaRegFileAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

interface AssignmentCardProps {
  title: string;
  instruction: string;
  createdAt: string;
  course: string;
  submissionDate: string;
  pdf: string;
  _id: string;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({
  title,
  instruction,
  createdAt,
  course,
  submissionDate,
  pdf,
  _id,
}) => {
  const [titleEdit, setTitleEdit] = useState(title);
  const [instructionEdit, setInstructionEdit] = useState(instruction);
  const [fileEdit, setFileEdit] = useState(pdf);
  const [courseEdit, setCourseEdit] = useState(course);
  const [submissionDateEdit, setSubmissionDateEdit] = useState(submissionDate);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(e.target.value);
    setError("");
    setSuccess("");
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("id=", _id);
    console.log("formdata =", fileEdit, submissionDateEdit, fileEdit, _id);
    setLoading(true);

    try {
      const data = {
        title: titleEdit,
        instruction: instructionEdit,
        course: courseEdit,
        submissionDate: submissionDateEdit,
        pdf: fileEdit,
        id: _id,
      };

      const response = await fetch("/api/update", {
        method: "PATCH",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSuccess("changes saved successfully!");
      } else {
        setError("Update Failed");
      }
    } catch (error) {
      setError("Error occured while saving changes");
      console.error("Error saving changes", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCreatedAtDate = (createdAt: string) => {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    let suffix = "th";
    if (day === 1 || day === 21 || day === 31) suffix = "st";
    else if (day === 2 || day === 22) suffix = "nd";
    else if (day === 3 || day === 23) suffix = "rd";
    return `${day}${suffix} ${month}, ${year}`;
  };

  const formattedCreatedAt = formatCreatedAtDate(createdAt);
  const formattedSubmissionDate = formatCreatedAtDate(submissionDate);
  return (
    <div className="bg-black w-96 border rounded-md border-gray-500">
      <div className="bg-transparent rounded-md p-3 text-white flex-1 gap-2">
        <div className="flex-1 text-sm flex flex-col gap-4">
          <p className="">Course Code : {course}</p>
          <h6 className="font-bold text-lg">{title}</h6>
          <p className="text-[12px]">{instruction}</p>

          <div className="">
            <p className="text-[12px] flex items-center gap-3">
              <BiSolidCalendar />
              <span className="font-semibold">Uploaded On :</span>{" "}
              {formattedCreatedAt}
            </p>
            <p className="text-[12px] flex items-center gap-3">
              <BiSolidCalendar />
              <span className="font-semibold">Submission Deadline :</span>{" "}
              {formattedSubmissionDate}
            </p>
          </div>

          <div className="flex justify-between flex-wrap">
            <div className="flex gap-2 items-center">
              <Link href={pdf}>
                <p className="bg-pink-700 rounded p-1 text-[10px] flex items-center gap-3">
                  Download Assignment <PiDownloadSimple />
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="bg--700 hover:bg--700 hover:text-white border-none rounded p-1 text-xl flex items-center gap-3"
            variant="outline"
          >
            <MdEdit />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-slate-950 text-white">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form action="" onSubmit={handleEdit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={titleEdit}
                  onChange={(e) => handleInputChange(e, setTitleEdit)}
                  className="col-span-3 bg-transparent"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Course
                </Label>
                <Input
                  id="title"
                  value={courseEdit}
                  onChange={(e) => handleInputChange(e, setCourseEdit)}
                  className="col-span-3 bg-transparent"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Submission Date
                </Label>
                <input
                  type="date"
                  id="title"
                  value={submissionDateEdit}
                  onChange={(e) => handleInputChange(e, setSubmissionDateEdit)}
                  className="col-span-3 bg-transparent"
                />
              </div>
              <div className="grid grid-cols-4 items- gap-4">
                <Label htmlFor="username" className="text-right">
                  Instruction
                </Label>
                <Textarea
                  id="username"
                  value={instructionEdit}
                  rows={10}
                  onChange={(e) => handleInputChange(e, setInstructionEdit)}
                  className="col-span-3 bg-transparent"
                />
              </div>
              {fileEdit ? (
                <div className="flex justify-between w-full ">
                  <div className="">
                    <Link
                      href={fileEdit}
                      className="flex items-center gap-5  text-primary"
                    >
                      <FaRegFileAlt /> View Pdf
                    </Link>
                  </div>
                  <button
                    onClick={() => setFileEdit("")}
                    type="button"
                    className="flex  text-slate-50 text-sm"
                  >
                    <span>
                      <MdEdit />
                    </span>
                  </button>
                </div>
              ) : (
                <UploadButton
                  // className="bg-black border w-64 h-56 border-slate-400 border-dashed "
                  endpoint="pdfUploader"
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res);
                    setFileEdit(res[0].url);
                    console.log("Upload Completed");
                  }}
                  onUploadError={(error: Error) => {
                    setError(
                      "Something Wrong with uploaded file(check file size/type)"
                    );
                    // Do something with the error.
                    console.log(`ERROR! ${error.message}`);
                  }}
                />
              )}
            </div>
            <DialogFooter>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
              {loading ? (
                <Button disabled type="submit" className="cursor-wait">
                  updating...
                </Button>
              ) : (
                <Button type="submit">save changes</Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssignmentCard;
