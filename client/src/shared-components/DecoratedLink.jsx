import { NavLink } from "react-router-dom";

export default function DecoratedLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "py-2 px-7 mx-4 rounded-full cursor-pointer bg-[#2546bd]  hover:bg-[#2546bd]"
          : "py-2 px-7 mx-4 rounded-full cursor-pointer  hover:bg-[#2546bd]  "
      }
    >
      {children}
    </NavLink>
  );
}
