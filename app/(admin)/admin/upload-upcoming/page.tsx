'use client'

import UpcomingCard from "@app/components/UpcomingCard";
import UploadUpcoming from "@app/components/UploadUpcoming";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// type SetRefreshFunction = React.Dispatch<React.SetStateAction<boolean>>;

interface Unavailable {
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

  const [upcoming, setUpcoming] = useState<Unavailable[]>([]);
  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch("/api/upcoming");
        if (!response.ok) {
          throw new Error("Failed to fetch assignments");
        }
        const data = await response.json();
        setUpcoming(data);
      } catch (error) {
        // console.error("Error fetching assignments:", error);
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
      <h6 className="text-2xl font-bold mb-4">Upload Upcoming Classes</h6>

      <UploadUpcoming setRefresh={setRefresh} />

    <h6 className="my-3 font-semibold text-lg">Upcoming Classes</h6>

      {upcoming.length > 0 ? (
        <div className="flex flex-col gap-4">
          {upcoming.map((upcoming) => (
           upcoming.assignmentId === session?.user.id && (

            <div key={upcoming._id} className="flex flex-col gap-5">
              <UpcomingCard
                _id={upcoming._id}             
                title={upcoming.title}
                instruction={upcoming.instruction}
                pdf={upcoming.pdf}
                course={upcoming.course}
                submissionDate={upcoming.submissionDate}
                createdAt={upcoming.createdAt}
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
