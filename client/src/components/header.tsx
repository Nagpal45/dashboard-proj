const Header = () => {
  return (
    <header className="h-[48px] flex items-center justify-between">
      <div className="bg-white w-[614px] rounded-[12px] h-full px-[20px] flex flex-row gap-[10px] items-center">
        <img src="/search.svg" alt="search" width={18} height={18} />
        <input className="text-[16px] font-medium text-[#808281] w-full outline-none" placeholder="Search your course" />
      </div>
      <div className="w-[500px] h-full flex flex-row items-center justify-between">
        <img src="/help.svg" alt="help" width={24} height={24} />
        <img src="/message.svg" alt="message" width={24} height={24} />
        <img src="/controls.svg" alt="controls" width={24} height={24} />
        <img src="/notifications.svg" alt="notifications" width={24} height={24} />
        <div className="w-[200px] h-full flex flex-row items-center justify-between">
          <img src="/user.svg" alt="user" width={48} height={48} />
          <p className="text-[18px] font-semibold">Adeline H. Dency</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
