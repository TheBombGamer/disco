import All from "@app/components/All";
import Upload from "@app/components/Upload";
import React from "react";

const page = () => {
  return (
    <div>
      <h6 className="text-2xl font-bold mb-4">Upload Files</h6>

      <Upload />

      <h4 className="my-10 font-semibold"> Uploaded Courses</h4>

      <All />
    </div>
  );
};

export default page;
