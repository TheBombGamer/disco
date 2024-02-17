import { usePathname } from "next/navigation";
import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { PiDownloadSimple } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";

interface CourseCardProps {
  title: string;
  summary: string;
  createdAt: string; // Assuming createdAt is a string
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  summary,
  createdAt,
}) => {
  const pathname = usePathname();
  const admin = pathname && pathname.includes("/admin");

  // Function to format createdAtDate to the desired format
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

  return (
    <div>
      <div
        key={title}
        className="bg-black flex md:w-[75%] mdflex-row p-1 gap-2"
      >
        <div className="flex-1 text-sm flex flex-col gap-3">
          <h6 className="font-bold text-lg">{title}</h6>
          <p className="text-gray-500">{summary}</p>

          <div className="flex justify-between flex-wrap">
            {!admin ? (
              <div className="flex gap-2 items-center">
                <p className="bg-pink-700 rounded p-1 text-[10px] flex items-center gap-3">
                  Download <PiDownloadSimple />
                </p>
              </div>
            ) : (
              <>
                <div className="flex gap-2 items-center">
                  <p className="bg-pink-700 rounded p-1 text-[10px] flex items-center gap-3">
                    Delete <MdDeleteForever />
                  </p>
                </div>
                <p className="text-[12px] flex items-center gap-3">
                  <SlCalender />
                  <span className="font-semibold">Uploaded On :</span>{" "}
                  {formattedCreatedAt}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
