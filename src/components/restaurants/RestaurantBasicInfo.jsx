import { Card, CardBody, Typography } from "@material-tailwind/react";

const RestaurantBasicInfo = ({ restaurant }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
  return (
    <Card>
      <CardBody>
        <Typography variant="h3" color="black">
          {restaurant?.name}
        </Typography>

        <div className="grid grid-cols-4 my-4">
          <Typography variant="h6">Thời gian hoạt động:</Typography>
          <Typography variant="medium" className="col-span-3">
            {restaurant?.workingHours.open} - {restaurant?.workingHours.close}
          </Typography>
        </div>

        <div className="grid grid-cols-4 my-4">
          <Typography variant="h6">Địa chỉ:</Typography>
          <Typography variant="medium" className="col-span-3">
            {restaurant?.address?.detail},{" "}
            {["1", "3", "4", "5", "6", "7", "8", "10", "11", "12"].includes(
              restaurant?.address?.district
            )
              ? `Q.${restaurant?.address?.district}`
              : restaurant?.address?.district}
            , {restaurant?.address?.province}
          </Typography>
        </div>

        <div className="grid grid-cols-4 my-4">
          <Typography variant="h6">Giá:</Typography>
          <Typography variant="medium" className="col-span-3">
            {Number(restaurant?.rangePrice?.from).toLocaleString("en-US")} -
            {Number(restaurant?.rangePrice?.to).toLocaleString("en-US")} đ/ người
          </Typography>
        </div>

        {restaurant?.promotion && (
          <div className="grid grid-cols-4 my-4">
            <Typography variant="h6">Khuyến mãi:</Typography>
            <div className="col-span-3">
              <Typography variant="medium" className="mb-2 text-red-600">
                <p>Giảm giá lên đến {restaurant?.promotion?.discountPercent}% </p>
              </Typography>
              <Typography variant="medium" className="mb-2 text-red-600">
                <p>{restaurant?.promotion?.description}</p>
              </Typography>
              <Typography variant="medium" className="text-red-600">
                {` Áp dụng từ ${formatDate(restaurant?.promotion?.activePeriod?.start)} đến ${formatDate(
                  restaurant?.promotion?.activePeriod?.end
                )}`}
              </Typography>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default RestaurantBasicInfo;
