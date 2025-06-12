import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Select,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const EmployeeAddForm = ({
  open,
  handleClose,
  restaurants,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  username,
  setUsername,
  password,
  setPassword,
  restaurant,
  onAddStaff,
  isCreated,
}) => {
  const handleSubmit = () => {
    if (!name || !email || !phone || !password ) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }
    onAddStaff(); // Gọi hàm từ component cha
  };

  return (
    <Dialog maxWidth="lg" open={open} onClose={handleClose}>
      <DialogTitle className="flex justify-between items-center">
        <Typography variant="h4">Thêm mới nhân viên</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div className="grid grid-cols-3 gap-4 my-4">
          <div className="col-span-1 flex items-center justify-center">
            <img
              src="https://www.raiven.com/hs-fs/hubfs/shutterstock_1153673752-no-image-found.jpg?width=500&height=500&name=shutterstock_1153673752-no-image-found.jpg"
              alt="avatar"
              className="h-[200px] w-auto object-cover"
            />
          </div>
          <div className="col-span-2 grid grid-cols-3 gap-4">
            <Typography variant="h6" className="my-auto">Họ và tên:</Typography>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-2"
              size="small"
              placeholder="Nhập họ và tên"
            />

            <Typography variant="h6" className="my-auto">Email:</Typography>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-2"
              size="small"
              placeholder="Nhập email"
            />

            <Typography variant="h6" className="my-auto">Số điện thoại:</Typography>
            <TextField
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="col-span-2"
              size="small"
              placeholder="Nhập số điện thoại"
            />

            <Typography variant="h6" className="my-auto">Mật khẩu:</Typography>
            <TextField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="col-span-2"
              size="small"
              placeholder="Nhập mật khẩu"
            />

            
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}
          disabled={isCreated}
        >
          Thêm mới
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeAddForm;
