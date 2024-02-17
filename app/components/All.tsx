import Image from "next/image";
import React from "react";
import CourseCard from "./CourseCard";

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
      <div className="flex flex-col gap-10">
        {courses.map((course) => (
          <p>Hello World</p>
            // <CourseCard title={course.title} summary={'course.description'} />
       
        ))}
      </div>
    </>
  );
};

export default All;
