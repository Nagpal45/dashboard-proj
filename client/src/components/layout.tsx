import SideBar from './sidebar';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex h-screen flex-row w-full bg-[#F6F8FA]'>
      <SideBar />
      <main className='w-[1152px]'>
        {children}
      </main>
    </div>
  );
};

export default Layout;
