import React from "react";
import Link from "next/link";
import Image from "next/image";

const HomePage = () => {
  const flyingIcons = [
    { name: "", icon: "/assets/bridge.png" },
    { name: "", icon: "/assets/civil.png" },
    { name: "", icon: "/assets/eletric.png" },
    { name: "", icon: "/assets/helmet.png" },
    { name: "", icon: "/assets/react.png" },
    { name: "", icon: "/assets/rocket.png" },
  ];
  return (
    <div className="min-h-screen flex flex-col justify-between relative">

      <div className="w-full h-[600px] absolute rounded-[50%] -z-10">
        {flyingIcons.map((icon) => (
          <div className="circle-item">
            <Image
              src={icon.icon}
              width={60}
              height={90}
              alt="logo"
              className="rounded-full"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 items-center justify-center mt-7 ">
        <h3 className="font-semibold lg:text-4xl text-3xl text-center">
          <span className="text-purple-900 ">ELH</span> Accelerating
          <br /> Technological Minds
        </h3>
        <p className="text-slate-500 text-center">
          Where Engineering students converge to improve their technological
          ingenuity and <br className="md:block sm:hidden" /> enhance their
          research skills.
        </p>
        <Link
          href="/sign-up"
          className="bg-white text-black font-semibold rounded p-1"
        >
          Register
        </Link>
      </div>

      <div className="flex flex-wrap gap-7 justify-center text-sm">
        <p className="">
          90 000 + <span className="font-semibold">Students</span>
        </p>
        <p className="">
          1000 + <span className="font-semibold">Lecturers</span>
        </p>
        <p className="">
          50+ <span className="font-semibold">Courses</span>
        </p>
      </div>
    </div>
  );
};

export default HomePage;
