import Loading from "../components/shared/Loading";
import { useGetFavoritesQuery } from "../apis/userApi";
import ProductCard from "../components/restaurants/ProductCard";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useGetUserFavoritesQuery } from "../apis/restaurantApi";

const FavoriteRestaurantPage = () => {
  const { data, isLoading, refetch  } = useGetUserFavoritesQuery();

  const location = useLocation();

  useEffect(() => {
    refetch(); 
  }, [location.pathname]);
  if (isLoading) return <p><Loading /></p>;

  if (!data?.data || data.data.length === 0) return <p>Không có nhà hàng yêu thích</p>;

  return (
    <div className="max-w-7xl mx-auto p-5 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-5 text-center">Nhà hàng yêu thích</h1>

      <div className="mx-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.data.map((restaurant) => (
          <ProductCard key={restaurant._id} {...restaurant} />
        ))}
      </div>
    </div>

  );
};



export default FavoriteRestaurantPage;
