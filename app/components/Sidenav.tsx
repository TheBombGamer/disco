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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@app/components/ui/dialog";
import { Button } from "@app/components/ui/button";
import { useState } from "react";
import { signOut } from "next-auth/react";

const Sidenav = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignOut = () => {
    signOut();
  }


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
      label: "Upcoming Classes",
    },
    {
      imgURL: <LiaVectorSquareSolid />,
      route: "/app/live-courses",
      label: "Live Classes",
    },
    // {
    //   imgURL: <BsChatSquareText />,
    //   route: "/app/chat",
    //   label: "Chat",
    // },
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
        <Dialog>
          <div className="flex cursor-pointer gap-4 text-xl">
            <DialogTrigger className="bg--700 rounded   flex items-center gap-3">
              <MdLogout />
              <p className="text-light-2 max-lg:hidden">Log out</p>
            </DialogTrigger>
          </div>
          <div className="flex gap-2 items-center">
            <p></p>
          </div>
          <DialogContent className="sm:max-w-[425px] bg-slate-950 text-white">
            <DialogHeader>
              <DialogTitle>Are you absolutely sure? </DialogTitle>
              <DialogDescription>
                This action will Log you out , you will have to log in again to
                gain back access to your account
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
              {loading ? (
                <Button disabled type="submit" className="cursor-wait">
                  signing out...
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSignOut}
                >
                  Log Out
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Sidenav;
