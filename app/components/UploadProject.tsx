"use client";

import { UploadButton, UploadDropzone } from "@utils/uploadthing";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";


type SetRefreshFunction = React.Dispatch<React.SetStateAction<boolean>>;

interface UploadProps {
  setRefresh: SetRefreshFunction;
}

const UploadProject: React.FC<UploadProps> = ({ setRefresh }) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(e.target.value);
    setError('')
    setSuccess('')
  };

  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      file,
      title,
      summary,
    };

    try {
      const response = await fetch("/api/project", {
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
        setSummary("");
        setSuccess("Upload Successfull ");
        setLoading(false);
        setRefresh(prevRefresh => !prevRefresh)

      } else {
        console.error("Upload failed");
        setError("Something Went Wrong");
      }
    } catch (error) {
      console.error("Error uploading:", error);
      setError("Error Uploading(check connection)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" md:w-fit w-full  flex flex-col gap-5">
      {/* <p className="text-sm">Choose File or Drag and Drop to Upload </p> */}

      <div className="  py-2">
        <form
          className="flex flex-col gap-4 items-start  rounded-lg  border p-4 border-slate-500"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col lg:flex-row gap-5  w-full">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <h6 className="text-slate-400">Title</h6>

                <input
                  value={title}
                  type="text"
                  placeholder="Enter Title Here"
                  className=" bg-transparent border border-gray-500 rounded-sm outline-none p-1 text-sm"
                  onChange={(e) => handleInputChange(e, setTitle)}
                />
              </div>

              <div className="flex flex-col">
                <h6 className="text-slate-400">Summary</h6>

                <textarea
                  value={summary}
                  rows={5}
                  onChange={(e) => handleInputChange(e, setSummary)}
                  placeholder="Enter Summary Here"
                  className=" bg-transparent border border-gray-500 rounded-sm outline-none  p-1 text-sm"
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
              <>
              <UploadDropzone
                className="bg-black border w-64 h-56 border-slate-400 border-dashed hidden md:flex"
                endpoint="pdfUploader"
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  console.log("Files: ", res);
                  setFile(res[0].url);
                  console.log("Upload Completed");
                }}
                
                onUploadError={(error: Error) => {
                  setError(
                    "Something Wrong with uploaded file(check file size/type/connection) "
                    );
                    // Do something with the error.
                    console.log(`ERROR! ${error.message}`);
                  }}
                  />
              <UploadButton
                className="bg-  w-64 h-20 border-slate-400  md:hidden "
                endpoint="pdfUploader"
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  console.log("Files: ", res);
                  setFile(res[0].url);
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
            </>
            )}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          {loading ? (
            <button
            disabled
              type="submit"
              className="p-1 bg-primary rounded-lg cursor-wait"
            >
              Uploading...
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

export default UploadProject;
