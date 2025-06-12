// components/MenuUpdateForm.js
import React from "react";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const MenuUpdateForm = ({
  updateRestaurant,
  setUpdateRestaurant,
  updateName,
  setUpdateName,
  updateCategory,
  setUpdateCategory,
  updateCode,
  setUpdateCode,
  updatePrice,
  setUpdatePrice,
  updateUnit,
  setUpdateUnit,
  updateDescription,
  setUpdateDescription,
  fileInputRef,
  handleImageChange,
  imagePreview,
  handleRemoveImage,
  restaurants,
}) => {
  return (

    <Container className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tên */}
        <TextField
          size="small"
          label="Tên"
          placeholder="Tên món ăn"
          value={updateName}
          onChange={(e) => setUpdateName(e.target.value)}
          fullWidth
        />

        {/* Ảnh & Preview */}
        <div>
          <TextField
            size="small"
            type="file"
            inputRef={fileInputRef}
            onChange={handleImageChange}
            fullWidth
          />
          {imagePreview && (
            <div className="relative mt-3 w-fit">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover border rounded-md shadow"
              />
              <button
                type="button"
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow"
                onClick={handleRemoveImage}
              >
                &times;
              </button>
            </div>
          )}
        </div>

        {/* Phân loại */}
        <FormControl fullWidth size="small">
          <InputLabel id="category-label">Phân loại</InputLabel>
          <Select
            labelId="category-label"
            label="Phân loại"
            value={updateCategory}
            onChange={(e) => setUpdateCategory(e.target.value)}
          >
            <MenuItem value="main">Món chính</MenuItem>
            <MenuItem value="side">Món phụ</MenuItem>
            <MenuItem value="dessert">Tráng miệng</MenuItem>
            <MenuItem value="beverage">Đồ uống</MenuItem>
          </Select>
        </FormControl>

        {/* Giá thành */}
        <TextField
          type="number"
          size="small"
          label="Giá thành/đơn vị khẩu phần"
          placeholder="0"
          value={isNaN(updatePrice) ? 0 : updatePrice}
          onChange={(e) =>
            setUpdatePrice(
              isNaN(e.target.valueAsNumber)
                ? 0
                : e.target.valueAsNumber < 0
                  ? 0
                  : e.target.valueAsNumber
            )
          }
          fullWidth
        />

        {/* Đơn vị khẩu phần */}
        <TextField
          size="small"
          label="Đơn vị khẩu phần"
          placeholder="Ví dụ: dĩa, ly, phần..."
          value={updateUnit}
          onChange={(e) => setUpdateUnit(e.target.value)}
          fullWidth
        />

        {/* Mô tả */}
        <TextField
          size="small"
          label="Mô tả"
          multiline
          minRows={6}
          maxRows={10}
          placeholder="Mô tả món ăn"
          value={updateDescription}
          onChange={(e) => setUpdateDescription(e.target.value)}
          className="col-span-1 md:col-span-2"
          fullWidth
        />
      </div>
    </Container>
  );
};

export default MenuUpdateForm;
