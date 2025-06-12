import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Button,
} from "@material-tailwind/react";
import provinces from "hanhchinhvn/dist/tinh_tp.json";
import districts from "hanhchinhvn/dist/quan_huyen.json";
import { Toast } from "../../../configs/SweetAlert2";
import { useGetRestaurantTypesQuery } from "../../../apis/restaurantTypeApi";

const RestaurantUpdateModal = ({
  open, handleClose, restaurant, onUpdate, refetch
}) => {
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
  const [priceFromDisplay, setPriceFromDisplay] = useState("");
  const [priceTo, setPriceTo] = useState(0);
  const [priceToDisplay, setPriceToDisplay] = useState("");

  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [oldMainImage, setOldMainImage] = useState("");
  const [oldGalleryImages, setOldGalleryImages] = useState([]);

  const [orderAvailable, setOrderAvailable] = useState(20);
  const [peopleAvailable, setPeopleAvailable] = useState(20);
  const [limitTime, setLimitTime] = useState(2);

  useEffect(() => {
    if (restaurant) {
      setName(restaurant.name || "");
      setDescription(restaurant.description || "");
      setProvince(restaurant.address?.provinceCode || "");
      setDistrict(restaurant.address?.districtCode || "");
      setDetail(restaurant.address?.detail || "");
      setOpenTime(restaurant.workingHours?.open || "");
      setCloseTime(restaurant.workingHours?.close || "");
      setPriceFrom(restaurant.rangePrice?.from || 0);
      setPriceTo(restaurant.rangePrice?.to || 0);
      setOldMainImage(restaurant.mainImage?.url || "");
      setOldGalleryImages(restaurant.galleryImages || []);
      setOrderAvailable(restaurant.orderAvailable ?? 20);
      setPeopleAvailable(restaurant.peopleAvailable ?? 20);
      setLimitTime(restaurant.limitTime ?? 2);
    }
  }, [restaurant]);

  useEffect(() => {
    if (
      restaurant &&
      Array.isArray(restaurant.types) &&
      Array.isArray(typesData?.data)
    ) {
      const currentTypeIds = restaurant.types.map(type => String(type));
      setSelectedTypes(currentTypeIds);
    }
  }, [restaurant, typesData]);

  useEffect(() => {
    if (restaurant) {
      const from = restaurant.rangePrice?.from || 0;
      const to = restaurant.rangePrice?.to || 0;

      setPriceFrom(from);
      setPriceFromDisplay(Number(from).toLocaleString("vi-VN"));
      setPriceTo(to);
      setPriceToDisplay(Number(to).toLocaleString("vi-VN"));
    }
  }, [restaurant]);

  const handleMainImageChange = (e) => {
    setMainImage(e.target.files[0]);
  };

  const handleGalleryChange = (e) => {
    setGalleryImages([...e.target.files]);
  };

  const handleTypeToggle = (typeId) => {
    const id = String(typeId);
    setSelectedTypes((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("address.province", provinces[province]?.name || "");
    formData.append("address.provinceCode", province);
    formData.append("address.district", districts[district]?.name || "");
    formData.append("address.districtCode", district);
    formData.append("address.detail", detail);
    formData.append("workingHours.open", openTime);
    formData.append("workingHours.close", closeTime);
    formData.append("rangePrice.from", priceFrom);
    formData.append("rangePrice.to", priceTo);
    formData.append("orderAvailable", orderAvailable);
    formData.append("peopleAvailable", peopleAvailable);
    formData.append("limitTime", limitTime);

    selectedTypes.forEach((typeId) => {
      formData.append("types", typeId);
    });

    if (mainImage) {
      formData.append("mainImage", mainImage);
    }

    if (galleryImages.length > 0) {
      galleryImages.forEach((img) => {
        formData.append("galleryImages", img);
      });
    }

    try {
      const res = await onUpdate(formData);
      if (res.data?.status === 200) {
        refetch();
        Toast.fire({
          icon: "success",
          title: "Cập nhật nhà hàng thành công",
        });
        handleClose();
      } else {
        throw new Error();
      }
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Cập nhật thất bại",
      });
    }
  };

  return (
    <Dialog
      open={open}
      handler={handleClose}
      size="lg"
      className="max-w-[90vw] w-full"
      style={{
        maxHeight: "90vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <DialogHeader className="shrink-0">Cập nhật Nhà Hàng</DialogHeader>

      <DialogBody className="flex gap-8 px-6 py-4 overflow-y-auto" style={{ flex: 1 }}>
        {/* Left */}
        <div className="w-full flex flex-col gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Ảnh đại diện hiện tại:</label>
            <div className="aspect-w-4 aspect-h-3 bg-gray-100 rounded-md overflow-hidden border">
              {oldMainImage && <img src={oldMainImage} alt="main" className="object-cover w-full h-full" />}
            </div>
            <input type="file" accept="image/*" onChange={handleMainImageChange} className="mt-3" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Ảnh thư viện hiện tại:</label>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {oldGalleryImages.map((img, idx) => (
                <div key={idx} className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-md overflow-hidden border">
                  <img src={img.url} alt="gallery" className="object-cover w-full h-full" />
                </div>
              ))}
            </div>
            <input type="file" accept="image/*" multiple onChange={handleGalleryChange} />
          </div>
        </div>

        {/* Right */}
        <div className="w-1/2 flex flex-col gap-5">
          <div>
            <label className="text-sm font-medium mb-1">Tên nhà hàng</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <label className="text-sm font-medium mb-1">Mô tả</label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1">Tỉnh/Thành</label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="p-2 border rounded text-sm"
              >
                <option value="">Chọn tỉnh/thành</option>
                {Object.entries(provinces).map(([code, { name }]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1">Quận/Huyện</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="p-2 border rounded text-sm"
              >
                <option value="">Chọn quận/huyện</option>
                {Object.entries(districts)
                  .filter(([_, d]) => d.parent_code === province)
                  .map(([code, { name }]) => (
                    <option key={code} value={code}>{name}</option>
                  ))}
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-1">Giờ mở cửa</label>
              <Input type="time" value={openTime} onChange={(e) => setOpenTime(e.target.value)} />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-1">Giờ đóng cửa</label>
              <Input type="time" value={closeTime} onChange={(e) => setCloseTime(e.target.value)} />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-1">Giá từ</label>
              <Input
                type="text"
                inputMode="numeric"
                value={priceFromDisplay}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  setPriceFrom(Number(raw));
                  setPriceFromDisplay(Number(raw).toLocaleString("vi-VN"));
                }}
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-1">Giá đến</label>
              <Input
                type="text"
                inputMode="numeric"
                value={priceToDisplay}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  setPriceTo(Number(raw));
                  setPriceToDisplay(Number(raw).toLocaleString("vi-VN"));
                }}
              />
            </div>
          </div>

          {/* Các trường bổ sung */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-1">Số lượt đặt / ngày</label>
              <Input type="number" min={1} value={orderAvailable} onChange={(e) => setOrderAvailable(Number(e.target.value))} />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-1">Số người tối đa / lượt</label>
              <Input type="number" min={1} value={peopleAvailable} onChange={(e) => setPeopleAvailable(Number(e.target.value))} />
            </div>

          </div>
          <div className="flex-1">
            <label className="text-sm font-medium mb-1">Thời gian giới hạn (giờ)</label>
            <Input type="number" min={1} value={limitTime} onChange={(e) => setLimitTime(Number(e.target.value))} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Loại nhà hàng</label>
            <div className="grid grid-cols-2 gap-2 border rounded p-3 text-sm">
              {typesData?.data?.map((type) => (
                <label key={type._id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value={type._id}
                    checked={selectedTypes.includes(String(type._id))}
                    onChange={() => handleTypeToggle(String(type._id))}
                  />
                  {type.name}
                </label>
              ))}
            </div>
          </div>
        </div>
      </DialogBody>

      <DialogFooter className="shrink-0">
        <Button variant="text" onClick={handleClose}>Hủy</Button>
        <Button variant="gradient" color="green" onClick={handleSubmit}>Cập nhật</Button>
      </DialogFooter>
    </Dialog>
  );
};

export default RestaurantUpdateModal;
