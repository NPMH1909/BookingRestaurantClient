import { useEffect, useState } from "react";
import Sidebar from "../components/admin/SidebarDashboard";
import AdminNavbar from "../components/admin/AdminNavbar"; // Thêm navbar
import Restaurant from "../components/admin/Restaurant/Restaurant";
import Employee from "../components/admin/Employee/Employee";
import Menu from "../components/admin/Menu/Menu";
import Order from "../components/admin/Order/Order";
import Promotion from "../components/admin/Promotion/Promotion";
import Video from "../components/admin/Video/Video";
import Analytic from "../components/admin/Analytic";
import Report from "../components/admin/Report";
import History from "../components/admin/History";
import { cloneElement } from "react";
import PrepareItem from "../components/admin/PrepareItem";

const RestaurantOwnerLayout = () => {
  const [selected, setSelected] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // <-- Thêm dòng này

  useEffect(() => {
    const savedLabel = localStorage.getItem("selectedLabel");
    const componentMap = {
      "Nhà hàng": <Restaurant selectedRestaurant={selectedRestaurant} />,
      "Nhân viên": <Employee selectedRestaurant={selectedRestaurant} />,
      "Thực đơn": <Menu selectedRestaurant={selectedRestaurant} />,
      "Đơn hàng": <Order selectedRestaurant={selectedRestaurant} />,
      "Khuyến mãi": <Promotion selectedRestaurant={selectedRestaurant} />,
      "Video": <Video selectedRestaurant={selectedRestaurant} />,
      "Thống kê": <Analytic selectedRestaurant={selectedRestaurant} />,
      "Báo cáo": <Report selectedRestaurant={selectedRestaurant} />,
      "Lịch sử": <History selectedRestaurant={selectedRestaurant} />,
      "Chuẩn bị thực đơn": <PrepareItem selectedRestaurant={selectedRestaurant} />,

    };

    const defaultLabel = "Thống kê";
    const label = savedLabel || defaultLabel;

    setSelected({
      label,
      component: componentMap[label],
    });
  }, [selectedRestaurant]); // <-- cập nhật khi selectedRestaurant thay đổi

  const handleSelect = (item) => {
    setSelected({
      ...item,
      component: cloneElement(item.component, {
        selectedRestaurant,
      }),
    });
    localStorage.setItem("selectedLabel", item.label);
  };

  return (
    <div className="flex flex-col min-h-screen sticky top-0 z-50">
      <AdminNavbar />
      <div className="flex flex-1">
        <Sidebar
          selectedLabel={selected?.label}
          onSelect={handleSelect}
          onSelectRestaurant={setSelectedRestaurant} // <-- truyền xuống Sidebar
        />
        <main className="flex-1 p-4 overflow-auto">
          {selected?.component}
        </main>
      </div>
    </div>
  );
};

export default RestaurantOwnerLayout;
