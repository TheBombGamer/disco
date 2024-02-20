import Link from "next/link";
import React from "react";
import { BiSolidCalendar } from "react-icons/bi";
import { PiDownloadSimple } from "react-icons/pi";

interface AssignmentCardProps {
  title: string;
  instruction: string;
  createdAt: string;
  course: string;
  submissionDate: string;
  pdf: string;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({
  title,
  instruction,
  createdAt,
  course,
  submissionDate,
  pdf,
}) => {
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
    </div>
  );
};

export default AssignmentCard;
