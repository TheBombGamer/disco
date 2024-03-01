"use client";


import React, { useState } from "react";
import YearOne from "@app/components/YearOne";
import YearTwo from "@app/components/YearTwo";
import YearThree from "@app/components/YearThree";
import YearFour from "@app/components/YearFour";
import YearFive from "@app/components/YeaarFive";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const page = () => {
  const [currentTab, setCurrentTab] = useState("100Lv");
  const tabs = [
    {
      name: "100Lv",
      component: <YearOne />,
    },
    {
      name: "200Lv",
      component: <YearTwo />,
    },
    {
      name: "300Lv",
      component: <YearThree />,
    },
    {
      name: "400Lv",
      component: <YearFour />,
    },
    {
      name: "500Lv",
      component: <YearFive />,
    },
  ];
  const {data :session} = useSession()
  const userRole = session?.user?.status
  const router = useRouter()
 
  // if(session){

  //   if (userRole !== 'super admin') {
  //     router.push('/app')
  //     return null
  //   }
  // }
  return (
    <section className="flex flex-col gap-4 w-full ">
      <h6 className="font-bold text-2xl">View All Students Here</h6>
      <div className="flex gap-4 flex-col lg:flex-row w-full ">
        <div className="flex flex-col gap-6 w-full borde">
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
                  <h5 className="md:text-sm text-[10px]">{tab.name}</h5>
                </span>
              </div>
            ))}
          </div>
          <div className="w-full">
            {tabs.map((tab) =>
              tab.name === currentTab ? (
                <div key={tab.name}>{tab.component}</div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
