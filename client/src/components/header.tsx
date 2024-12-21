const Header = () => {
  const headerOptions = [
    { icon: "/help.svg", alt: "help", badge: false },
    { icon: "/message.svg", alt: "message", badge: true },
    { icon: "/controls.svg", alt: "controls", badge: false },
    { icon: "/notifications.svg", alt: "notifications", badge: true },
  ];

  return (
    <header className="h-[48px] flex items-center justify-between">
      <div className="bg-white w-[614px] rounded-[12px] h-full px-[20px] flex flex-row gap-[10px] items-center">
        <img src="/search.svg" alt="search" width={18} height={18} />
        <input
          className="text-[16px] font-medium text-[#808281] w-full outline-none"
          placeholder="Search your course"
        />
      </div>
      <div className="w-[500px] h-full flex flex-row items-center justify-between">
        {headerOptions.map((option, index) => (
          <div
            className="flex items-center relative p-[2px] cursor-pointer"
            key={index}
          >
            <img src={option.icon} alt={option.alt} width={24} height={24} />
            <img
              src="/badge.svg"
              alt="line"
              width={11}
              height={11}
              className={`${
                option.badge ? "block" : "hidden"
              } absolute top-0 right-0`}
            />
          </div>
        ))}
        <div className="w-[200px] h-full flex flex-row items-center justify-between">
          <img src="/user.svg" alt="user" width={48} height={48} />
          <p className="text-[18px] font-semibold">Adeline H. Dency</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
