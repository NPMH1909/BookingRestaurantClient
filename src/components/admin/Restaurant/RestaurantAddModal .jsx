import React, { useState } from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Input,
    Textarea,
} from "@material-tailwind/react";
import provinces from "hanhchinhvn/dist/tinh_tp.json";
import districts from "hanhchinhvn/dist/quan_huyen.json";
import { Toast } from "../../../configs/SweetAlert2";
import { useCreateRestaurantMutation } from "../../../apis/restaurantApi";
import { useGetRestaurantTypesQuery } from "../../../apis/restaurantTypeApi";

const RestaurantAddModal = ({ open, handleClose, refetch }) => {
    const [createRestaurant] = useCreateRestaurantMutation();
    const [selectedTypes, setSelectedTypes] = useState([]);
    const { data: typesData } = useGetRestaurantTypesQuery();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [detail, setDetail] = useState("");
    const [openTime, setOpenTime] = useState("");
    const [closeTime, setCloseTime] = useState("");
    const [priceFrom, setPriceFrom] = useState(0);
    const [priceTo, setPriceTo] = useState(0);
    const [mainImage, setMainImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);

    const handleSubmit = async () => {
        const userId = localStorage.getItem("userId");

        if (!name || !province || !district || !detail || !openTime || !closeTime || !userId) {
            Toast.fire({
                icon: "error",
                title: "Vui lòng điền đầy đủ thông tin bắt buộc",
            });
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("userId", userId);
        formData.append("description", description);
        formData.append("address.province", provinces[province]?.name);
        formData.append("address.provinceCode", province);
        formData.append("address.district", districts[district]?.name);
        formData.append("address.districtCode", district);
        formData.append("address.detail", detail);
        formData.append("workingHours.open", openTime);
        formData.append("workingHours.close", closeTime);
        formData.append("rangePrice.from", priceFrom);
        formData.append("rangePrice.to", priceTo);
        selectedTypes.forEach((typeId) => {
            formData.append("types", typeId);
        });

        if (mainImage) {
            formData.append("mainImage", mainImage);
        }

        galleryImages.forEach((img) => {
            formData.append("galleryImages", img);
        });

        try {
            const res = await createRestaurant(formData);
            if (res.data?.status === 201) {
                refetch()
                Toast.fire({
                    icon: "success",
                    title: "Thêm nhà hàng thành công",
                });
                handleClose();
            } else {
                throw new Error();
            }
        } catch (err) {
            Toast.fire({
                icon: "error",
                title: "Thêm nhà hàng thất bại",
            });
        }
    };

    const handleTypeToggle = (typeId) => {
        setSelectedTypes((prev) =>
            prev.includes(typeId)
                ? prev.filter((id) => id !== typeId)
                : [...prev, typeId]
        );
    };
    const handlePriceChange = (setter) => (e) => {
        const rawValue = e.target.value.replace(/\D/g, ''); // chỉ lấy số
        setter(rawValue);
    };
    const formatDisplay = (value) =>
        value ? new Intl.NumberFormat('vi-VN').format(Number(value)) : '';

    return (
        <Dialog open={open} handler={handleClose} size="lg">
            <DialogHeader>Thêm Nhà Hàng</DialogHeader>

            <DialogBody className="grid grid-cols-2 gap-6 px-6 py-4 max-h-[70vh] overflow-y-auto">
                {/* Tên + Mô tả */}
                <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Tên nhà hàng</label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Mô tả</label>
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                {/* Địa chỉ */}
                <div>
                    <label className="block text-sm font-medium mb-1">Tỉnh/Thành</label>
                    <select value={province} onChange={(e) => setProvince(e.target.value)} className="p-2 border rounded w-full">
                        <option value="">Chọn tỉnh/thành</option>
                        {Object.entries(provinces).map(([code, { name }]) => (
                            <option key={code} value={code}>{name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Quận/Huyện</label>
                    <select value={district} onChange={(e) => setDistrict(e.target.value)} className="p-2 border rounded w-full">
                        <option value="">Chọn quận/huyện</option>
                        {Object.entries(districts)
                            .filter(([_, d]) => d.parent_code === province)
                            .map(([code, { name }]) => (
                                <option key={code} value={code}>{name}</option>
                            ))}
                    </select>
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Địa chỉ chi tiết</label>
                    <Input value={detail} onChange={(e) => setDetail(e.target.value)} />
                </div>

                {/* Giờ mở/đóng */}
                <div>
                    <label className="block text-sm font-medium mb-1">Giờ mở cửa</label>
                    <input
                        type="time"
                        value={openTime}
                        onChange={(e) => setOpenTime(e.target.value)}
                        className="p-2 border rounded w-full"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Giờ đóng cửa</label>
                    <input
                        type="time"
                        value={closeTime}
                        onChange={(e) => setCloseTime(e.target.value)}
                        className="p-2 border rounded w-full"
                    />
                </div>


                {/* Giá */}
                <div>
                    <label className="block text-sm font-medium mb-1">Giá từ</label>
                    <Input
                        value={formatDisplay(priceFrom)}
                        onChange={handlePriceChange(setPriceFrom)}
                        inputMode="numeric"
                    />                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Giá đến</label>
                    <Input
                        value={formatDisplay(priceTo)}
                        onChange={handlePriceChange(setPriceTo)}
                        inputMode="numeric"
                    />                </div>

                {/* Ảnh đại diện */}
                <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Ảnh đại diện</label>
                    <input type="file" accept="image/*" onChange={(e) => setMainImage(e.target.files[0])} />
                </div>

                {/* Ảnh thư viện */}
                <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Ảnh thư viện</label>
                    <input type="file" multiple accept="image/*" onChange={(e) => setGalleryImages([...e.target.files])} />
                </div>

                {/* Loại nhà hàng */}
                <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Loại nhà hàng</label>
                    <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border p-2 rounded text-sm">
                        {typesData?.data?.map((type) => (
                            <label key={type._id} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    value={type._id}
                                    checked={selectedTypes.includes(type._id)}
                                    onChange={() => handleTypeToggle(type._id)}
                                />
                                {type.name}
                            </label>
                        ))}
                    </div>
                </div>
            </DialogBody>

            <DialogFooter className="px-6 py-3">
                <Button variant="text" onClick={handleClose}>Hủy</Button>
                <Button variant="gradient" color="green" onClick={handleSubmit}>Lưu</Button>
            </DialogFooter>
        </Dialog>

    );
};

export default RestaurantAddModal;
