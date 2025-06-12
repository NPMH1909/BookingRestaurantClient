import {
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";

const PromotionUpdateForm = ({
  updateName,
  setUpdateName,
  updateDescription,
  setUpdateDescription,
  updateDiscountPercent,
  setUpdateDiscountPercent,
  updateActivePeriod,
  setUpdateActivePeriod,
}) => {
  return (
    <Container>
      <div className="grid grid-cols-5 gap-4 mt-2">
        {/* Tên chương trình */}
        <FormControl fullWidth className="col-span-2">
          <Typography variant="h6" className="my-auto">Tên chương trình:</Typography>
          <TextField
            label="Tên"
            placeholder="Tên chương trình"
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
          />
        </FormControl>

        {/* Mô tả */}
        <FormControl fullWidth className="col-span-2">
          <Typography variant="h6" className="my-auto">Mô tả:</Typography>
          <TextField
            label="Mô tả"
            value={updateDescription}
            onChange={(e) => setUpdateDescription(e.target.value)}
          />
        </FormControl>

        {/* Giảm giá (%) */}
        <FormControl fullWidth className="col-span-2 mt-5">
          <Typography variant="h6" className="my-auto">Giảm giá (%):</Typography>
          <TextField
            size="sm"
            placeholder="Giảm giá (%)"
            value={updateDiscountPercent}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              setUpdateDiscountPercent(isNaN(val) || val < 0 ? 0 : val);
            }}
          />
        </FormControl>

        {/* Ngày bắt đầu */}
        <FormControl fullWidth className="col-span-2 mt-5">
          <Typography variant="h6" className="my-auto">Ngày bắt đầu:</Typography>
          <TextField
            type="date"
            value={updateActivePeriod.start}
            onChange={(e) =>
              setUpdateActivePeriod((prev) => ({
                ...prev,
                start: e.target.value,
              }))
            }
          />
        </FormControl>

        {/* Ngày kết thúc */}
        <FormControl fullWidth className="col-span-2 mt-5">
          <Typography variant="h6" className="my-auto">Ngày kết thúc:</Typography>
          <TextField
            type="date"
            value={updateActivePeriod.end}
            onChange={(e) =>
              setUpdateActivePeriod((prev) => ({
                ...prev,
                end: e.target.value,
              }))
            }
          />
        </FormControl>
      </div>
    </Container>
  );
};

export default PromotionUpdateForm;
