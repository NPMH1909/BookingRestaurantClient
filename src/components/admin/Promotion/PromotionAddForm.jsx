// components/PromotionDialog.jsx

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Container,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PromotionAddForm = ({
  open,
  handleClose,
  handleAddSubmit,
  name,
  setName,
  description,
  setDescription,
  discountPercent,
  setDiscountPercent,
  activePeriod,
  setActivePeriod,
}) => {
  return (
    <Dialog maxWidth="md" open={open} onClose={handleClose} fullWidth>
      <DialogTitle className="pb-0 flex justify-between">
        <Typography variant="h4">Thêm chương trình khuyến mãi</Typography>
        <IconButton
          className="border-none"
          variant="outlined"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Container>
          <div className="grid grid-cols-5 gap-4 mt-2">
            {/* Tên chương trình */}
            <FormControl fullWidth className="col-span-2">
              <Typography variant="h6">Tên chương trình:</Typography>
              <TextField
                label="Tên"
                placeholder="Tên chương trình"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            {/* Mô tả */}
            <FormControl fullWidth className="col-span-2">
              <Typography variant="h6">Mô tả:</Typography>
              <TextField
                label="Mô tả"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            {/* Giảm giá */}
            <FormControl fullWidth className="col-span-2 mt-5">
              <Typography variant="h6">Giảm giá (%):</Typography>
              <TextField
                size="sm"
                placeholder="Giảm giá (%)"
                value={discountPercent}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setDiscountPercent(isNaN(val) || val < 0 ? 0 : val);
                }}
              />
            </FormControl>

            {/* Ngày bắt đầu */}
            <FormControl fullWidth className="col-span-2 mt-5">
              <Typography variant="h6">Ngày bắt đầu:</Typography>
              <TextField
                type="date"
                value={activePeriod.start}
                onChange={(e) =>
                  setActivePeriod((prev) => ({ ...prev, start: e.target.value }))
                }
              />
            </FormControl>

            {/* Ngày kết thúc */}
            <FormControl fullWidth className="col-span-2 mt-5">
              <Typography variant="h6">Ngày kết thúc:</Typography>
              <TextField
                type="date"
                value={activePeriod.end}
                onChange={(e) =>
                  setActivePeriod((prev) => ({ ...prev, end: e.target.value }))
                }
              />
            </FormControl>
          </div>
        </Container>
      </DialogContent>

      <DialogActions>
        <Button variant="gradient" color="green" onClick={handleAddSubmit}>
          <span>Thêm Mới</span>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PromotionAddForm;
