"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import MeetCard from "./MeetCard";

type SetRefreshFunction = React.Dispatch<React.SetStateAction<boolean>>;


interface Link {
  link: string;
  title: string;
  course: string;
  createdAt: string;
  _id: string;
  setRefresh: SetRefreshFunction;

}

const Live = () => {
  const [meetLink, setMeetLink] = useState<Link[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch("/api/meet");
        if (!response.ok) {
          throw new Error("Failed to fetch liinks");
        }
        const data = await response.json();
        setMeetLink(data);
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    };

    fetchLinks();
  }, [refresh]);
  return (
    <div className="flex flex-col gap-4">
      <h6 className="md:text-3xl text-lg text-center">
        Join Live Classes here
      </h6>

      {meetLink.map((meet) => (
        <MeetCard
          link={meet.link}
          title={meet?.title}
          course={meet?.course}
          createdAt={meet?.createdAt}
          _id={meet?._id}
          setRefresh={setRefresh}
        />
        // <div className="flex gap-2 items-center justify-center mt-10 ">
        //   <Link href={link.link}>
        //     <p className="bg-pink-700 rounded p-4 text-xl flex items-center gap-3">
        //       Join Google Meet
        //     </p>
        //   </Link>
        // </div>
      ))}
    </div>
  );
};

export default Live;
