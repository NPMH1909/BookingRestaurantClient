import React from 'react';

const OrderInfo = ({ selectedOrder, navigate }) => {
  const formatDate = (dateString) => {
    return new Date(
      new Date(dateString).setHours(
        new Date(dateString).getHours() - 7
      )
    ).toLocaleString("vi-VN");
  };

  const getStatusText = (status) => {
    switch (status) {
      case "COMPLETED": return "Hoàn thành";
      case "PENDING": return "Đang chờ";
      case "CANCELLED": return "Đã hủy";
      case "SUCCESS": return "Đặt thành công";
      default: return "Đang nhận bàn";
    }
  };

  return (
    <div>

      <p className="text-gray-700 mb-2">
        <strong className="uppercase text-gray-900">Nhà hàng: </strong>
        <span
          onClick={() => navigate(`/restaurant/${selectedOrder?.restaurantId._id}`)}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          {selectedOrder.restaurantId.name}
        </span>
      </p>
      <p className="text-gray-700 mb-2">
        <strong className="uppercase text-gray-900">Thời gian:</strong>{" "}
        {/* {formatDate(selectedOrder.checkin)} */}
        {new Date(selectedOrder.checkin).toLocaleString("vi-VN")}
      </p>

      <p className="text-gray-700 mb-2">
        <strong className="uppercase text-gray-900">Số người:</strong> {selectedOrder.totalPeople}
      </p>

      <p className="text-gray-700 mb-2">
        <strong className="uppercase text-gray-900">Tổng tiền:</strong>{" "}
        {selectedOrder.total.toLocaleString("vi-VN")}₫
      </p>

      <p className="text-gray-700">
        <strong className="uppercase text-gray-900">Trạng thái:</strong>{" "}
        {getStatusText(selectedOrder.status)}
      </p>
    </div>
  );
};

export default OrderInfo;