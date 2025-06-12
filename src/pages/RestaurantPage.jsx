import React, { useState } from "react";
import { useSelector } from "react-redux";
import ShopList from "../components/restaurants/ShopList";
import { useGetAllRestaurantsQuery } from "../apis/restaurantApi";
// import ChatbotButton from "../components/shared/ChatbotButton";
import Loading from "../components/shared/Loading";
import CommonSlider from "../components/shared/CommonSlider";
import { useGetRecommendationsQuery } from "../apis/recommendationApi";
import ProductCard from "../components/restaurants/ProductCard";
import { Typography } from "@material-tailwind/react";

const RestaurantPage = () => {
  const searchTerm = useSelector((state) => state.search.term);
  const [sort, setSort] = useState(-1);
  const [field, setField] = useState("rating");
  const [priceRange, setPriceRange] = useState("all");
  const [page, setPage] = useState(1);
  const [provinceCode, setProvinceCode] = useState("10");
  const [districtCode, setDistrictCode] = useState("");
  const [type, setType] = useState("");
  const [reputable, setReputable] = useState("");
  const isReputable = reputable === 'true' ? true : undefined;
  const { data: recommentRestaurantData, error: recommendError } = useGetRecommendationsQuery()
  const { data: restaurants, error, isLoading } = useGetAllRestaurantsQuery({
    searchTerm,
    sort,
    field,
    priceRange,
    page,
    provinceCode,
    districtCode,
    type,
    isReputable: isReputable
  });

  if (isLoading) {
    return <div><Loading /></div>;
  }

  if (error) {
    return <div>Error loading restaurants.</div>;
  }

  return (
    <div className="bg-gray-200 " >
      {/* <ChatbotButton /> */}
      <div className="grid grid-cols-4 ">
        <ShopList
          restaurants={restaurants}
          setSort={setSort}
          setField={setField}
          setPriceRange={setPriceRange}
          page={page}
          setPage={setPage}
          setProvinceCode={setProvinceCode}
          setDistrictCode={setDistrictCode}
          setType={setType}
          setReputable={setReputable}
          provinceCode={provinceCode}
          districtCode={districtCode}
        />
      </div>
      {!recommendError && (
        <div>
          <Typography variant="h4" className="text-left mx-16 mb-4">
            Gợi ý nhà hàng cho bạn
          </Typography>
          <CommonSlider
            dataList={recommentRestaurantData}
            CardComponent={ProductCard}
          />
        </div>
      )}
    </div>
  );
};

export default RestaurantPage;