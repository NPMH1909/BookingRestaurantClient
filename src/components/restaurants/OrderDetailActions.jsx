import React from 'react';

const OrderDetailActions = ({
  selectedOrder,
  onClose,
  onRate,
  onCancel
}) => {
  return (
    <div className="mt-6 flex flex-wrap gap-4 justify-center">
      <button
        className="bg-white text-gray-800 font-semibold px-5 py-2 rounded-xl border border-gray-300 shadow transition transform duration-200 hover:shadow-lg hover:-translate-y-0.5"
        onClick={onClose}
      >
        Đóng
      </button>

      {selectedOrder.status === "COMPLETED" && selectedOrder.rating === 0 && (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-xl shadow transition duration-200"
          onClick={onRate}
        >
          Đánh giá
        </button>
      )}

      {selectedOrder.status === "PENDING" && (
        <button
          className="bg-red-500 text-white font-semibold px-5 py-2 rounded-xl shadow-md transition transform duration-200 hover:bg-red-600 hover:shadow-lg hover:-translate-y-0.5"
          onClick={onCancel}
        >
          Hủy đặt bàn
        </button>
      )}
    </div>
  );
};

export default OrderDetailActions;