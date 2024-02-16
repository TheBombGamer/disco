import React from "react";
import { PiDownloadSimple } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";

const AssignmentCard = () => {
  return (
    <div className="bg-black w-96 border rounded-md border-gray-500">
      <div className=" bg-transperent rounded-md p-3  text-white flexp-1 gap-2 ">
        <div className=" flex-1 text-sm flex flex-col gap-4">
          <p className="">Course Code : ENG 104</p>
          <h6 className="font-bold text-lg">
            Orthographic Projection and Geometric Conventions
          </h6>
          <p className="text-[12px]">
            {" "}
            Make a copy of the 3 dimentional drawing in the file bellow and
            represnt in an autographic Projection
          </p>

          <div className="">
            <p className="text-[12px] flex items-center gap-3">
              <SlCalender />
              <span className="font-semibold">Uploaded On :</span> 24th
              February , 2024
            </p>
            <p className="text-[12px] flex items-center gap-3">
              <SlCalender />
              <span className="font-semibold">Submission Deadline :</span> 24th
              February , 2024
            </p>
          </div>

          <div className="flex justify-between flex-wrap">
            <div className="flex gap-2 items-center">
              <p className="bg-pink-700 rounded p-1 text-[10px] flex items-center gap-3">
                Download Assignment <PiDownloadSimple />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
