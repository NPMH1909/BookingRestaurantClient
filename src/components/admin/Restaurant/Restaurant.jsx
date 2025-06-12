import React, { useState, useEffect } from "react";
import {
  useCreateRestaurantMutation,
  useDeleteRestaurantMutation,
  useGetRestaurantByIdQuery,
  useUpdateRestaurantMutation,
} from "../../../apis/restaurantApi";
import RestaurantDetailView from "./RestaurantDetailView";
import UpdateDialog from "../UpdateDialog";
import { Button } from "@material-tailwind/react";
import { Toast } from "../../../configs/SweetAlert2";
import RestaurantUpdateModal from "./RestaurantUpdateModal";
import RestaurantAddModal from "./RestaurantAddModal ";
import Swal from "sweetalert2";

const Restaurant = ({ selectedRestaurant, onDeleted }) => {
  const restaurantId = selectedRestaurant?._id;
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const { data: resData, error, isLoading, refetch } = useGetRestaurantByIdQuery(restaurantId, {
    skip: !restaurantId,
  });
  const restaurant = resData?.data;
  const [updateRestaurant, { error: errorUpdated, isLoading: isUpdated }] =
    useUpdateRestaurantMutation();
  const [deleteRestaurant, { error: errorDeleted, isLoading: isDeleted }] =
    useDeleteRestaurantMutation();

  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [updateName, setUpdateName] = useState("");
  const [updateAddress, setUpdateAddress] = useState({});
  const [rangePrice, setRangePrice] = useState({ from: 0, to: 0 });
  const [workingHours, setWorkingHours] = useState({ open: "", close: "" });
  const [updateDescription, setUpdateDescription] = useState("");

  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    if (restaurant) {
      setMainImage(restaurant.mainImage || null);
      setGalleryImages(restaurant.galleryImages || []);
      setUpdateName(restaurant.name || "");
      setUpdateAddress(restaurant.address || {});
      setRangePrice(restaurant.rangePrice || { from: 0, to: 0 });
      setWorkingHours(restaurant.workingHours || { open: "", close: "" });
      setUpdateDescription(restaurant.description || "");
    }
  }, [restaurant]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading restaurant data</div>;
  if (!restaurant) {
    return (
      <div className="p-6 text-center">
        <p className="mb-4 text-gray-600 text-sm">Bạn chưa có nhà hàng nào.</p>
        <Button variant="filled" color="blue" onClick={() => setOpenAddModal(true)}>
          Tạo nhà hàng
        </Button>

        <RestaurantAddModal open={openAddModal} handleClose={() => setOpenAddModal(false)} />
      </div>
    );
  }

  // Hàm xử lý xóa với confirm
  const handleDelete = () => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#f50057",
      cancelButtonColor: "#2962ff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteRestaurant(restaurant._id).unwrap();
          refetch()
          Swal.fire({
            icon: "success",
            title: "Xóa thành công!",
            timer: 1500,
            showConfirmButton: false,
          });
          if (onDeleted) onDeleted(); // cập nhật danh sách sau xóa
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Xóa thất bại!",
            text: err?.data?.message || "Đã xảy ra lỗi khi xóa.",
          });
        }
      }
    });
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button variant="outlined" size="regular" onClick={() => setOpenAddModal(true)}>
          Thêm mới
        </Button>

        <RestaurantAddModal open={openAddModal} handleClose={() => setOpenAddModal(false)} refetch={refetch} />
        <RestaurantUpdateModal
          refetch={refetch}
          open={openUpdateModal}
          handleClose={() => setOpenUpdateModal(false)}
          restaurant={restaurant}
          onUpdate={(formData) => updateRestaurant({ id: restaurant._id, restaurantData: formData })}
        />
      </div>

      <RestaurantDetailView
        mainImage={mainImage}
        galleryImages={galleryImages}
        updateName={updateName}
        updateAddress={updateAddress}
        rangePrice={rangePrice}
        workingHours={workingHours}
        updateDescription={updateDescription}
      />

      <div className="flex justify-end gap-2 px-6 pb-4 mt-8">
        <Button color="green" onClick={() => setOpenUpdateModal(true)}>
          Cập nhật
        </Button>

        <Button color="red" onClick={handleDelete} disabled={isDeleted}>
          {isDeleted ? "Đang xóa..." : "Xóa"}
        </Button>
      </div>

      <UpdateDialog />
    </div>
  );
};

export default Restaurant;
