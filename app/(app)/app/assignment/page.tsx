"use client";

import AssignmentCard from "@app/components/AssignmentCard";
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

const page: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [refresh, setRefresh] = useState(false);


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
      <h6 className="font-bold text-2xl mb-10">Assignments</h6>
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
                setRefresh={setRefresh}
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
