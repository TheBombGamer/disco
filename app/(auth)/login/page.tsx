import React from "react";
import Login from "../../components/Login";

const page = () => {
  return (
    <main className="flex flex-col items-center justify-center bg-[#eaeef1] h-screen">
      <h1 className="text-4xl font-bold text-[#0863F7]">facebook</h1>
      <Login />
    </main>
  );
};

export default page;
