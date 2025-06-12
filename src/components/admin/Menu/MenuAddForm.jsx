// MenuAddForm.js
import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Select, MenuItem, FormControl, InputLabel,
    OutlinedInput, InputAdornment, IconButton, Typography, Container, Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const MenuAddForm = ({
    open,
    handleClose,
    name,
    setName,
    category,
    setCategory,
    unit,
    setUnit,
    price,
    setPrice,
    description,
    setDescription,
    imagePreview,
    handleImageChange,
    handleRemoveImage,
    fileInputRef,
    handleAddSubmit,
}) => {
    return (
        <Dialog maxWidth="md" open={open} onClose={handleClose} fullWidth>
            <DialogTitle className="pb-0">
                <div className="flex justify-between items-center">
                    <Typography variant="h5" className="font-semibold">
                        Thêm món
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogTitle>

            <DialogContent dividers>
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-2">
                        {/* Tên món */}
                        <TextField
                            label="Tên món"
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        {/* Ảnh món ăn */}
                        <FormControl fullWidth>
                            <InputLabel shrink htmlFor="image-upload">Ảnh món</InputLabel>
                            <TextField
                                id="image-upload"
                                type="file"
                                fullWidth
                                inputRef={fileInputRef}
                                onChange={handleImageChange}
                                inputProps={{ accept: "image/*" }}
                            />
                            {imagePreview && (
                                <div className="relative mt-2 w-32 h-32">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-full object-cover border rounded"
                                    />
                                    <button
                                        onClick={handleRemoveImage}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md"
                                    >
                                        &times;
                                    </button>
                                </div>
                            )}
                        </FormControl>

                        {/* Loại món */}
                        <FormControl fullWidth>
                            <InputLabel shrink id="category-label">Loại</InputLabel>
                            <Select
                                labelId="category-label"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                variant="outlined"
                            >
                                <MenuItem value="main">Món chính</MenuItem>
                                <MenuItem value="side">Món phụ</MenuItem>
                                <MenuItem value="dessert">Tráng miệng</MenuItem>
                                <MenuItem value="beverage">Đồ uống</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Giá thành */}
                        <TextField
                            label="Giá thành"
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            value={price.toLocaleString("vi-VN")}
                            onChange={(e) => {
                                const raw = e.target.value.replace(/\D/g, "");
                                setPrice(Number(raw));
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">đ</InputAdornment>,
                            }}
                        />

                        {/* Đơn vị khẩu phần */}
                        <TextField
                            label="Đơn vị khẩu phần"
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                        />

                        {/* Mô tả */}
                        <TextField
                            label="Mô tả"
                            fullWidth
                            multiline
                            minRows={6}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            className="col-span-1 md:col-span-2"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </Container>
            </DialogContent>

            <DialogActions className="px-6 pb-4">
                <Button variant="outlined" onClick={handleClose}>
                    Hủy
                </Button>
                <Button variant="contained" color="primary" onClick={handleAddSubmit}>
                    Thêm mới
                </Button>
            </DialogActions>
        </Dialog>

    );
};

export default MenuAddForm;
