"use client";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="bg-black py-6 flex items-center justify-between z-10 relative">
        <div
          className={clsx(
            "fixed top-0 left-0 bg-black w-full h-screen duration-500 flex flex-col items-center justify-center font-semibold text-2xl uppercase space-y-5 z-20",
            { hidden: !isOpen }
          )}
        >
          <div
            className={clsx(
              "fixed top-0 left-0 w-full h-screen bg-black opacity-50 z-20", // z-20 to ensure overlay is below menu links
              { hidden: !isOpen }
            )}
            onClick={toggleMenu}
          ></div>

          <Link
            href="/"
            className="text-red-600 duration-200"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            href="/boxers"
            className="text-red-600 duration-200"
            onClick={toggleMenu}
          >
            Boxers
          </Link>
          <Link
            href="/schedule"
            className="text-red-600 duration-200"
            onClick={toggleMenu}
          >
            Schedule
          </Link>
          <Link
            href="/news"
            className="text-red-600 duration-200"
            onClick={toggleMenu}
          >
            News
          </Link>
          <Link
            href="/contact"
            className="text-red-600 duration-200"
            onClick={toggleMenu}
          >
            Contact
          </Link>
        </div>

        <Link
          href="/"
          className="mx-10 font-black uppercase text-red-600 hover:text-red-400 text-xl"
        >
          Boxers
        </Link>

        <button
          type="button"
          className={clsx(
            "mr-10 flex flex-col justify-between items-center w-6 h-6 relative group md:hidden",
            { open: isOpen }
          )}
          onClick={toggleMenu}
        >
          <span className="hamburger-top bg-white group-hover:bg-red-500"></span>
          <span className="hamburger-middle bg-white group-hover:bg-red-500"></span>
          <span className="hamburger-bottom bg-white group-hover:bg-red-500"></span>
        </button>

        {/* DESKTOP */}
        <div className="mr-10 hidden md:flex flex-row space-x-6 items-center">
          <Link href="/" className="text-white hover:text-red-500 duration-200">
            Home
          </Link>
          <Link
            href="/boxers"
            className="text-white hover:text-red-500 duration-200"
          >
            Boxers
          </Link>
          <Link
            href="/schedule"
            className="text-white hover:text-red-500 duration-200"
          >
            Schedule
          </Link>
          <Link
            href="/news"
            className="text-white hover:text-red-500 duration-200"
          >
            News
          </Link>
          <Link
            href="/contact"
            className="text-white hover:text-red-500 duration-200"
          >
            Contact
          </Link>
        </div>
      </nav>
    </div>
  );
}
