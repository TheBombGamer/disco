"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLogout, MdOutlineCancel } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { GoBook } from "react-icons/go";
import { BsChatSquareText } from "react-icons/bs";
import { PiDownloadSimple, PiStudentBold, PiUploadSimple } from "react-icons/pi";
import { MdOutlineAssignment } from "react-icons/md";
import { signOut } from "next-auth/react";

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
import { BiAddToQueue } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";

const handleSignOut = async () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
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

const AdminMobileNav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const sidebarLinks = [
    {
      imgURL: <LuLayoutDashboard />,
      route: "/admin",
      label: "Profile",
    },

    // {
    //   imgURL: <GoBook />,
    //   route: "/admin/courses",
    //   label: "Courses",
    // },
    {
      imgURL: <BsChatSquareText />,
      route: "/admin/chat",
      label: "Chat",
    },
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

    // session?.user.status === 'superadmin' && {

    // }

    {
      imgURL: <BiAddToQueue />,
      route: "/admin/add-new",
      label: "Add Admin/Student",
    },
    {
      imgURL: <PiStudentBold className="bg-White" />,
      route: "/admin/my-students",
      label: "Students",
    },
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
  ];

  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current) {
        setIsNavOpen(false);
      }
    };

    const handleScroll = () => {
      setIsNavOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <div className="md:hidden max-sm:block">
      <GiHamburgerMenu className="text-xl m-2 absolute" onClick={toggleNav} />
      <section
        className={`z-50 flex flex-col fixed left-0 top-0 h-screen w-64 transform transition-all duration-300 ${
          isNavOpen ? "translate-x-" : "-translate-x-full"
        } bg-slate-900 md:hidden`}
        ref={navRef}
      >
        <div className="flex items-center justify-between gap-1 py-8 px-2">
          <Link
            href="/app"
            className="flex items-center justify-center gap-4 p-1  "
          >
            <Image
              src="/assets/logo.jpg"
              width={40}
              height={40}
              alt="logo"
              className="rounded-full"
            />
            <p className="text-light-1">ELH</p>
          </Link>
          <MdOutlineCancel onClick={closeNav} />
        </div>
        <div className="">
          {sidebarLinks.map((link) => {
            const isActive =
              //   (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;

            return (
              <div
                className="border-y border-slate-800 p-2 px-6 font-bold text-sm "
                key={link.label}
              >
                <Link
                  href={link.route}
                  className={`relative flex justify-start items-center gap-4 rounded-lg md:p-4 p-2 md:text-lg${
                    isActive && "font-bold text-primary "
                  }`}
                >
                  {link.imgURL}

                  <p className="text-light-1" onClick={closeNav}>
                    {link.label}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-2 md:px-4 p-2 border-green-400">
          <div className="flex cursor-pointer gap-4 items-center">
          <Dialog>
          <div className="flex cursor-pointer gap-4 text-xl">
            <DialogTrigger className="bg--700 rounded   flex items-center gap-3">
              <MdLogout />
              <p className="text-light-2 max-lg:">Log out</p>
            </DialogTrigger>
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
              {/* {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>} */}
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
        </div>
      </section>
    </div>
  );
};

export default AdminMobileNav;
