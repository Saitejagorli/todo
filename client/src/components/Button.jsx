import { useState } from "react";

const Button = ({ bgColor, textColor, onHover, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div>
      <button
        onClick={onClick}
        type="button"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="mt-3 h-8 w-[270px] px-2 py-2.5 gap-4 mb-8 rounded-lg text-xs leading-3 text-[#3659E2] focus:outline-none max-sm:w-[220px]"
        style={{
          backgroundColor: hovered ? onHover : bgColor,
          color: textColor,
        }}
      >
        + Add new
      </button>
    </div>
  );
};

export default Button;
