import SignUp from "@app/components/SignUp";
import SuperAdminReg from "@app/components/SuperAdminReg";
import React from "react";

const addNew = () => {
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
