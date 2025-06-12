import React from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";

const BookingCard = ({
  people,
  handlePeopleChange,
  date,
  setDate,
  time,
  setTime,
  menu,
  handleRemoveFromCart,
  total,
  handleCheckout,
}) => {
  const today = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toTimeString().slice(0, 5);

  return (
    <div className="">
      <div className="sticky top-20">
        <Card>
          <CardBody>
            <Typography variant="h5" color="black" className="text-center">
              Đặt chỗ
            </Typography>
            <div className="grid grid-cols-2 gap-4 mt-5">
              <Typography variant="h6" className="my-auto">
                Số người
              </Typography>
              <TextField
                size="small"
                value={people}
                onChange={handlePeopleChange}
              />

              <Typography variant="h6" className="my-auto">
                Ngày nhận bàn
              </Typography>
              <TextField
                size="small"
                type="date"
                value={date}
                min={today}
                onChange={(e) => {
                  const selectedDate = e.target.value;
                  if (selectedDate < today) {
                    setDate(today);
                  } else {
                    setDate(selectedDate);
                  }
                }}
              />

              <Typography variant="h6" className="my-auto">
                Thời gian đến
              </Typography>
              <TextField
                size="small"
                type="time"
                value={time}
                min={date === today ? currentTime : "00:00"}
                onChange={(e) => {
                  const selectedTime = e.target.value;
                  if (date === today && selectedTime < currentTime) {
                    setTime(currentTime);
                  } else {
                    setTime(selectedTime);
                  }
                }}
              />
            </div>

            <Typography variant="h6" className="my-auto mt-5">
              Thực đơn
            </Typography>

            {menu &&
              menu.length > 0 &&
              menu.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between gap-4 mt-5"
                >
                  <Typography variant="medium" className="my-auto w-[125px]">
                    {item.name}
                  </Typography>
                  <Typography variant="medium" className="my-auto">
                    {item.quantity}x
                  </Typography>
                  {item.promotion ? (
                    <Typography variant="medium" className="my-auto">
                      {Number(
                        item.price * (1 - item?.promotion?.discountPercent / 100)
                      ).toLocaleString("en-US")}{" "}
                      đ
                    </Typography>
                  ) : (
                    <Typography variant="medium" className="my-auto">
                      {Number(
                        item.price
                      ).toLocaleString("en-US")}{" "}
                      đ
                    </Typography>
                  )}
                  <IconButton
                    color="red"
                    onClick={() => handleRemoveFromCart(item)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}

            <div className="flex items-center justify-between gap-4 mt-5">
              <Typography variant="h6" className="my-auto">
                Tổng cộng
              </Typography>
              <Typography variant="h6" className="my-auto">
                {Number(total.toFixed(0)).toLocaleString("en-US")} đ
              </Typography>
            </div>

            <Button
              variant="outlined"
              className="mt-5 w-full"
              color="blue"
              onClick={handleCheckout}
              disabled={people <= 0}
            >
              Đặt chỗ
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default BookingCard;
