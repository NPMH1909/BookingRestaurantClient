import { NavLink } from "react-router-dom";
import {
  HeartIcon,
  UserIcon,
  ClockIcon
} from "@heroicons/react/24/solid";

const Sidebar = () => {
  const links = [
    { name: "Tài khoản", to: "/profile", icon: UserIcon },
    { name: "Lịch sử đặt bàn", to: "/history", icon: ClockIcon },    
    { name: "Nhà hàng yêu thích", to: "/favourite-restaurant", icon: HeartIcon },
  ];

  return (
    <div className="h-screen w-64 bg-white flex flex-col border-r border-gray-200">
      <nav className="flex-1 p-4 space-y-0">
        {links.map(({ name, to, icon: Icon }, index) => (
          <div key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md transition-colors
                 ${isActive ? "bg-red-600 text-white" : "text-gray-700 hover:bg-gray-100"}`
              }
            >
              <Icon className="h-6 w-6" />
              <span>{name}</span>
            </NavLink>
            {index < links.length  && (
              <div className="border-b border-gray-300 mx-4 my-1" />
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
