import React from "react";

const HomePage = () => {
  return (
    <div className="h-[90vh]  flex flex-col justify-between"> 
      <div className="flex flex-col gap-3 items-center justify-center mt-7 ">
        <h3 className="font-semibold lg:text-4xl text-3xl text-center">
          <span className="text-purple-900 ">Lernen</span> Empowers And
          <br /> Connects Minds
        </h3>
        <p className="text-slate-500 text-center">Where developers unite to learn , collaborate and code <br className="md:block sm:hidden"/> the next level</p>
        <button className="bg-white text-black font-semibold rounded p-1">Launch App</button>

      </div>

      <div className="flex flex-wrap gap-7 justify-center">
        <p className="">90 000 + <span className="font-semibold">Students</span></p>
        <p className="">1000 + <span className="font-semibold">Tutors</span></p>
        <p className="">50+  <span className="font-semibold">Courses</span></p>
      </div>
    </div>
  );
};

export default HomePage;
