import React from "react";
import { Container, Typography, Modal, Box, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const styleModal = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  maxHeight: '80vh',
  overflowY: 'auto',
  width: '80vw',
  borderRadius: 4,
};

const RestaurantDetailView = ({
  mainImage,
  galleryImages = [],
  updateName,
  updateAddress,
  rangePrice = { from: 0, to: 0 },
  workingHours = { open: "", close: "" },
  updateDescription,
}) => {
  const [openGalleryModal, setOpenGalleryModal] = React.useState(false);

  const handleOpenModal = () => setOpenGalleryModal(true);
  const handleCloseModal = () => setOpenGalleryModal(false);

  const maxVisibleImages = 4;
  const showMoreCount = galleryImages.length - maxVisibleImages;

  const formatPriceRange = (range) => {
    if (range.from && range.to) {
      return `${Number(range.from).toLocaleString()} đ - ${Number(range.to).toLocaleString()} đ`;
    } else if (range.from) {
      return `Từ ${Number(range.from).toLocaleString()} đ`;
    } else if (range.to) {
      return `Đến ${Number(range.to).toLocaleString()} đ`;
    }
    return "Chưa cập nhật";
  };

  return (
    <Container>
      <div className="grid grid-cols-2 gap-4">
        {/* Bên trái: Hình ảnh */}
        <div>
          <img
            src={mainImage?.url}
            alt="avatar"
            className="h-[200px] w-full object-cover rounded-md"
          />
          {galleryImages.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {galleryImages.slice(0, maxVisibleImages).map((img, idx) => {
                if (idx === maxVisibleImages - 1 && galleryImages.length > maxVisibleImages) {
                  return (
                    <div key={idx} className="relative cursor-pointer" onClick={handleOpenModal}>
                      <img src={img?.url} alt={`gallery-${idx + 1}`} className="h-[120px] w-full object-cover rounded-md" />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                        <Typography variant="h6" className="text-white">+{showMoreCount} Xem thêm</Typography>
                      </div>
                    </div>
                  );
                }
                return (
                  <img
                    key={idx}
                    src={img?.url}
                    alt={`gallery-${idx + 1}`}
                    className="h-[120px] w-full object-cover rounded-md"
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Bên phải: Thông tin */}
        <div className="space-y-4">
          <div>
            <Typography variant="subtitle2" className="uppercase text-gray-700">Tên</Typography>
            <Typography variant="body1">{updateName}</Typography>
          </div>

          <div>
            <Typography variant="subtitle2" className="uppercase text-gray-700">Địa chỉ</Typography>
            <Typography variant="body1">
              {updateAddress?.detail}, {updateAddress?.district}, {updateAddress?.province}
            </Typography>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Typography variant="subtitle2" className="uppercase text-gray-700">Giá mỗi người</Typography>
              <Typography variant="body1">{formatPriceRange(rangePrice)}</Typography>
            </div>
            <div>
              <Typography variant="subtitle2" className="uppercase text-gray-700">Giờ mở cửa</Typography>
              <Typography variant="body1">{workingHours.open}</Typography>
            </div>
            <div>
              <Typography variant="subtitle2" className="uppercase text-gray-700">Giờ đóng cửa</Typography>
              <Typography variant="body1">{workingHours.close}</Typography>
            </div>
          </div>

          <div>
            <Typography variant="subtitle2" className="uppercase text-gray-700">Mô tả chi tiết</Typography>
            <Typography variant="body1" className="whitespace-pre-line max-h-[15rem] overflow-y-auto">
              {updateDescription}
            </Typography>
          </div>
        </div>
      </div>


      {/* Modal xem toàn bộ gallery */}
      <Modal
        open={openGalleryModal}
        onClose={handleCloseModal}
        aria-labelledby="gallery-modal-title"
        aria-describedby="gallery-modal-description"
      >
        <Box sx={{ ...styleModal, position: 'relative' }}>
          <div>
            <Typography variant="h6" fontWeight="bold">
              Thư viện ảnh
            </Typography>
            <IconButton
              onClick={handleCloseModal}
              sx={{ position: 'absolute', top: 8, right: 8, zIndex: 10 }}
            >
              <CloseIcon />
            </IconButton>
          </div>

          {/* Vùng cuộn ảnh */}
          <div className="grid grid-cols-3 gap-4 overflow-auto max-h-[60vh] p-4 pt-12">
            {galleryImages.map((img, idx) => (
              <img
                key={idx}
                src={img?.url}
                alt={`gallery-full-${idx + 1}`}
                className="object-cover rounded-md w-full max-h-[150px]"
              />
            ))}
          </div>
        </Box>

      </Modal>
    </Container>
  );
};


export default RestaurantDetailView;
