import Logo from "./Logo";
import Projects from "./Projectscomponent";

const Sidebar = () => {
  return (
    <div
      className="w-60 min-h-screen h-auto"
      style={{ boxShadow: "0px 0px 8px 0px #3659E229" }}
    >
      <Logo />
      <Projects />
    </div>
  );
};

export default Sidebar;
