"use client";
import { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  const navOptions = [
    { img: "/dashboard.svg", label: "Dashboard" },
    { img: "/students.svg", label: "Students" },
    { img: "/chapter.svg", label: "Chapter" },
    { img: "/help.svg", label: "Help" },
    { img: "/reports.svg", label: "Reports" },
    { img: "/settings.svg", label: "Settings" },
  ];

  const [active, setActive] = useState("Dashboard");

  return (
    <div className="h-screen w-[280px] bg-white px-[12px] py-[30px] flex flex-col gap-[30px]">
      <img src="/logo.svg" alt="logo" width={98} height={42} />
      <ul className="flex flex-col gap-[8px]">
        {navOptions.map((option, index) => (
          <Link
            to={`${option.label == "Dashboard" ? "/" : `/${option.label}`}`}
            key={index}
          >
            <li
              key={index}
              className={`flex items-center gap-[10px] text-[16px] p-[12px] rounded-[6px] ${
                active === option.label
                  ? "bg-[#EEEEEE] text-black font-bold"
                  : "text-[#6F767E] font-semibold"
              }`}
              onClick={() => setActive(option.label)}
            >
              <img
                src={option.img}
                alt={option.label}
                width={24}
                height={24}
                className={active === option.label ? "brightness-0" : ""}
              />
              <span>{option.label}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
