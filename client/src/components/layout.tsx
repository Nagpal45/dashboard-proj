import Header from "./header";
import SideBar from "./sidebar";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen flex-row w-full bg-[#F6F8FA]">
      <SideBar />
      <div className="flex flex-col w-full p-[20px] pb-0 gap-[15px] h-full">
        <Header />
        <main className="w-full min-h-[90%] bg-white rounded-[12px] p-[16px]">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
