"use client";

import SignUp from "@app/components/SignUp";
import SuperAdminReg from "@app/components/SuperAdminReg";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const addNew = () => {
  const { data: session } = useSession();
  const userRole = session?.user?.status;
  const router = useRouter();

  // if (session) {
  //   if (userRole !== "super admin") {
  //     router.push("/login");
  //     return null;
  //   }
  // }
  return (
    <div>
      <h6 className="text-2xl font-bold mb-4">
        Register the New Admin || Student With this Form
      </h6>

      <SuperAdminReg />
    </div>
  );
};

export default addNew;
