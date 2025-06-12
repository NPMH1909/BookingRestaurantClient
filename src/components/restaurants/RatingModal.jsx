import React from 'react';
import { StarIcon } from '@heroicons/react/24/outline';

const RatingModal = ({ 
  showRatingForm, 
  rating, 
  onStarClick, 
  onSubmit, 
  onClose, 
  isSubmitting 
}) => {
  if (!showRatingForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Đánh giá nhà hàng
        </h2>

        <p className="text-center text-gray-600 mb-6">
          Bạn cảm thấy nhà hàng thế nào?
        </p>

        <div className="flex justify-center mb-5">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              onClick={() => onStarClick(star)}
              className={`w-10 h-10 mx-2 cursor-pointer transition-all duration-150
              ${rating >= star ? "text-yellow-400" : "text-gray-300"}
              ${rating >= star ? "fill-current" : "stroke-current"}`}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            className="px-5 py-2.5 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium transition"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Hủy
          </button>
          <button
            className="px-6 py-2.5 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition"
            onClick={onSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;