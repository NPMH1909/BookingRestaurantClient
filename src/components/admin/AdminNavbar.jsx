import React from "react";
import {
  Navbar,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/loginAD");
  };

  return (
    <Navbar className="mx-auto max-w-screen-3xl rounded-none px-4 py-2 sticky top-0 z-50">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography variant="h3" className="ms-5" color="blue-gray">
          <span className="text-[#FF333A]">TableHive H&N</span> Restaurant Management
        </Typography>
        <div className="flex items-center space-x-4">
          <Button
            color="red"
            variant="text"
            onClick={handleLogout}
            className="items-center"
          >
            <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </Navbar>
  );
};

export default AdminNavbar;
