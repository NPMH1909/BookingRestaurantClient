import { Outlet } from "react-router-dom";
import { Banner } from "../components/shared/Banner";
import { NavbarWithSublist } from "../components/shared/Navbar";
import { Footer } from "../components/shared/Footer";
import Sidebar from "../components/shared/SideBar";

const UserLayout = () => {
  return (
    <>
      <Banner />
      <div className="sticky top-0 z-50 bg-white shadow">
        <NavbarWithSublist />
      </div>
      <div className="flex">
        <aside className="sticky top-[64px] h-[calc(100vh-64px)] w-64 bg-white border-r z-40 ">
            <Sidebar />
          </aside>
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default UserLayout;