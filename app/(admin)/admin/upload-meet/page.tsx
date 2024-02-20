import UploadAssignment from "@app/components/UploadAssignment";
import UploadMeet from "@app/components/UploadMeet";
import React from "react";

const page = () => {
  return (
    <div>
      <h6 className="text-2xl font-bold mb-4">Upload Google Meet Link</h6>

      <UploadMeet />
    </div>
  );
};

export default page;
