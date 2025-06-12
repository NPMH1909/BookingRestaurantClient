import { useCreatePromotionMutation, useDeletePromotionMutation, useGetAllPromotionQuery, useGetPromotionsByRestaurantIdQuery, useUpdatePromotionMutation } from '../../../apis/promotionApi';
import React, { useEffect, useState } from 'react'
import { resetSelectedId } from "../../../features/slices/selectIdSlice";
import Loading from '../../shared/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { promotion } from "../../../constants/table_head";
import { Button, Input, Typography, IconButton } from '@material-tailwind/react';
import { Toast } from '../../../configs/SweetAlert2';
import PromotionAddForm from './PromotionAddForm';
import PromotionDetail from './PromotionDetail';
import PromotionUpdateForm from './PromotionUpdateForm';
import Dashboard from '../Dashboard';

const Promotion = ({ selectedRestaurant, restaurants }) => {
  const restaurantId = selectedRestaurant?._id;
  const [active, setActive] = useState(1);
  const selectedId = useSelector((state) => state.selectedId.value);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [activePeriod, setActivePeriod] = useState({ start: "", end: "" });
  const [updateName, setUpdateName] = useState("");
  const [updateDiscountPercent, setUpdateDiscountPercent] = useState(0);
  const [updateActivePeriod, setUpdateActivePeriod] = useState({ start: "", end: "" })
  const [updateDescription, setUpdateDescription] = useState("");

  const {
    data: promotions,
    isLoading,
    error,
    refetch
  } = useGetPromotionsByRestaurantIdQuery({ restaurantId, page: active }, { skip: !restaurantId });
  console.log('first', promotions?.pagination)
  const [createPromotion, { isLoading: isAdded, error: addError }] = useCreatePromotionMutation();
  const [updatePromotion, { isLoading: isUpdated, error: updatedError }] = useUpdatePromotionMutation();
  const [deletePromotion, { isLoading: isDeleted, error: deleteError }] =
    useDeletePromotionMutation();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    if (selectedId && promotions?.data) {
      const selected = promotions.data.find((item) => item._id === selectedId);
      if (selected) {
        setUpdateName(selected.name || "");
        setUpdateDescription(selected.description || "");
        setUpdateDiscountPercent(selected.discountPercent || 0);
        setUpdateActivePeriod(selected.activePeriod || { start: "", end: "" });
      }
    }
  }, [selectedId, promotions]);
  useEffect(() => {
    if (selectedId && promotions?.data) {
      const selected = promotions.data.find((item) => item._id === selectedId);
      if (selected) {
        setUpdateName(selected.name || "");
        setUpdateDescription(selected.description || "");
        setUpdateDiscountPercent(selected.discountPercent || 0);

        const startDate = selected.activePeriod?.start
          ? new Date(selected.activePeriod.start).toISOString().slice(0, 10)
          : "";
        const endDate = selected.activePeriod?.end
          ? new Date(selected.activePeriod.end).toISOString().slice(0, 10)
          : "";

        setUpdateActivePeriod({
          start: startDate,
          end: endDate,
        });
      }
    }
  }, [selectedId, promotions]);

  const updateSubmit = async () => {
    const result = await updatePromotion({
      id: selectedId,
      updatedPromotionData: {
        name: updateName,
        description: updateDescription,
        discountPercent: updateDiscountPercent,
        activePeriod: updateActivePeriod,
      },
    });

    if (result?.data?.status === 200) {
      refetch();
      return result
    }
  };

  const handleDeleteSubmit = async () => {
    try {
      const result = await deletePromotion(selectedId);
      if (result?.data?.status === 200) {
        Toast.fire({
          icon: "success",
          title: "Xóa thành công",
        });
        refetch();

      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Xóa thất bại",
      });
    }
  };


  const handleAddSubmit = async () => {
    try {
      const newPromotion = {
        name,
        description,
        discountPercent,
        activePeriod,
      };
      const result = await createPromotion({
        newPromotion,
        restaurantId,
      });
      if (result?.data?.status === 201) {
        refetch()
        Toast.fire({
          icon: "success",
          title: "Thêm chương trình khuyến mãi thành công",
        }).then(() => {
          handleClose();
          setCode("");
          setName("");
          setDescription("");
          setDiscountValue(0);
          setPeriodTime({ start: "", end: "" });
        });
      } else {
        Toast.fire({
          icon: "error",
          title: result?.error?.data?.message || "Thêm chương trình khuyến mãi thất bại",
        });
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Đã xảy ra lỗi, vui lòng thử lại",
      });
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error</div>;
  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const translateStatus = (status) => {
    switch (status) {
      case 'upcoming':
        return 'Sắp diễn ra';
      case 'active':
        return 'Đang diễn ra';
      case 'expired':
        return 'Đã kết thúc';
      default:
        return 'Không xác định';
    }
  };

  const list_promotion = promotions?.data.map((promotion) => ({
    id: promotion._id,
    name: promotion.name,
    discountValue: `${promotion.discountPercent}%`,
    startDate: promotion.activePeriod?.start ? formatDate(promotion.activePeriod.start) : null,
    endDate: promotion.activePeriod?.end ? formatDate(promotion.activePeriod.end) : null,
    status: translateStatus(promotion.status)
  }));

  return (
    <>
      <Dashboard
        name="Chương trình khuyến mãi"
        TABLE_ROWS={list_promotion}
        TABLE_HEAD={promotion}
        pagination={promotions?.pagination}
        page={active}
        setPage={setActive}
        updateContent="Chỉnh sửa"
        deleteContent="Xóa khuyến mãi"
        size="md"
        headerDetail="Chi tiết Khuyến mãi"
        bodyDetail={
          <PromotionDetail promotions={promotions} selectedId={selectedId} />
        }
        headerUpdate="Chỉnh sửa khuyến mãi"
        sizeUpdate="md"
        bodyUpdate={
          <PromotionUpdateForm
            updateName={updateName}
            setUpdateName={setUpdateName}
            updateDescription={updateDescription}
            setUpdateDescription={setUpdateDescription}
            updateDiscountPercent={updateDiscountPercent}
            setUpdateDiscountPercent={setUpdateDiscountPercent}
            updateActivePeriod={updateActivePeriod}
            setUpdateActivePeriod={setUpdateActivePeriod}
          />

        }
        updateSubmit={updateSubmit}
        isUpdated={isUpdated}
        handleDeleteSubmit={handleDeleteSubmit}

      >
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outlined"
            className="w-full"
            size="regular"
            onClick={handleOpen}
          >
            Thêm mới
          </Button>
          <Input
            size="sm"
            label="Tìm kiếm"
            placeholder="Tìm kiếm sản phẩm"
          />
        </div>
        <PromotionAddForm
          open={open}
          handleClose={handleClose}
          handleAddSubmit={handleAddSubmit}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          discountPercent={discountPercent}
          setDiscountPercent={setDiscountPercent}
          activePeriod={activePeriod}
          setActivePeriod={setActivePeriod}
        />

      </Dashboard>
    </>
  )
}

export default Promotion;
