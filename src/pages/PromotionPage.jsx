import { useState } from "react";
import ShopListPromotion from "../components/restaurants/ShopListPromotion";
import { useGetAllRestaurantPromotionQuery } from "../apis/restaurantApi";
import Loading from "../components/shared/Loading";

const PromotionPage = () => {
  const [page, setPage] = useState(1);

  const { data: restaurants, error, isLoading } = useGetAllRestaurantPromotionQuery({
    page
  });

  if (isLoading) {
    return <div><Loading/></div>;
  }

  if (error) {
    return <div>Error loading restaurants.</div>;
  }

  return (
    <div  className="bg-gray-200">

      <div className="mb-5"></div>
      <div className="grid grid-cols-4 mt-5">
        <ShopListPromotion
          restaurants={restaurants}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default PromotionPage;

