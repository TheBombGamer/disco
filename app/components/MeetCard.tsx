import Link from "next/link";
import React from "react";
import { BiSolidCalendar } from "react-icons/bi";
import { PiDownloadSimple } from "react-icons/pi";

interface MeetCardProps {
  title: string;
  createdAt: string;
  course: string;
  link: string;
}

const MeetCard: React.FC<MeetCardProps> = ({
  title,
  link,
  createdAt,
  course,
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
  //   const formattedSubmissionDate = formatCreatedAtDate(submissionDate);
  return (
    <div className="bg-black w-96 border rounded-md border-gray-500">
      <div className="bg-transparent rounded-md p-3 text-white flex-1 gap-2">
        <div className="flex-1 text-sm flex flex-col gap-4">
          {course && <p className="">Course Code : {course}</p>}
          <h6 className="font-bold text-lg">{title}</h6>

          <div className="flex justify-between flex-wrap">
            <div className="flex gap-2 items-center">
              <Link href={link}>
                <p className="bg-pink-700 rounded p-1 text-md flex items-center gap-3">
                  Join Meet
                </p>
              </Link>
            </div>
          </div>
          <div className="">
            <p className="text-[12px] flex items-center gap-3">
              <BiSolidCalendar />
              <span className="font-semibold">Created On :</span>{" "}
              {formattedCreatedAt}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetCard;
