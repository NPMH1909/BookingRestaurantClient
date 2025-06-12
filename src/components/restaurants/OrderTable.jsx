import React from 'react';

const OrderTable = ({ orders, onRowClick }) => {
  const getStatusText = (status) => {
    switch (status) {
      case "COMPLETED": return "Hoàn thành";
      case "PENDING": return "Đang chờ";
      case "ONHOLD": return "Đang nhận bàn";
      case "SUCCESS": return "Đặt thành công";
      default: return "Đã hủy";
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "COMPLETED": return "bg-green-100 text-green-700";
      case "PENDING": return "bg-yellow-100 text-yellow-700";
      case "ONHOLD": return "bg-blue-100 text-blue-700";
      case "SUCCESS": return "bg-indigo-100 text-indigo-700";
      default: return "bg-red-100 text-red-700";
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl shadow-md">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-50 uppercase text-gray-600 text-xs">
          <tr>
            <th className="px-6 py-3">Nhà hàng</th>
            <th className="px-6 py-3">Thời gian nhận bàn</th>
            <th className="px-6 py-3">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order._id}
              className="bg-white border-b hover:bg-gray-50 cursor-pointer transition"
              onClick={() => onRowClick(order)}
            >
              <td className="px-6 py-4 font-medium">{order.restaurantId.name}</td>
              <td className="px-6 py-4">
                {new Date(order.checkin).toLocaleString("vi-VN")}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(order.status)}`}
                >
                  {getStatusText(order.status)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;