import { useState } from 'react';
import {
  HeartIcon as HeartSolid,
} from '@heroicons/react/24/solid';
import {
  HeartIcon as HeartOutline,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

const RestaurantImages = ({ restaurant, localFavorite, handleToggleFavorite }) => {
  const [showAllImages, setShowAllImages] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!restaurant) return null;
  const { mainImage, galleryImages = [] } = restaurant;

  const allImages = [mainImage, ...galleryImages];
  const visibleImages = galleryImages.slice(0, 4);
  const hasMoreImages = galleryImages.length > 4;

  const handleOpenGallery = () => {
    setSelectedIndex(0); // Chọn ảnh chính khi mở gallery
    setShowAllImages(true);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % allImages.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <>
      {/* Ảnh chính */}
      <div className="relative col-span-2">
        <img
          src={mainImage.url}
          className="w-full h-80 object-cover rounded-lg"
          alt="restaurant"
        />
        <button
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/30 transition"
        >
          {localFavorite ? (
            <HeartSolid className="w-6 h-6 text-red-500 drop-shadow-lg" />
          ) : (
            <HeartOutline className="w-6 h-6 text-white drop-shadow-lg" />
          )}
        </button>
      </div>

      {/* Ảnh nhỏ */}
      <div className="grid grid-cols-2 gap-8">
        {visibleImages.map((img, index) => (
          <div key={index} className="relative">
            <img
              src={img.url}
              className="h-36 w-full object-cover rounded-lg"
              alt={`gallery-${index}`}
            />
            {hasMoreImages && index === 3 && (
              <div
                onClick={handleOpenGallery}
                className="absolute inset-0 bg-gray-400/50 flex items-center justify-center cursor-pointer"
              >
                <span className="text-white">Xem tất cả</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Fullscreen Gallery */}
      {showAllImages && (
        <div className="fixed inset-0 bg-black z-50 flex">
          {/* Cột trái: ảnh nhỏ */}
          <div className="w-1/4 bg-white overflow-y-auto p-4">
            <button
              onClick={() => setShowAllImages(false)}
              className="text-black mb-4 flex items-center gap-2"
            >
              <ChevronLeftIcon className="w-6 h-6" />
              Tất cả hình ảnh
            </button>

            <div className="grid grid-cols-2 gap-2">
              {allImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={`thumb-${idx}`}
                  onClick={() => setSelectedIndex(idx)}
                  className={`cursor-pointer rounded-lg object-cover h-24 w-full transition duration-200 border-2 ${selectedIndex === idx
                      ? 'border-white opacity-100'
                      : 'border-transparent opacity-40 hover:opacity-80'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Cột phải: slider ảnh lớn */}
          <div className="w-3/4 flex items-center justify-center bg-gray-600 relative">
            <button
              onClick={handlePrev}
              className="absolute left-4 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            <div className="w-[800px] h-[500px] bg-white overflow-hidden flex items-center justify-center">
              <img
                src={allImages[selectedIndex]?.url}
                alt="selected"
                className="w-full h-full object-cover"
              />
            </div>

            <button
              onClick={handleNext}
              className="absolute right-4 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantImages;
