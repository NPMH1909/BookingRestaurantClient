import React, { useEffect, useState } from "react";
import {
  Cog6ToothIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/solid";
import Restaurant from "./Restaurant/Restaurant";
import Employee from "./Employee/Employee";
import Menu from "../admin/Menu/Menu";
import Order from "./Order/Order";
import Promotion from "./Promotion/Promotion";
import Video from "./Video/Video";
import Analytic from "./Analytic";
import Report from "./Report";
import History from "./History";
import { useGetRestaurantsByUserIdQuery } from "../../apis/restaurantApi";
import Chat from "./Chat";
import PrepareItem from "./PrepareItem";

const Sidebar = ({ selectedLabel, onSelect, onSelectRestaurant }) => {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState("");

  const { data: resData, isLoading, isError } = useGetRestaurantsByUserIdQuery();
  const restaurants = resData?.data || []
  useEffect(() => {
    if (restaurants.length > 0 && !selectedRestaurantId) {
      const firstRestaurant = restaurants[0];
      setSelectedRestaurantId(firstRestaurant._id);
      onSelectRestaurant?.(firstRestaurant);
    }
  }, [restaurants, selectedRestaurantId]);



  const handleRestaurantChange = (e) => {
    const selectedId = e.target.value;
    setSelectedRestaurantId(selectedId);
    const selected = restaurants?.find((r) => r._id === selectedId);
    onSelectRestaurant?.(selected);
  };

  const sidebarItems = [
    {
      title: {
        label: "Quản lý",
        icon: <Cog6ToothIcon className="h-5 w-5" />,
      },
      sublist: [
        { label: "Nhà hàng", component: <Restaurant /> },
        { label: "Nhân viên", component: <Employee /> },
        { label: "Thực đơn", component: <Menu /> },
        { label: "Đơn hàng", component: <Order /> },
        { label: "Khuyến mãi", component: <Promotion /> },
        { label: "Video", component: <Video /> },
        { label: "Tin nhắn", component: <Chat /> },

      ],
    }, {
      title: {
        label: "Tổng quan",
        icon: <PresentationChartBarIcon className="h-5 w-5" />,
      },
      sublist: [
        { label: "Thống kê", component: <Analytic /> },
        { label: "Chuẩn bị thực đơn", component: <PrepareItem /> },
        // { label: "Lịch sử", component: <History /> },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-gray-100 border-r p-4">
      {/* Selectbox */}
      <div className="mb-4">
        {isLoading ? (
          <p className="text-sm text-gray-500">Đang tải...</p>
        ) : isError ? (
          <p className="text-sm text-red-500">Lỗi khi tải danh sách.</p>
        ) : restaurants.length === 0 ? (
          <p className="text-sm text-gray-500">Bạn chưa có nhà hàng.</p>
        ) : (
          <select
            value={selectedRestaurantId}
            onChange={handleRestaurantChange}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          >
            {restaurants.map((r) => (
              <option key={r._id} value={r._id}>
                {r.name}
              </option>
            ))}
          </select>
        )}

      </div>

      {/* Danh sách sidebar */}
      {sidebarItems.map((group, i) => (
        <div key={i} className="mb-4">
          {group.title && (
            <div className="flex items-center mb-2 text-gray-700 font-bold">
              {group.title.icon}
              <span className="ml-2">{group.title.label}</span>
            </div>
          )}
          <ul className="space-y-1">
            {group.sublist.map((item, j) => (
              <li
                key={j}
                className={`cursor-pointer p-2 rounded transition-colors
                  ${selectedLabel === item.label
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200 text-gray-700"
                  }`}
                onClick={() => onSelect(item)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
