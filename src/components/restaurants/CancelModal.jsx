import React from 'react';

const CancelModal = ({ show, onConfirm, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <p>Bạn chắc chắn muốn hủy đơn hàng này?</p>
        <div className="mt-4 flex justify-between">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Xác nhận hủy
          </button>
          <button
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;