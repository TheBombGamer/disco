'use client'

import AssignmentCard from "@app/components/AssignmentCard";
import UploadAssignment from "@app/components/UploadAssignment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// type SetRefreshFunction = React.Dispatch<React.SetStateAction<boolean>>;

interface Assignment {
  // setRefresh: SetRefreshFunction;
  _id: string;
  title: string;
  instruction: string;
  pdf: string;
  course: string;
  submissionDate: string;
  createdAt: string;
  assignmentId: string;
}

const page = () => {

  const {data : session} = useSession()

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
  }, [refresh]);

  const userRole = session?.user?.role
  const router = useRouter()
 
  if(session){

    if (userRole !== 'admin') {
      router.push('/app')
      return null
    }
  }
  return (
    <div>
      <h6 className="text-2xl font-bold mb-4">Upload Assignments</h6>

      <UploadAssignment setRefresh={setRefresh} />

    <h6 className="my-3 font-semibold text-lg">Uploaded assignments</h6>

      {assignments.length > 0 ? (
        <div className="flex flex-col gap-4">
          {assignments.map((assignment) => (
           assignment.assignmentId === session?.user.id && (

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
            )
          ))}
        </div>
      ) : (
        <h5>No Assignments Found</h5>
      )}
    </div>
  );
};

export default page;
