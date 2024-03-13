"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLogout, MdOutlineCancel, MdOutlineDashboard } from "react-icons/md";
import { GoBook } from "react-icons/go";
import { BsChatSquareText } from "react-icons/bs";
import { MdOutlineAssignment } from "react-icons/md";
import { LiaVectorSquareSolid } from "react-icons/lia";
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


const MobileNav = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();
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

  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current ) {
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

  const handleSignOut = () => {
    signOut();
  }

  return (
    <div className="md:hidden max-sm:block ">

        <GiHamburgerMenu className="text-xl m-2 absolute" onClick={toggleNav} />
      <section
        className={` z-50 fixed left-0 top-0 h-screen w-64 transform transition-all duration-300 ${
            isNavOpen ? "translate-x-" : "-translate-x-full"
        } bg-slate-900 md:hidden`}
        ref={navRef}
      >
        <div className="flex items-center justify-between gap-3 py-8 px-2">
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
                className="border-y border-slate-800 p-3 px-6 font-bold text-sm "
                key={link.label}
              >
                <Link
                  href={link.route}
                  className={`relative flex justify-start items-center gap-4 rounded-lg md:p-4 p-2 md:text-lg${
                    isActive && "font-bold text-primary "
                  }`}
                >
                  {link.imgURL}

                  <p className="text-light-1" onClick={closeNav}>{link.label}</p>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-10 md:px-4 p-2 border-green-400">
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
    </div>
  );
};

export default MobileNav;
