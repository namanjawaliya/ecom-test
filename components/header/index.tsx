"use client";

import { useState, useEffect } from "react";

import { BRAND_NAME } from "@/lib/constants";
import ThemeToggle from "@/components/common/ThemeToggle";

type Props = {};

const Header = (props: Props) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`h-16 flex justify-between items-center px-10 py-2 border-b-2 transition-all duration-300 ${
        isSticky ? "fixed top-0 left-0 right-0 bg-black shadow-md z-50" : ""
      }`}
    >
      <h1 className="font-bold">{BRAND_NAME}</h1>
      <span>
        <ThemeToggle />
      </span>
    </nav>
  );
};

export default Header;
