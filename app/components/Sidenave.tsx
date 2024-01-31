"use client";
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

const LeftSidebar = () => {
  const sidebarLinks = [
      {
        imgURL: <LuLayoutDashboard />,
        route: "/app",
        label: "Dashboard",
      },
    {
      imgURL: <GoBook />,
      route: "/app/courses",
      label: "Courses",
    },
    {
      imgURL: <BsChatSquareText />,
      route: "/app/chat",
      label: "Chat",
    },
    {
      imgURL: <PiDownloadSimple />,
      route: "/app/downloads",
      label: "Download",
    },
    {
      imgURL: <MdOutlineAssignment />,
      route: "/app/assignment",
      label: "Assignment",
    },
  ];

  const pathname = usePathname();

  return (
    <section className="custom-scrollbar sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r border-r-gray-500 bg-dark-2 ">
      <Link href="/" className="flex items-center justify-center gap-4 p-1">
        <Image
          src="/assets/logo.jpg"
          width={40}
          height={40}
          alt="logo"
          className="rounded-full"
        />
        <p className="text-light-1 max-lg:hidden">ELH</p>
      </Link>
      <div className="pb-5 pt-20">
        <div className="flex w-full flex-1 flex-col gap-6 md:px-6 px-2 ">
          {sidebarLinks.map((link) => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;

            return (
              <Link
                href={link.route}
                key={link.label}
                className={`relative flex justify-start items-center gap-4 rounded-lg p-4 ${
                  isActive && "font-bold text-primary "
                }`}
              >
                {link.imgURL}

                <p className="text-light-1 max-lg:hidden">{link.label}</p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-10 px-6">
        <div className="flex cursor-pointer gap-4 p-4">
          <MdLogout />
          <p className="text-light-2 max-lg:hidden">Logout</p>
        </div>
      </div>
    </section>
  );
};

export default LeftSidebar;
