import React from 'react';

const MenuTable = ({ menuItems, onReviewClick }) => {
  if (!menuItems || menuItems.length === 0) return null;

  return (
    <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-md my-4">
      <thead className="bg-gray-200">
        <tr>
          <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700"></th>
          <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700 w-[120px]">Hình ảnh</th>
          <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700">Tên món ăn</th>
          <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700">Số lượng</th>
          <th className="border border-gray-300 px-6 py-3 text-center text-sm font-semibold text-gray-700"></th>
        </tr>
      </thead>
      <tbody>
        {menuItems.map((item, index) => (
          <tr
            key={item._id}
            className="border border-gray-300 hover:bg-gray-50 transition-all duration-200"
          >
            <td className="border border-gray-300 px-6 py-4 text-center text-sm font-medium text-gray-800">
              {index + 1}
            </td>
            <td className="border border-gray-300 px-6 py-4 text-center">
              <img
                className="h-16 w-16 object-cover rounded-lg shadow-md"
                src={item.image.url}
                alt={item.name}
              />
            </td>
            <td className="border border-gray-300 px-6 py-4 text-sm font-medium text-gray-800">
              {item.name}
            </td>
            <td className="border border-gray-300 px-6 py-4 text-center text-sm font-medium text-gray-800">
              {item.quantity}
            </td>
            <td className="border border-gray-300 px-6 py-4 text-center">
              <button
                onClick={() => onReviewClick(item)}
                className="text-blue-500 hover:text-blue-700 text-sm font-semibold underline transition-all duration-200"
              >
                Đánh giá
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MenuTable;