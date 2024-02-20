"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LuLayoutDashboard } from "react-icons/lu";
import { GoBook } from "react-icons/go";
import { BsChatSquareText } from "react-icons/bs";
import { PiDownloadSimple } from "react-icons/pi";
import { MdOutlineAssignment } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { LiaVectorSquareSolid } from "react-icons/lia";

const Sidenav = () => {
  const sidebarLinks = [
    {
      imgURL: <MdOutlineDashboard />,
      route: "/app",
      label: "Profile",
    },
    {
      imgURL: <GoBook />,
      route: "/app/courses",
      label: "Courses",
    },
    {
      imgURL: <BsChatSquareText />,
      route: "/app/upcoming-courses",
      label: "Upcoming Courses",
    },
    {
      imgURL: <LiaVectorSquareSolid />,
      route: "/app/live-courses",
      label: "Live Classes",
    },
    {
      imgURL: <BsChatSquareText />,
      route: "/app/chat",
      label: "Chat",
    },
    {
      imgURL: <MdOutlineAssignment />,
      route: "/app/assignment",
      label: "Assignment",
    },
  ];

  const pathname = usePathname();

  return (
    <section className="sticky left-0 top-0 z-20  h-screen min-w-fit flex-col justify-between overflow-auto border-r border-r-gray-500 hidden md:flex">
      <Link href="/" className="flex items-center justify-center gap-4 p-1  ">
        <Image
          src="/assets/logo.jpg"
          width={40}
          height={40}
          alt="logo"
          className="rounded-full"
        />
        <p className="text-xl font-bold">ELH</p>
      </Link>
      <div className="flex w-full  flex-col gap-4 md:p-1 p-1 border-green-800">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`relative flex justify-start items-center gap-4 rounded-lg md:p-4 p-2 md:text-lg text-2xl  ${
                isActive && "font-bold text-primary "
              }`}
            >
              {link.imgURL}
              <p className="text-light-1">{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 md:px-4 p-2 border-green-400">
        <div className="flex cursor-pointer gap-4 ">
          <MdLogout />
          <p className="text-light-2 max-lg:hidden">Logout</p>
        </div>
      </div>
    </section>
  );
};

export default Sidenav;
