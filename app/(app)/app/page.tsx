"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { PiStudentBold } from "react-icons/pi";

const page = () => {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <section className="flex flex-col gap-3">
          <div className="flex gap-4 items-center">
            <Image
              src={session.user?.image || "/assets/logo.jpg"}
              width={80}
              height={80}
              alt="logo"
              className="rounded-full"
            />
            <div className="">
              <h6 className="font-bold text-lg ">{session?.user?.name}</h6>
              <h6 className="font-thin text-sm ">{session?.user?.email}</h6>
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
                <h6 className="text-sm text-slate-400">
                  {session?.user?.name}
                </h6>
                <p className="border p-1 rounded border-slate-500">
                  {session.user?.name}
                </p>
              </div>
              <div className="">
                <h6 className="text-sm text-slate-400">Username</h6>
                <p className="border p-1 rounded border-slate-500 min-w-44">
                  {session?.user?.username}
                </p>
              </div>
            </div>
            <div className="flex flex-col  gap-4">
              <div className="">
                <h6 className="text-sm text-slate-400">Department</h6>
                <p className="border p-1 rounded border-slate-500">
                  {session?.user?.department}
                </p>
              </div>
              <div className="">
                <h6 className="text-sm text-slate-400">Level</h6>
                <div
                  className="bg-primary"
                  style={{ width: `${(session?.user?.level / 500) * 100}%` }}
                >
                  <p className="border p-1 rounded ">
                    {session?.user?.level}
                  </p>
                </div>
              </div>
            </div>
            {/* <h4 className="text-2xl">Other User Info can Go in here</h4> */}
            <div className="bg-primary p-2 flex rounded w-fit">
              Edit Profile
            </div>
          </div>
        </section>
      ) : (
        <div className="">Loading.....</div>
      )}
    </>
  );
};

export default page;
