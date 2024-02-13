import { usePathname } from "next/navigation";
import React from "react";
import { PiDownloadSimple } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";

interface CourseCardProps {
  title: string;
  description: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description }) => {
  const pathname = usePathname();
  const admin = pathname.includes("/admin");

  return (
    <div>
      <div
        key={title}
        className="bg-black flex md:w-[75%] mdflex-row p-1 gap-2"
      >
        <div className="flex-1 text-sm flex flex-col gap-3">
          <h6 className="font-bold text-lg">{title}</h6>
          <p className="text-gray-500">{description}</p>

          <div className="flex justify-between flex-wrap">
            {!admin ? (
              <div className="flex gap-2 items-center">
                <p className="bg-pink-700 rounded p-1 text-[10px] flex items-center gap-3">
                  Download <PiDownloadSimple />
                </p>
              </div>
            ) : (
              <p className="text-[12px] flex items-center gap-3">
                <SlCalender />
                <span className="font-semibold">Uploaded On :</span> 24th
                February , 2024
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
