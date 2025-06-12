import React from 'react'
import HeroSection from '../components/shared/HeroSection'
import { useGetAllRestaurantPromotionExpiredSoonQuery, useGetTopTrustRestaurantQuery } from '../apis/restaurantApi';
import CommonSlider from '../components/shared/CommonSlider';
import { Typography } from '@material-tailwind/react';
import ProductCard from '../components/restaurants/ProductCard';
import MenuCard from '../components/restaurants/MenuCard';
import { useGetBestSellingMenuItemQuery } from '../apis/menuApi';
import PromotionProductCard from '../components/restaurants/PromotionProductCard';
import Loading from '../components/shared/Loading';

const HomePage = () => {
  const {
    data: restaurantsData,
    isLoading: restaurantLoading,
    error: restaurantError,
  } = useGetTopTrustRestaurantQuery()


  const {
    data: menusData,
    isLoading: menuLoading,
    error: menuError,
  } = useGetBestSellingMenuItemQuery();

  const { data: promotionRestaurantsData, error, isLoading } = useGetAllRestaurantPromotionExpiredSoonQuery();

  if (restaurantLoading )
    return (
      <div>
        <Loading />
      </div>
    );
  if (restaurantError ) return <div>Error</div>;
  return (
    <div className='bg-gray-200'>
      <HeroSection />
      <div className='mx-4'>
        <Typography variant="h4" className="text-left mx-12">
          Nhà hàng uy tín
        </Typography>
        <CommonSlider
          dataList={restaurantsData}
          CardComponent={ProductCard}
          uniqueId="restaurants"
        />
      </div>
      <div className='mx-4'>
        <Typography variant="h4" className="text-left mx-12">
          Chương trình khuyến mãi
        </Typography>
        <CommonSlider
          dataList={promotionRestaurantsData}
          CardComponent={PromotionProductCard}
          uniqueId="promotions"
        />
      </div>
      <div className='mx-4'>
        <Typography variant="h4" className="text-left mx-12">
          Món ăn nổi bật
        </Typography>
        <CommonSlider
          dataList={menusData}
          CardComponent={MenuCard}
          uniqueId="menus"
        />
      </div>
    </div>
  )
}

export default HomePage