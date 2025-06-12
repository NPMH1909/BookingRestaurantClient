import { useState, useEffect } from "react";
import FilterComponent from "./FilterComponent";
import ProductCard from "./ProductCard";
import Pagination from "../shared/Pagination";
import { useGetRestaurantForUserQuery } from "../../apis/restaurantApi";
import { useNavigate } from "react-router-dom";
import Modal from "../shared/Modal";
import { useSpring, animated } from "react-spring";

const ShopList = ({
  restaurants,
  setSort,
  setField,
  setPriceRange,
  setPage,
  page,
  setProvinceCode,
  setDistrictCode,
  setType,
  setReputable,
  provinceCode,
  districtCode
}) => {
  //const { data: suggestedRestaurants = [] } = useGetRestaurantForUserQuery({provinceCode, districtCode});
  const [showModal, setShowModal] = useState(false);
  const [randomRestaurant, setRandomRestaurant] = useState(null);
  const [randomIndex, setRandomIndex] = useState(0);
  const [isRandomizing, setIsRandomizing] = useState(false);

  const filteredRestaurants = restaurants?.data || [];
  const pagination = restaurants?.pagination || { number_of_pages: 0 };
  const navigate = useNavigate();

  const handleSortChange = (value) => {
    const [field, order] = value.split("-");
    setField(field);   // 'price'
    setSort(order);    // 'asc' hoặc 'desc'
    setPage(1);
  };


  const handlePriceChange = (value) => {
    setPriceRange(value);
    setPage(1);
  };

  const handleProvinceChange = (provinceCode) => {
    setProvinceCode(provinceCode);
    setPage(1);
  };

  const handleDistrictChange = (districtCode) => {
    setDistrictCode(districtCode);
    setPage(1);
  };

  const handleTypeChange = (type) => {
    setType(type);
    setPage(1);
  };
  const handleReputationChange = (reputable) => {
    setReputable(reputable);
    setPage(1);
  }
  const handleRandomRestaurant = () => {
    setIsRandomizing(true);
    setShowModal(true);
    let count = 0;
    const intervalId = setInterval(() => {
      if (count >= 15) {
        clearInterval(intervalId);
        setIsRandomizing(false);
        setRandomRestaurant(filteredRestaurants[randomIndex]);
        return;
      }
      setRandomIndex(Math.floor(Math.random() * filteredRestaurants.length));
      count++;
    }, 150);
  };

  useEffect(() => {
    if (filteredRestaurants.length > 0 && randomIndex !== null) {
      setRandomRestaurant(filteredRestaurants[randomIndex]);
    }
  }, [randomIndex, filteredRestaurants]);

  // Hiệu ứng random: opacity, scale, rotate, shake
  const cardAnimation = useSpring({
    opacity: isRandomizing ? 0.5 : 1,
    transform: isRandomizing
      ? `rotate(${Math.random() * 20 - 10}deg) scale(${Math.random() * 0.2 + 0.9})`
      : "rotate(0deg) scale(1)",
    config: { tension: 200, friction: 15 },
    reset: isRandomizing,
  });

  // Hiệu ứng shake nhẹ khi random
  const shakeAnimation = useSpring({
    transform: isRandomizing
      ? `translateX(${Math.random() * 10 - 5}px)`
      : "translateX(0px)",
    config: { tension: 300, friction: 10 },
  });

  return (
    <div className="col-span-4 p-4">
      <div className="flex justify-end mb-4">
        <p
          className="text-blue-600 underline cursor-pointer hover:text-blue-800 focus:outline-none"
          onClick={() => {
            navigate("/nearby");
          }}
        >
          Nhà hàng gần bạn
        </p>
      </div>

      <div className="w-full flex items-center gap-4 justify-between mb-8">
        <div>
          <div>{filteredRestaurants.length} kết quả</div>
          {filteredRestaurants.length > 1 && (
            <div className="text-sm text-gray-500 mt-2">
              Bạn chưa biết đi đâu hôm nay?
              <div>
                <button
                  onClick={handleRandomRestaurant}
                  className="ml-2 text-blue-600 underline hover:text-blue-800 focus:outline-none"
                >
                  Chọn ngẫu nhiên
                </button>
              </div>
            </div>
          )}
        </div>
        <FilterComponent
          handleSort={handleSortChange}
          handlePriceChange={handlePriceChange}
          handleProvinceChange={handleProvinceChange}
          handleDistrictChange={handleDistrictChange}
          handleTypeChange={handleTypeChange}
          handleReputationChange={handleReputationChange}
        />
      </div>

      {filteredRestaurants.length > 0 && (
        <div className="grid grid-cols-4 gap-x-4 gap-y-8">
          {filteredRestaurants.map((restaurant) => (
            <ProductCard key={restaurant._id} {...restaurant} />
          ))}
        </div>
        )}
     

      {pagination.totalPages > 1 && (
        <Pagination page={pagination.totalPages} active={page} setActive={setPage} />
      )}

      {showModal && (
        <Modal>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-center mb-4">
              {isRandomizing ? "Đang chọn nhà hàng ngẫu nhiên..." : "Đi ngay hôm nay"}
            </h3>

            <div className="flex justify-center items-center m-auto mt-10">
              {randomRestaurant ? (
                <animated.div style={{ ...cardAnimation, ...shakeAnimation }}>
                  <ProductCard key={randomRestaurant._id} {...randomRestaurant} />
                </animated.div>
              ) : (
                <p>Không tìm thấy nhà hàng ngẫu nhiên.</p>
              )}
            </div>

            {!isRandomizing && (
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 bg-red-500 text-white px-5 py-2 rounded-lg"
              >
                Đóng
              </button>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ShopList;
