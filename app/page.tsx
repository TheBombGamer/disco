import React from "react";

const HomePage = () => {
  return (
    <div className="h-[90vh]  flex flex-col justify-between"> 
      <div className="flex flex-col gap-3 items-center justify-center mt-7 ">
        <h3 className="font-semibold lg:text-4xl text-3xl text-center">
          <span className="text-purple-900 ">ELH</span> Empowers And
          <br /> Connects Minds
        </h3>
        <p className="text-slate-500 text-center">Where Engineering students converge to improve their technological ingenuity and  <br className="md:block sm:hidden"/> enhance their research skills.</p>
        <button className="bg-white text-black font-semibold rounded p-1">Register</button>

      </div>

      <div className="flex flex-wrap gap-7 justify-center">
        <p className="">90 000 + <span className="font-semibold">Students</span></p>
        <p className="">1000 + <span className="font-semibold">Lecturers</span></p>
        <p className="">50+  <span className="font-semibold">Courses</span></p>
      </div>
    </div>
  );
};

export default HomePage;
