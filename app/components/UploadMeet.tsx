"use client";

import React, { useState } from "react";

const UploadMeet = () => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(e.target.value);
    setError("");
    setSuccess("")
  };

  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Collect form data
    const formData = {
      link,
      course,
      title,
    };

    try {
      const response = await fetch("/api/meet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Upload successful");
        setSuccess("Meet Link Uploaded Successfully");
        setLoading(false);

        setLink("");
        setTitle("");
        setCourse("");
      } else {
        console.error("Upload failed");
        setError("Something Went Wrong");
      }
    } catch (error) {
      console.error("Error uploading:", error);
      setError("Error Uploading Meet (check connection)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-full  p-3 flex flex-col gap-5">
      {/* <p className="text-sm">Choose File or Drag and Drop to Upload </p> */}

      <div className=" py-2 w-full">
        <form
          className="flex flex-col gap-4 items-start  rounded-lg  border p-4 border-slate-500 w-full"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col lg:flex-row gap-5 items-center w-full ">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-col w-fit">
                <h6 className="text-slate-400">Course Code (optional)</h6>

                <input
                  value={course}
                  type="text"
                  placeholder="Enter Course Code Here"
                  className=" bg-transparent border border-gray-500 rounded-sm outline-none p-2 text-sm w-"
                  onChange={(e) => handleInputChange(e, setCourse)}
                />
              </div>
              <div className="flex flex-col w-fit">
                <h6 className="text-slate-400">Title (optional)</h6>

                <input
                  value={title}
                  type="text"
                  placeholder="Enter Ttile Here"
                  className=" bg-transparent border border-gray-500 rounded-sm outline-none p-2 text-sm w-"
                  onChange={(e) => handleInputChange(e, setTitle)}
                />
              </div>
              <div className="flex flex-col w-full">
                <h6 className="text-slate-400">Link</h6>

                <input
                  value={link}
                  type="text"
                  placeholder="Enter Link Here"
                  className=" bg-transparent border border-gray-500 rounded-sm outline-none p-2 text-sm w-full"
                  onChange={(e) => handleInputChange(e, setLink)}
                  // required
                />
              </div>
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          {loading ? (
            <button
              disabled
              type="submit"
              className="p-1 bg-primary rounded-lg cursor-wait"
            >
              Uploading....
            </button>
          ) : (
            <button type="submit" className="p-1 bg-primary rounded-lg ">
              Upload Meet Link
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default UploadMeet;
