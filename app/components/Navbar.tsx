"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

interface LinkItem {
  name: string;
  href: string;
}



const Navbar: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const path = usePathname();
  const links: LinkItem[] = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    // { name: "Courses", href: "/login" },
    // { name: "Projects", href: "/sign-up" },
    // { name: "Questions", href: "/Questions" },
    // {name : "Dashboard" , href:'/app'} ,
    { name: "Contact", href: "/contact" },
  ];
  const navRef = useRef<HTMLDivElement>(null);

  const { data: session } = useSession();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
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
    <div className="flex text-sm justify-between items-center my-2">
      <Link href="/" className=" flex items-center md:flex-row flex-co">
        <Image
          src="/assets/logo.jpg"
          width={40}
          height={40}
          alt="logo"
          className="rounded-full"
        />
        <span className="font-bold">Engineering <br className="block md:hidden"/> Learning Hub</span>
      </Link>

      <div className={`md:flex  hidden`} onClick={closeNav}>
        <ul className="flex md:gap-10 gap-5">
          {links.map((link) => {
            const isActive =
              (path.includes(link.href) && link.href.length > 1) ||
              path === link.href;
            return (
              <li key={link.name} className="">
                <Link href={link.href} className={``}>
                  <p
                    className={`${
                      isActive
                        ? "   transition-colors font-bold"
                        : "   transition-colors text-gray-400"
                    }`}
                    onClick={closeNav}
                  >
                    {link.name}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex gap-2 items-center">
        {!session ? (
          <>
            <Link href="/sign-up">
              <button className="bg-white text-black font-semibold rounded p-1">
                Sign Up
              </button>
            </Link>
            <Link href="/login">
              <button className="border bg-transparent p-1 font-semibold rounded">
                Login
              </button>
            </Link>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                signOut();
              }}
              className="border bg-white text-black p-1 font-semibold rounded"
            >
              {" "}
              Sign Out
            </button>
            {/* <div className="flex">
              <Image
                src={session?.user?.image || '/assets/logo.jpg'}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile_image"
                onClick={() => {}}
              />
            </div> */}
          </>
        )}

        <div className="md:hidden max-sm:block">
          <GiHamburgerMenu className="text-xl" onClick={toggleNav} />
          <div
            className={`bg-black z-20 rounded-lg w-52 absolute top-14 border border-gray-500 p-2 right-10  ${
              isNavOpen ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col gap-2 items">
              {links.map((link) => {
                const isActive =
                  (path.includes(link.href) && link.href.length > 1) ||
                  path === link.href;
                return (
                  <li key={link.name} className="">
                    <Link href={link.href} className={``}>
                      <p
                        className={`p-1 hover:bg-primary hover:text-white ${
                          isActive
                            ? "   transition-colors font-bold bg-primary"
                            : "   transition-colors text-gray-400"
                        }`}
                        onClick={closeNav}
                      >
                        {link.name}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
