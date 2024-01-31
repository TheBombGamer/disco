"use client";

import All from "@app/components/All";
import Live from "@app/components/Live";
import Upcoming from "@app/components/Upcoming";
import Image from "next/image";
import React, { useState } from "react";

const page = () => {
  const [currentTab, setCurrentTab] = useState("All");
  const tabs = [
    {
      name: "All",
      component: <All />,
    },
    {
      name: "Live",
      component: <Live />,
    },
    {
      name: "Upcoming",
      component: <Upcoming />,
    },
  ];
  return (
    <section className="flex flex-col gap-4">
      <h6 className="font-bold text-2xl">Courses</h6>
      <div className="flex gap-4 flex-col lg:flex-row">
        <div className="flex flex-col gap-6">
          <div className="flex gap-10">
            {tabs.map((tab) => (
              <div className="flex" key={tab.name}>
                <span
                  className={`${
                    currentTab === tab.name
                      ? "font-bold text-white"
                      : "text-slate-500"
                  } cursor-pointer transition-all`}
                  onClick={() => setCurrentTab(tab.name)}
                >
                  <h5 className="">{tab.name}</h5>
                </span>
              </div>
            ))}
          </div>
          <div className="">
            {tabs.map((tab) =>
              tab.name === currentTab ? (
                <div key={tab.name}>{tab.component}</div>
              ) : null
            )}
          </div>
        </div>
        <div className="flex gap-6 flex-col">
          <h6 className="font-bold text-white">Tutors</h6>
          <div className="bg-black p-2 w-full  ">
            <div className="flex gap-4 text-sm ">
              <div className="relative w-10 h-10">
                <Image
                  src="/assets/course.jpeg"
                  alt="tutor"
                  layout="fill"
                  objectFit="cover"
                  className=" w-10 rounded-[50%] border h-10"
                />
              </div>
              <div className="flex gap-1 justify-between border-b border-slate-500 w-full">
                <div className="">
                  <h4 className="font-bold">Okeke Emmanuel</h4>
                  <p className="text-slate-400 text-[12px]">
                    Next Js Developer Expert
                  </p>
                </div>
                <p className="text-slate-400 text-[12px]">Exp 6 Years</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
