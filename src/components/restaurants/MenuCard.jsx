import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Rating } from "@mui/material";

const MenuCard = ({ _id, unit, image, name, restaurantId, price, rating }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="cursor-pointer w-full bg-white rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col"
      onClick={() => navigate("/restaurant/" + _id)}
    >
      <CardHeader
        shadow={false}
        floated={false}
        className="relative h-48 overflow-hidden rounded-t-2xl"
      >
        <img
          src={image?.url}
          alt={name}
          className="object-cover w-full h-full"
        />
      </CardHeader>

      <CardBody className="flex flex-col items-center justify-center px-4 pt-3 pb-1 text-center">
        <Typography variant="h6" className="font-semibold text-lg line-clamp-1">
          {name}
        </Typography>

        <Typography className="text-blue-600 font-bold text-base mt-1">
          {price.toLocaleString()}đ / {unit}
        </Typography>

        <Typography className="text-gray-800 text-sm font-bold mt-1 line-clamp-1">
          {restaurantId?.name}
        </Typography>

        <Typography className="text-gray-500 text-sm my-2 line-clamp-1">
          {restaurantId?.address?.detail && `${restaurantId.address.detail}, `}
          {restaurantId?.address?.district &&
            (["1", "3", "4", "5", "6", "7", "8", "10", "11", "12"].includes(restaurantId.address.district)
              ? `Q.${restaurantId.address.district}`
              : restaurantId.address.district)}
          {restaurantId?.address?.province && `, ${restaurantId.address.province}`}
        </Typography>
      </CardBody>

      {rating !== undefined && (
        <CardFooter className="flex justify-center pt-0 pb-4">
          <Rating value={rating} precision={0.5} readOnly size="small" />
        </CardFooter>
      )}
    </Card>
  );
};

MenuCard.propTypes = {
  _id: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number,
  restaurantId: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.shape({
      detail: PropTypes.string,
      district: PropTypes.string,
      province: PropTypes.string,
    }),
  }).isRequired,
};

export default MenuCard;
