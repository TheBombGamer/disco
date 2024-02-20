"use client";

import React, { useState } from "react";

const UploadMeet = () => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(e.target.value);
  };


  const [link, setLink] = useState("");


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Collect form data
    const formData = {
      link,
    };

    try {
      // Send a POST request to your backend API
      const response = await fetch("/api/meet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful upload
        console.log("Upload successful");
        // Clear form fields if needed
        setLink("");

      } else {
        // Handle upload error
        console.error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

  return (
    <div className=" w-full  p-3 flex flex-col gap-5">
      {/* <p className="text-sm">Choose File or Drag and Drop to Upload </p> */}

      <div className=" px-5 py-2 w-full">
        <form
          className="flex flex-col gap-4 items-start  rounded-lg  border p-4 border-slate-500 w-full"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col lg:flex-row gap-5 items-center w-full ">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-col w-full">
                <h6 className="text-slate-400">Link</h6>

                <input
                  value={link}
                  type="text"
                  placeholder="Enter Link Here"
                  className=" bg-transparent border border-gray-500 rounded-sm outline-none p-2 text-sm w-full"
                  onChange={(e) => handleInputChange(e, setLink)}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="p-1 bg-primary rounded-lg ">
            Upload Meet Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadMeet;
