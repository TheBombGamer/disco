"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface Users {
  _id: string;
  level: string;
  role: string;
  fullname: string;
  department: string;
  password: string;
  createdAt: string;
}

const YearOne = () => {
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

  const [admins, setAdmins] = useState<Users[]>([]);
  const { data: session } = useSession();
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch Admins");
        }
        const data = await response.json();
        setAdmins(data);
      } catch (error) {
        console.error("Error fetching Admins:", error);
      }
    };

    fetchAdmins();
  }, []);
  return (
    <div>
      <h6 className="font-bold">View All Admins Here</h6>
      <div className="w-full flex bg-slate-950 rounded-t-lg p-2 border-b-black">
        <h6 className="flex-1">Name</h6>
        <h6 className=" flex-1">Admin for </h6>
        {/* <h6 className="flex-1">Password</h6> */}
        <h6 className="flex-1">Registered on</h6>
      </div>
      {admins.map((admin) =>
        admin.role == "admin" ? (
          <>
            <div>
              <div className="flex w-full bg-slate-900">
                <div className="w-full flex -t-lg p-2 ">
                  <h6 className="flex-1">{admin.fullname}</h6>
                  <h6 className=" flex-1">{admin.department}</h6>
                  {/* <h6 className="flex-1">{admin.password}</h6> */}
                  <h6 className="flex-1">
                    {formatCreatedAtDate(admin.createdAt)}
                  </h6>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )
      )}
    </div>
  );
};

export default YearOne;
