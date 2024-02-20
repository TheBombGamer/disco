"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import MeetCard from "./MeetCard";

interface Link {
  link: string;
  title: string;
  course: string;
  createdAt: string;
}

const Live = () => {
  const [meetLink, setMeetLink] = useState<Link[]>([]);

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
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <h6 className="text-3xl text-center">Join Live Classes here</h6>

      {meetLink.map((meet) => (
        <MeetCard
          link={meet.link}
          title={meet?.title}
          course={meet?.course}
          createdAt={meet?.createdAt}
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
