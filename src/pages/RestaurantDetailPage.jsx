import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RestaurantImages from '../components/restaurants/RestaurantImages';
import Loading from '../components/shared/Loading';
import { useCheckFavoriteQuery, useGetRencentlyRestaurantForUserQuery, useGetRestaurantByIdQuery, useGetTopTrustRestaurantQuery, useGetUserFavoritesQuery, useToggleFavoriteMutation } from '../apis/restaurantApi';
import RestaurantBasicInfo from '../components/restaurants/RestaurantBasicInfo';
import RestaurantDescription from '../components/restaurants/RestaurantDescription';
import { useGetAllMenuTypesQuery, useGetMenuByRestaurantQuery } from '../apis/menuApi';
import MenuSection from '../components/restaurants/MenuSection';
import BookingCard from '../components/restaurants/BookingCard';
import { useEffect } from 'react';
import { useLogRestaurantViewMutation } from '../apis/viewLogApi';
import { useRef } from 'react';
import { useGetReviewsByRestaurantQuery } from '../apis/reviewApi';
import CommentSection from '../components/restaurants/CommentSection';
import { Card, CardBody } from '@material-tailwind/react';
import { Typography } from '@material-tailwind/react';
import CommonSlider from '../components/shared/CommonSlider';
import ProductCard from '../components/restaurants/ProductCard';
import ChatButton from '../components/shared/ChatButton';
import { useGetMostLikeVideosByResIdQuery } from '../apis/videoApi';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [menuPage, setMenuPage] = useState(1)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [logView] = useLogRestaurantViewMutation();
  const [localFavorite, setLocalFavorite] = useState(false);
  const {
    data: trustRestaurantsData,
    isLoading: trustRestaurantLoading,
    error: trustRestaurantError,
  } = useGetTopTrustRestaurantQuery()
  const loggedRef = useRef(false);
  const userId = localStorage.getItem("userId"); // Lấy userId từ localStorage
  const userName = localStorage.getItem("userName")
  useEffect(() => {
    if (!id || loggedRef.current) return;

    logView({ restaurantId: id });
    loggedRef.current = true;
  }, [id, logView]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  const [people, setPeople] = useState(
    JSON.parse(localStorage.getItem("order"))?.totalPeople || 0
  );
  const [menu, setMenu] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("menu")) || [];
    } catch (error) {
      console.error("Failed to parse menu from localStorage:", error);
      return [];
    }
  });
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [time, setTime] = useState(
    JSON.parse(localStorage.getItem("order"))
      ? JSON.parse(localStorage.getItem("order"))
        ?.checkin?.split("T")[1]
        ?.split(".")[0]
        ?.split(":")
        ?.slice(0, 2)
        ?.join(":")
      : null
  );
  const [total, setTotal] = useState(
    JSON.parse(localStorage.getItem("total")) || 0
  );
  useEffect(() => {
    localStorage.setItem("total", JSON.stringify(total));
  }, [total]);

  const { data: rencentRestaurant } = useGetRencentlyRestaurantForUserQuery();
  const token = localStorage.getItem("token")
  const { data: restaurants, error: restaurantError, isLoading: restaurantLoading } = useGetRestaurantByIdQuery(id);
  const {
    data: menus,
    error: menuError,
    isLoading: menuLoading
  } = useGetMenuByRestaurantQuery({
    restaurantId: id,
    type: selectedCategory,
    page: menuPage,
  });

  const { data: typeData, isLoading } = useGetAllMenuTypesQuery(id);
  const [toggleFavorite] = useToggleFavoriteMutation();
  const { data: favoriteData, refetch: refetchFavorite } = useCheckFavoriteQuery(
    { restaurantId: id },
  );

  useEffect(() => {
    if (favoriteData?.isFavorite !== undefined) {
      setLocalFavorite(favoriteData.isFavorite);
    }
  }, [favoriteData]);


  const handleToggleFavorite = async () => {
    const oldState = localFavorite;
    setLocalFavorite((prev) => !prev);

    try {
      await toggleFavorite(id).unwrap();
      refetchFavorite();
    } catch (err) {
      setLocalFavorite(oldState);
      console.error("Toggle favorite failed", err);
    }
  };
  const {
    data: reviews,
    isLoading: reviewLoading,
    error: reviewError,
    refetch
  } = useGetReviewsByRestaurantQuery({ restaurantId: id })
  const {
    data: mostLikedVideo,
    isLoading: mostLikeLoading,
    error: mostLikeError
  } = useGetMostLikeVideosByResIdQuery(id)
  const typeLabelMap = {
    main: "Món chính",
    side: "Món phụ",
    dessert: "Tráng miệng",
    beverage: "Đồ uống",
  };

  const typeFilters = [
    { label: "Tất cả", value: "" },
    ...(typeData?.data || []).map((type) => ({
      label: typeLabelMap[type] || type,
      value: type,
    })),
  ];

  const handleCategoryClick = (value) => {
    setSelectedCategory(value);
    setMenuPage(1);
  };


  const handlePeopleChange = (e) => {
    const newPeople =
      e.target.value < 0 || isNaN(e.target.value) ? 0 : Number(e.target.value);
    setPeople(newPeople);
    const newTotal = calculateTotal(menu, newPeople);
    setTotal(newTotal);
    const storedOrders = JSON.parse(localStorage.getItem("order")) || {};
    storedOrders[id] = {
      menu: menu,
      total: newTotal,
      people: newPeople,
      date: date,
      time: time,
    };
    localStorage.setItem("order", JSON.stringify(storedOrders));
  };
  const calculateTotal = (menu, people) => {
    const baseTotal = menu.reduce((acc, item) => {
      const discountPercent = item?.promotion?.discountPercent || 0;
      const priceAfterDiscount = item.price * (1 - discountPercent / 100);
      return acc + priceAfterDiscount * item.quantity;
    }, 0);

    const additionalPeople = people > 10 ? people : 0;
    const additionalCost =
      additionalPeople * restaurants.data.rangePrice.from * 0.5;

    return baseTotal + additionalCost;
  };

  const handleRemoveFromCart = (item) => {
    const newMenu = [...menu];
    const index = newMenu.findIndex((i) => i._id === item._id);
    if (index !== -1) {
      if (newMenu[index].quantity === 1) {
        newMenu.splice(index, 1);
      } else {
        newMenu[index].quantity--;
      }
      setMenu(newMenu);
      const newTotal = calculateTotal(newMenu, people);
      setTotal(newTotal);
      const storedOrders = JSON.parse(localStorage.getItem("order")) || {};
      storedOrders[id] = {
        menu: newMenu,
        total: newTotal,
        people: people,
        date: date,
        time: time,
      };
      localStorage.setItem("order", JSON.stringify(storedOrders));
    }
  };
  const handleCheckout = () => {
    const token = localStorage.getItem("token")

    if (!token) {
      navigate("/login");
      return;
    }

    const result = {
      userId,
      restaurantName: restaurants.data.name,
      totalPeople: people,
      total: total,
      menu: menu,
      checkin: date + "T" + time + ":00.000Z",
      restaurantId: id,
    };

    const storedOrders = JSON.parse(localStorage.getItem("order")) || {};
    storedOrders[id] = result;
    localStorage.setItem("order", JSON.stringify(storedOrders));

    navigate("/checkout", { state: { restaurantId: id } });
  };



  const handleItemModalClick = () => { }

  const handleAddToCart = (item) => {
    const newMenu = [...menu];
    const index = newMenu.findIndex((i) => i._id === item._id);
    if (index === -1) {
      newMenu.push({ ...item, quantity: 1 });
    } else {
      newMenu[index].quantity++;
    }
    setMenu(newMenu);

    const newTotal = calculateTotal(newMenu, people);
    setTotal(newTotal);

    const storedOrders = JSON.parse(localStorage.getItem("order")) || {};
    storedOrders[id] = {
      menu: newMenu,
      total: newTotal,
      people: people,
      date: date,
      time: time,
    };
    localStorage.setItem("order", JSON.stringify(storedOrders));
  };
  const handleCloseDialog = () => { }

  if (restaurantLoading && menuLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (restaurantError && menuError) return <div>Error</div>;

  return (
    <div>
      <div className="grid grid-cols-3 gap-8 m-4">
        <RestaurantImages
          restaurant={restaurants?.data}
          localFavorite={localFavorite}
          handleToggleFavorite={handleToggleFavorite}
        />
        <div className="col-span-2">
          <RestaurantBasicInfo restaurant={restaurants?.data} />
          <RestaurantDescription restaurant={restaurants?.data} mostVideo={mostLikedVideo} />
          <MenuSection
            menus={menus}
            menuPage={menuPage}
            setMenuPage={setMenuPage}
            handleCategoryClick={handleCategoryClick}
            handleItemModalClick={handleItemModalClick}
            handleAddToCart={handleAddToCart}
            isDialogOpen={isDialogOpen}
            handleCloseDialog={handleCloseDialog}
            selectedItem={selectedItem}
            selectedCategory={selectedCategory}
            typeFilters={typeFilters}
          />
          <CommentSection
            reviews={reviews}
            reviewLoading={reviewLoading}
            reviewError={reviewError}
          // page={page}
          // setPage={setPage}
          />
          <Card className='mt-4'>
            <CardBody>
              <Typography variant="h3" color="black" className="mb-6 font-extrabold tracking-wide">
                Nhà hàng uy tín
              </Typography>
              <CommonSlider
                dataList={trustRestaurantsData}
                CardComponent={ProductCard}
                slidesPerView={3}
                uniqueId="recomended"
              />
            </CardBody>
          </Card>
          <Card>
            {token && (
              <CardBody>
                <Typography variant="h3" color="black" className="mb-6 font-extrabold tracking-wide">
                  Đã xem gần đây
                </Typography>
                <CommonSlider
                  dataList={rencentRestaurant}
                  CardComponent={ProductCard}
                  slidesPerView={3}
                  uniqueId="rencent"
                />
              </CardBody>
            )}
          </Card>
        </div>
        <BookingCard
          people={people}
          handlePeopleChange={handlePeopleChange}
          date={date}
          setDate={setDate}
          time={time}
          setTime={setTime}
          menu={menu}
          //promotionValue={promotionValue}
          handleRemoveFromCart={handleRemoveFromCart}
          total={total}
          handleCheckout={handleCheckout}
        />
      </div>
      <ChatButton userId={userId} ownerId={restaurants?.data?.userId?._id} restaurantId={restaurants?.data?._id} userName={userName} />
    </div>
  )
}

export default RestaurantDetailPage