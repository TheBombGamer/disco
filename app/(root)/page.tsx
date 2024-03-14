import React from "react";
import Link from "next/link";
import Image from "next/image";

const HomePage = () => {
  const flyingIcons = [
    { name: "bridge", icon: "/assets/bridge.png" },
    { name: "civil", icon: "/assets/civil.png" },
    { name: "electric", icon: "/assets/eletric.png" },
    { name: "helmet", icon: "/assets/helmet.png" },
    { name: "react", icon: "/assets/react.png" },
    { name: "rocket", icon: "/assets/rocket.png" },
  ];
  return (
    <div className="min-h-screen flex flex-col justify-center relative">
      {/* <div className="w-full h-[600px] absolute rounded-[50%] -z-10">
        {flyingIcons.map((icon) => (
          <div className="circle-item" key={icon.name}>
            <Image
              src={icon.icon}
              width={60}
              height={90}
              alt="logo"
              className="rounded-full"
            />
          </div>
        ))}
      </div> */}
      <div className="flex flex-col gap-3 items-center justify-center mt-7 ">
        <h3 className="font-semibold lg:text-4xl text-4xl text-center">
          <span className="text-primary ">Disco</span> Fostering Learning
          <br /> without distance barrier
        </h3>
        <p className="text-slate-500 text-center">
          Revolutionalizing learning to move along with digital trends ,
          <br className="md:block sm:hidden" /> Experience Learning from your
          comfort zone , while still engaging in other learning activities like
          solving and submission of assignments , projects and others
        </p>
        <Link
          href="/sign-up"
          className="bg-white text-black font-semibold rounded my-5 md:p-1 p-2"
        >
          Register
        </Link>
      </div>

      <div className="flex flex-wrap gap-7 justify-center text-sm">
        <p className=""> </p>
      </div>
    </div>
  );
};

export default HomePage;
