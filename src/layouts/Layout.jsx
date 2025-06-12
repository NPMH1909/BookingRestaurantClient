
import { Outlet } from "react-router-dom";
import { Banner } from "../components/shared/Banner";
import { NavbarWithSublist } from "../components/shared/Navbar";
import { Footer } from "../components/shared/Footer";


const Layout = ({ showFooter = true }) => {
  return (
    <>
      <Banner />
      <div className="sticky top-0 z-50 bg-white shadow">
        <NavbarWithSublist />
      </div>
      <main>
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </>
  );
};
export default Layout;