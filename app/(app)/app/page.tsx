import Image from "next/image";
import React from "react";
import { PiStudentBold } from "react-icons/pi";

const page = () => {
  return (
    <section className="flex flex-col gap-3">
      {/* <div className="flex flex-col justify-center items-center gap-2 border border-slate-700 w-fit p-3">
        <h6 className="font-bold text-lg text-center">Okeke Emmanuel</h6>
        <h6 className="font-thin text-sm text-center">eokeke320@gmail.com</h6>
        <Image
          src="/assets/logo.jpg"
          width={80}
          height={80}
          alt="logo"
          className="rounded-full"
        />
        <div className="p-1 bg-primary rounded">Upload Photo </div>
        <p className="text-sm text-slate-500 text-center">
          Member since 2nd February , 2023
        </p>
      </div> */}
      <div className="flex gap-4 items-center">
        <Image
          src="/assets/logo.jpg"
          width={80}
          height={80}
          alt="logo"
          className="rounded-full"
        />
        <div className="">
          <h6 className="font-bold text-lg ">Emma Js</h6>
          <h6 className="font-thin text-sm ">eokeke320@gmail.com</h6>
          <h6 className="font-thin text-sm flex items-center">
            Student <PiStudentBold className="bg-White" />
          </h6>

          <p className="text-sm text-slate-500 text-center">
            Member since 2nd February , 2023
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:w-[50%]  items- gap-4 border border-slate-700 w- p-3">
        <h4 className="font-bold text-lg">Profile</h4>

        <div className="flex flex-col  gap-4">
          <div className="">
            <h6 className="text-sm text-slate-400">Full Name</h6>
            <p className="border p-1 rounded border-slate-500">
              Okeke Emmanuel Arinzechukwu
            </p>
          </div>
          <div className="">
            <h6 className="text-sm text-slate-400">Username</h6>
            <p className="border p-1 rounded border-slate-500 min-w-44">
              Emma Js
            </p>
          </div>
        </div>
        <div className="flex flex-col  gap-4">
          <div className="">
            <h6 className="text-sm text-slate-400">Department</h6>
            <p className="border p-1 rounded border-slate-500">
              Mechanical Engineering
            </p>
          </div>
          <div className="">
            <h6 className="text-sm text-slate-400">Level</h6>
            <div className="bg-primary w-[20%]">
              <p className="border p-1 rounded border-slate-500 min-w-44 "></p>
            </div>
          </div>
        </div>
        {/* <h4 className="text-2xl">Other User Info can Go in here</h4> */}
        <div className="bg-primary p-2 flex rounded w-fit">Edit Profile</div>
      </div>
    </section>
  );
};

export default page;
