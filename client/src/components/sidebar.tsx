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

  const path = window.location.pathname.split("/")[1];
  const [active, setActive] = useState(
    path === "" ? "Dashboard" : path.charAt(0).toUpperCase() + path.slice(1)
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {isSidebarOpen ? (
        <p onClick={() => setIsSidebarOpen((prev) => !prev)} className={`lg:hidden cursor-pointer md:left-[250px] left-[40%] absolute top-4 z-20 font-bold text-[24px]`}>X</p>
      ):(
        <img src="/menu.svg" width={24} height={24} alt="menu" onClick={() => setIsSidebarOpen((prev) => !prev)} className={`lg:hidden cursor-pointer left-8 absolute top-8 z-20`} />
      )}

      <div
        className={`fixed lg:static min-h-screen w-[50%] z-10 md:w-[280px] bg-white px-[12px] py-[30px] flex flex-col gap-[30px] transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <img src="/logo.svg" alt="logo" width={98} height={42} />
        <ul className="flex flex-col gap-[8px]">
          {navOptions.map((option, index) => (
            <Link
              to={`${option.label === "Dashboard" ? "/" : `/${option.label}`}`}
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

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default SideBar;
