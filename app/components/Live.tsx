import Link from "next/link";
import React from "react";

const Live = () => {
  return (
    <div className="flex flex-col gap-4">
      <h6 className="text-3xl text-center">Join Live Classes here</h6>
        <div className="flex gap-2 items-center justify-center mt-10 ">
      <Link href='http://meet.google.com/fcx-deom-nmf'>
          <p className="bg-pink-700 rounded p-4 text-xl flex items-center gap-3">
            Join Google Meet
          </p>
      </Link>
        </div>
    </div>
  );
};

export default Live;
