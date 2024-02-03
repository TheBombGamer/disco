"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuLayoutDashboard } from "react-icons/lu";
import { GoBook } from "react-icons/go";
import { BsChatSquareText } from "react-icons/bs";
import { PiDownloadSimple, PiUploadSimple } from "react-icons/pi";
import { MdOutlineAssignment } from "react-icons/md";
import { MdLogout } from "react-icons/md";

const AdminSideNav = () => {
  const sidebarLinks = [
    {
      imgURL: <LuLayoutDashboard />,
      route: "/admin",
      label: "Dashboard",
    },
    {
      imgURL: <GoBook />,
      route: "/admin/courses",
      label: "Courses",
    },
    {
      imgURL: <BsChatSquareText />,
      route: "/admin/chat",
      label: "Chat",
    },
    {
      imgURL: <PiUploadSimple />,
      route: "/admin/upload",
      label: "Upload",
    },
    // {
    //   imgURL: <MdOutlineAssignment />,
    //   route: "/admin/assignment",
    //   label: "Assignment",
    // },
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
        <p className="text-light-1 max-lg:hidden">ELH</p>
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

export default AdminSideNav;
