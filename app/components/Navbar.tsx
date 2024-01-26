'use client'

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const currenPath = usePathname();
    const lastPath = currenPath.split("/").pop();
  const links = [
    { name: "Home", href: "/home",},
    { name: "About", href: "/About",},
    { name: "Courses", href: "/Courses",},
    { name: "Projects", href: "/Projects",},
    { name: "Blog", href: "/Blog",},
    { name: "Contact", href: "/Contact",},

];
  return (
    <div className="flex text-sm justify-between items-center my-2">
      <Link href="/" className="flex items-center">
        <Image
          src="/assets/logo.jpg"
          width={40}
          height={40}
          alt="logo"
          className="rounded-full"
        />
        <span className="font-bold">Lernen</span>
        
      </Link>

      <div className="flex">
        <ul className="flex md:gap-10 gap-5">
            {
                links.map((link) => (
                    <li key={link.name} className="">
                    <Link href={link.href} className={``}>
                    <p
                  className={`${
                    lastPath === link.href.split("/").pop()
                      ? "   transition-colors font-bold"
                      : "   transition-colors text-gray-400"
                  }`}
                >
                  {link.name}
                </p>
                    </Link>
                    </li>
                ))
            }
        </ul>
      </div>

      <div className="flex gap-2">
        <button className="bg-white text-black font-semibold rounded p-1">Sign Up</button>
        <button className="border bg-transparent p-1 font-semibold rounded">Login</button>
      </div>
    </div>
  );
};

export default Navbar;
