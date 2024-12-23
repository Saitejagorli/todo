import icon from "../assets/ghost-org.svg";
const Logo = () => {
  return (
    <div className="flex w-[240px]  px-6 py-4 border-b gap-2.5 border-[#EBEEFC] items-center justify-center">
      <img src={icon} alt="logo" />
      <p className="font-bold text-lg leading-7">Task Boards</p>
    </div>
  );
};

export default Logo;
