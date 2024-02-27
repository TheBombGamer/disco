import Live from "@app/components/Live";
import UploadAssignment from "@app/components/UploadAssignment";
import UploadMeet from "@app/components/UploadMeet";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const page = () => {

  const {data :  session} = useSession()
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
      <h6 className="text-2xl font-bold mb-4">Upload Google Meet Link</h6>

      <UploadMeet />

      <Live />
    </div>
  );
};

export default page;
