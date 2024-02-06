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

const All = () => {
  const courses: Course[] = [
    {
      img: "/assets/course.jpeg",
      title: "Control System Engineering",
      description:
        "Control System Engineering is a branch of engineering that applies automatic control theory to design systems with desired behaviors in control environments. The discipline of controls overlaps and is usually taught along with electrical engineering at many institutions around the world.",
      star: "4.0",
      ratings: "15,000",
    },
    {
      img: "/assets/course.jpeg",
      title: "Circuit Theory II",
      description:
        "LC Network Synthesis, Two Port Networks, Network Functions, Resonance, Filters, Transmission Lines, Waveguides, Antennas, Microwave Engineering, Radar Systems, Optical Fiber Communication, Satellite Communication, Mobile Communication, Digital Communication, Data Communication, and Computer Networks.",
      star: "4.0",
      ratings: "15,000",
    },
    {
      img: "/assets/course.jpeg",
      title: "Applied Electricity 1",
      description:
        "Fundamental Concept of an Atom and Molecule, Electron Theory of Electricity, Static Electricity, Generation of Electricity, Ohm's Law, Kirchhoff's Law, Electrical Network, Electrical Measuring Instruments, Electrical Power, Electrical Wiring, and Electrical Safety. ",
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
            <div className=" md:flex hidden">
              <Image
                src={course.img}
                alt={course.title}
                height={200}
                width={200}
                layout=""
              />
            </div>
            <div className=" flex-1 text-sm flex flex-col gap-3">
              <h6 className="font-bold text-lg">{course.title}</h6>
              <p className="text-gray-500 max-w-52">{course.description}</p>

              <div className="flex justify-between flex-wrap">
                <div className="flex gap-2 items-center">
                  <p className="bg-pink-700 rounded p-1 text-[10px] flex items-center gap-3">
                    Download <PiDownloadSimple />
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

export default All;
