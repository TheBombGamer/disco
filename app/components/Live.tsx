import Link from "next/link";
import React from "react";

const Live = () => {
  return (
    <div className="flex flex-col gap-4">
      <h6 className="">Join Live Classes here</h6>
      <Link href='http://meet.google.com/fcx-deom-nmf'>
        <div className="flex gap-2 items-center">
          <p className="bg-pink-700 rounded p-1 text-[10px] flex items-center gap-3">
            Join Google Meet
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Live;
