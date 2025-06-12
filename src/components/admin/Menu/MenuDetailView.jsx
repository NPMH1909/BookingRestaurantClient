// components/MenuDetail.js
import React from "react";
import { Container } from "@mui/material";
import { Typography } from "@material-tailwind/react";

const MenuDetailView = ({ selectedId, menuData }) => {
  const selectedItem = menuData?.data.find((menu) => menu._id === selectedId);
  if (!selectedItem) return null;

  const details = [
    { label: "Tên", value: selectedItem.name },
    {
      label: "Loại",
      value:
        selectedItem.category === "main"
          ? "Món chính"
          : selectedItem.category === "side"
            ? "Món phụ"
            : selectedItem.category === "dessert"
              ? "Tráng miệng"
              : selectedItem.category === "beverage"
                ? "Đồ uống"
                : "Không xác định",
    },
    { label: "Mô tả", value: selectedItem.description },
    { label: "Đơn vị khẩu phần", value: selectedItem.unit },
    {
      label: "Giá thành/đơn vị khẩu phần",
      value: `${Number(selectedItem.price ?? 0).toLocaleString("vi-VN")} đ`,
    },
  ];

  return (
    <Container maxWidth="md" className="py-10">
      <div className="flex flex-col md:flex-row gap-10 items-start md:items-center">
        {/* Left - Info */}
        <div className="flex-1 w-full space-y-4">
          {details.map(({ label, value }) => (
            <div key={label} className="flex">
              <Typography
                variant="small"
                className="w-32 min-w-[8rem] font-medium text-gray-700"
              >
                {label}:
              </Typography>
              <Typography
                variant="small"
                className="text-gray-900 whitespace-pre-line"
              >
                {value || "-"}
              </Typography>
            </div>
          ))}
        </div>

        {/* Right - Image */}
        <div className="flex-1 w-full flex justify-center md:justify-end">
          <div className="w-full max-w-[320px] aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <img
              src={selectedItem?.image?.url || "/placeholder.png"}
              alt={selectedItem?.name || "Image"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MenuDetailView;
