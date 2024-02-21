'use client'

import AssignmentCard from "@app/components/AssignmentCard";
import UploadAssignment from "@app/components/UploadAssignment";
import React, { useEffect, useState } from "react";

interface Assignment {
  _id: string;
  title: string;
  instruction: string;
  pdf: string;
  course: string;
  submissionDate: string;
  createdAt: string;
}

const page = () => {

  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch("/api/assignment");
        if (!response.ok) {
          throw new Error("Failed to fetch assignments");
        }
        const data = await response.json();
        setAssignments(data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div>
      <h6 className="text-2xl font-bold mb-4">Upload Assignments</h6>

      <UploadAssignment />

      {assignments.length > 0 ? (
        <div className="flex flex-col gap-4">
          {assignments.map((assignment) => (
            <div key={assignment._id} className="flex flex-col gap-5">
              <AssignmentCard
                _id={assignment._id}
                title={assignment.title}
                instruction={assignment.instruction}
                pdf={assignment.pdf}
                course={assignment.course}
                submissionDate={assignment.submissionDate}
                createdAt={assignment.createdAt}
              />
            </div>
          ))}
        </div>
      ) : (
        <h5>No Assignments Found</h5>
      )}
    </div>
  );
};

export default page;
