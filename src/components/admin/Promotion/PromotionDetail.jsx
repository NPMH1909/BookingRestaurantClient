import React from "react";
import { Typography, Container } from "@mui/material";

const formatDate = (dateString) => {
  if (!dateString) return "Không xác định";
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN");
};

const PromotionDetail = ({ promotions, selectedId }) => {
  const selectedPromotion = promotions?.data?.find(
    (promotion) => promotion._id === selectedId
  );

  if (!selectedPromotion) return <Typography>Không tìm thấy khuyến mãi.</Typography>;

  return (
    <Container>
      <div className="grid grid-cols-3 gap-4">
        <Typography variant="h6">Khuyến mãi:</Typography>
        <Typography className="col-span-2">{selectedPromotion.name}</Typography>

        <Typography variant="h6">Mô tả:</Typography>
        <Typography className="col-span-2">{selectedPromotion.description}</Typography>

        <Typography variant="h6">Giảm giá:</Typography>
        <Typography className="col-span-2">
          {selectedPromotion.discountPercent}%
        </Typography>

        <Typography variant="h6">Ngày bắt đầu:</Typography>
        <Typography className="col-span-2">
          {formatDate(selectedPromotion?.activePeriod?.start)}
        </Typography>

        <Typography variant="h6">Ngày kết thúc:</Typography>
        <Typography className="col-span-2">
          {formatDate(selectedPromotion?.activePeriod?.end)}
        </Typography>
      </div>
    </Container>
  );
};

export default PromotionDetail;
