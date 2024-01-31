import Image from "next/image";
import React from "react";
import { PiDownloadSimple } from "react-icons/pi";


interface Course {
  img: string;
  title: string;
  description: string;
  star: string;
  ratings: string;
}

const Upcoming = () => {
  const courses: Course[] = [
    {
      img: "/assets/course.jpeg",
      title: "Introduction To Mech Eng ",
      description:
        "Foundations of Engineering and the architecture of machines",
      star: "4.0",
      ratings: "15,000",
    },
    {
      img: "/assets/course.jpeg",
      title: "Introduction To Mech Eng and Engineering drawing , statistics and chemical themodynamics",
      description:
        "Foundations of Engineering and the architecture of machines",
      star: "4.0",
      ratings: "15,000",
    },
    {
      img: "/assets/course.jpeg",
      title: "Introduction To Mech Eng",
      description:
        "Foundations of Engineering and the architecture of machines",
      star: "4.0",
      ratings: "15,000",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-4">
        {courses.map((course) => (
          <div
            key={course.title}
            className=" bg-black flex flex- mdflex-row p-1 gap-2 md:max-w-[500px] "
          >
            <div className="min-w-52  relative md:flex hidden">
              <Image
                src={course.img}
                alt={course.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="text-sm flex flex-col gap-3">
              <h6 className="font-bold text-lg">{course.title}</h6>
              <p className="text-gray-500 max-w-52">{course.description}</p>

              <div className="flex justify-between flex-wrap">
                <div className="flex gap-2 items-center">
                  <p className="bg-pink-700 rounded p-1 text-[10px] flex items-center gap-3">
                    Unavailable 
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Upcoming;
