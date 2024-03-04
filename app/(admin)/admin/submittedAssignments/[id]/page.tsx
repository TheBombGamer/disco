"use client";

import AssignmentCard from "@app/components/AssignmentCard";
import UploadAssignment from "@app/components/UploadAssignment";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface AssignmentSolution {
  _id: string;
  id: string;
  name: string;
  solution: string;
  assignmentId: string;
  createdAt: string;
}

interface Params {
  id: string;
}

interface PageParams {
  params: Params;
}

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

const Page = ({ params: { id } }: PageParams) => {
  const [assignments, setAssignments] = useState<AssignmentSolution[]>([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch("/api/assignment/submit");
        if (!response.ok) {
          throw new Error("Failed to fetch submitted assignments");
        }
        const data = await response.json();
        // console.log("data =", data);
        setAssignments(data);
      } catch (error) {
        console.error("Error fetching submitted assignments:", error);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div>
      <h6 className="text-2xl font-bold mb-4">Submitted Assignments</h6>
      {assignments.length > 0 ? (
        <div className="flex flex-col gap-4">
          {assignments.map(
            (assignment) =>
              assignment.assignmentId === id && (
                <div key={assignment._id} className="">
                  <div className="flex items-center gap-5 mb-4 ">
                    <h6 className=" w-2/6 font-bold text-lg">Name</h6>
                    <h6 className="font-bold  text-center text-lg"> Solution</h6>
                    <p className="w-2/6 font-bold text-lg">Submitted</p>
                  </div>
                  <div className="flex items-center gap-5 ">
                    <h6 className=" w-2/6">{assignment.name}</h6>
                    <Link
                      href={assignment.solution}
                      download="downloaded_file.pdf"
                      className="rounded bg-primary"
                    >
                      {" "}
                      Solution
                    </Link>
                    <p className="w-2/6">
                      {formatCreatedAtDate(assignment.createdAt)}
                    </p>
                  </div>
                </div>
              )
          )}
        </div>
      ) : (
        <h5>No Assignment Submitted Yet</h5>
      )}
    </div>
  );
};

export default Page;
