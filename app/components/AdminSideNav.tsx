"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuLayoutDashboard } from "react-icons/lu";
import { GoBook } from "react-icons/go";
import { BsChatSquareText } from "react-icons/bs";
import {
  PiDownloadSimple,
  PiStudentBold,
  PiUploadSimple,
} from "react-icons/pi";

import { MdLogout } from "react-icons/md";

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
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";

const AdminSideNav = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { data: session } = useSession();

  const handleSignOut = async () => {
    setLoading(true)
    try {
      
      signOut();
      
    } catch (error) {
      setError('error signing out(check connection)')
      // console.log('error signing out' , error)
    } finally{
      setLoading(false)
    }
  };

  const sidebarLinks = [
    {
      imgURL: <LuLayoutDashboard />,
      route: "/admin",
      label: "Profile",
    },
    // {
    //   imgURL: <BsChatSquareText />,
    //   route: "/admin/chat",
    //   label: "Chat",
    // },
    {
      imgURL: <PiUploadSimple />,
      route: "/admin/upload",
      label: "Upload Courses",
    },
    {
      imgURL: <PiUploadSimple />,
      route: "/admin/upload-meet",
      label: "Upload Live Classes",
    },
    {
      imgURL: <PiUploadSimple />,
      route: "/admin/upload-upcoming",
      label: "Upload Upcoming Classes",
    },
    {
      imgURL: <PiUploadSimple />,
      route: "/admin/upload-assignment",
      label: "Upload Assignment",
    },
    {
      imgURL: <PiUploadSimple />,
      route: "/admin/upload-project",
      label: "Upload Project",
    },
    {
      imgURL: <PiStudentBold className="bg-White" />,
      route: "/admin/my-students",
      label: "Students",
    },

    
  ];
  
  if (session?.user.status === "super admin") {
    sidebarLinks.push(
      
      {
        imgURL: <PiStudentBold className="bg-White" />,
        route: "/admin/students",
        label: "Student DB",
      },
      {
        imgURL: <RiAdminFill />,
        route: "/admin/admins",
        label: "Admins",
      },
      {
        imgURL: <BiAddToQueue />,
        route: "/admin/add-new",
        label: "Add Admin/Student",
      },
      );
  }

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
        <p className="text-light-1 max-lg:">ELH</p>
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
                <Button type="button" onClick={handleSignOut}>
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

export default AdminSideNav;
