import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="mt-20 mb-5 flex flex-col items-center gap-10 text-lg">
      <div className="border border-gray-500 p-5 text-center bg-black text-white rounded-lg flex flex-col items-center ">
        <p className="font-bold text-2xl mt-4">What is Disco</p>
        <div className="flex flex-col gap-5">
          <p className="text-sm mt-4">
            Disco is an E-learning app developed to help students and their
            tutors interacct in an easy way , such that thier distance apart
            should'nt be a factor negatively affecting learning
          </p>
        </div>
      </div>

      <div className="border border-gray-500 p-5 text-center bg-black text-white rounded-lg flex flex-col items-center glassmorphism mt-10">
        <h6 className="font-bold text-2xl mt-4">Features of Disco</h6>
        <div className="flex flex-col gap-5">
          <p className="text-sm mt-4">
            <span className="text-lg text-primary">Uploading Courses:</span>{" "}
            WIth Disco tutors can easily upload courses in PDF formats and
            registered students are able to downloadthem
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-sm mt-4">
            <span className="text-lg text-primary">Uploading Assignments:</span>{" "}
            Tutors can upload assignments tasks and students can submit the
            solution
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-sm mt-4">
            <span className="text-lg text-primary">Live Tutorials:</span> Tutors
            can fix live classes with students , where students can ask
            questions and others learn from attendance
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-sm mt-4">
            <span className="text-lg text-primary">Students Database:</span>{" "}
            Tutors can fsee the details of thier respective students
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-sm mt-4">
            <span className="text-lg text-primary">Super Admin:</span>While
            lecturers are normal admins , there is a Super admin who can control
            all the activites of the app . He/She is also reponsible for
            creating accounts for admins
          </p>
        </div>
      </div>

      <div className="border border-gray-500 p-5 text-center bg-black text-white rounded-lg flex flex-col items-center glassmorphism mt-10">
        <h6 className="font-bold text-2xl mt-4">
          Technology that was used to Develop  Disco
        </h6>
        <div className="flex flex-col gap-5">
          <p className="text-sm mt-4"></p>
          <p>
            <span className="text-lg text-primary">Next Js:</span> Ultimately
            Disco was developed with Next Js , all API integrations for the
            Create , Retrieve , Edit and Delete functions were done following
            Best practices and conventions according to Next.js'Documentation
          </p>
          <p>
            <span className="text-lg text-primary">Mongoose/MongoDB:</span> For
            the Database I used Mongose as the database Library and Mongodb as
            the Database
          </p>
          <p>
            <span className="text-lg text-primary"> Shadcn: </span> to help
            build the app faster I integrated a component UI Library (Shadcn)
            for modals and some inputs
          </p>{" "}
          <p>
            <span className="text-lg text-primary">UploadThing: </span> for
            uploading PDF's and Images accross the Application
          </p>
          <p className="mt-14">
            I am open to collaborate and make this App more effective . check other Projects of mine <Link href='https://project-room-black.vercel.app/' className="text-primary text-lg font-bold" >here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
