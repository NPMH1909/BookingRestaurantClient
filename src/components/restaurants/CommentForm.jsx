import React from 'react';

const CommentForm = ({
  showCommentForm,
  reviewContent,
  setReviewContent,
  selectedImage,
  fileInputRef,
  onFileChange,
  onImageRemove,
  onSubmit,
  onSkip,
  isSubmitting
}) => {
  if (!showCommentForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl animate-fade-in">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
          Chia sẻ trải nghiệm của bạn
        </h2>

        <span className="text-center text-gray-600 mb-6">
          Hãy chia sẻ nhận xét về trải nghiệm của bạn tại nhà hàng
        </span>

        <textarea
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)}
          placeholder="Hãy chia sẻ trải nghiệm của bạn với nhà hàng..."
          className="w-full h-40 p-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none mb-4"
        />

        <div className="mb-4">
          <span className="text-sm text-gray-600 mb-2">Thêm hình ảnh (tùy chọn)</span>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              className="border p-2 rounded-md flex-1"
              ref={fileInputRef}
              onChange={onFileChange}
              accept="image/*"
            />
          </div>

          {selectedImage && (
            <div className="mt-3">
              <div className="relative inline-block">
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="h-32 w-auto object-cover rounded-md"
                />
                <button
                  onClick={onImageRemove}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            className="px-5 py-2.5 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium transition"
            onClick={onSkip}
            disabled={isSubmitting}
          >
            Bỏ qua
          </button>
          <button
            className="px-6 py-2.5 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition"
            onClick={onSubmit}
            disabled={isSubmitting || !reviewContent.trim()}
          >
            {isSubmitting ? "Đang gửi..." : "Gửi nhận xét"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;