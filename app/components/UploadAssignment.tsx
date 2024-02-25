"use client";

import { UploadDropzone } from "@utils/uploadthing";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const UploadAssignment = () => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(e.target.value);
  };

  const [file, setFile] = useState("");
  const [course, setCourse] = useState("");
  const [title, setTitle] = useState("");
  const [instruction, setInstruction] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");

  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const {data : session} = useSession()
  const id = session?.user.id
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Collect form data
    const formData = {
      course,
      title,
      instruction,
      submissionDate,
      file,
      id
      
    };

    try {
      const response = await fetch("/api/assignment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Upload successful");

        setFile("");
        setTitle("");
        setSubmissionDate("");
        setInstruction("");
        setCourse("");
        setSuccess('Assignment Uploaded Successfully')
      } else {
        console.error("Upload failed");
        setError('Something Went wrong')
      }
    } catch (error) {
      console.error("Error uploading:", error);
      setError('Error Uploading(check connection')
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-fit  flex flex-col gap-5">
      {/* <p className="text-sm">Choose File or Drag and Drop to Upload </p> */}

      <div className="  py-2">
        <form
          className="flex flex-col gap-4 items-start  rounded-lg  border p-4 border-slate-500"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col lg:flex-row gap-5 ">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <h6 className="text-slate-400">Course Code</h6>

                <input
                  value={course}
                  type="text"
                  className=" bg-transparent border border-gray-500 rounded-sm outline-none p-1 text-sm"
                  onChange={(e) => handleInputChange(e, setCourse)}
                />
              </div>
              <div className="flex flex-col">
                <h6 className="text-slate-400">Title</h6>

                <input
                  value={title}
                  type="text"
                  className=" bg-transparent border border-gray-500 rounded-sm outline-none p-1 text-sm"
                  onChange={(e) => handleInputChange(e, setTitle)}
                />
              </div>

              <div className="flex flex-col">
                <h6 className="text-slate-400">Instruction</h6>

                <textarea
                  value={instruction}
                  onChange={(e) => handleInputChange(e, setInstruction)}
                  rows={5}
                  className=" bg-transparent border border-gray-500 rounded-sm"
                />
              </div>
              <div className="flex flex-col">
                <h6 className="text-slate-400">Submission Deadline</h6>

                <input
                  value={submissionDate}
                  onChange={(e) => handleInputChange(e, setSubmissionDate)}
                  type="date"
                  className=" bg-transparent border border-gray-500 rounded-sm"
                />
              </div>
            </div>
            {file ? (
              <div className="flex justify-between w-full ">
                <div className="">
                  <Link
                    href={file}
                    className="flex items-center gap-5  text-primary"
                  >
                    <FaRegFileAlt /> View Pdf
                  </Link>
                </div>
                <button
                  onClick={() => setFile("")}
                  type="button"
                  className="flex  text-slate-50 text-sm"
                >
                  <span>
                    <MdEdit />
                  </span>
                </button>
              </div>
            ) : (
              <UploadDropzone
                className="bg-black border w-64 h-56 border-slate-400 border-dashed "
                endpoint="pdfUploader"
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  console.log("Files: ", res);
                  setFile(res[0].url);
                  console.log("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  setError('Something Wrong with Upload')
                  console.log(`ERROR! ${error.message}`);
                }}
              />
            )}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          {loading ? (
            <button type="submit" className="p-1 bg-primary rounded-lg cursor-wait">
              Uploading.....
            </button>
          ) : (
            <button type="submit" className="p-1 bg-primary rounded-lg ">
              Upload
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default UploadAssignment;
