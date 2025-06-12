import React, { useState, useRef, useEffect } from 'react';
import Dashboard from '../Dashboard';
import { useCreateMenuItemMutation, useDeleteMenuItemMutation, useGetMenuByRestaurantQuery, useUpdateMenuItemMutation } from '../../../apis/menuApi';
import { menu } from "../../../constants/table_head";
import { useSelector } from 'react-redux';
import MenuDetailView from './MenuDetailView';
import MenuUpdateForm from './MenuUpdateForm';
import { Button, Input } from '@material-tailwind/react';
import { Toast } from '../../../configs/SweetAlert2';
import MenuAddForm from './MenuAddForm';

const Menu = ({ selectedRestaurant, restaurants }) => {
  const [active, setActive] = useState(1);

  const selectedId = useSelector((state) => state.selectedId.value);
  const restaurantId = selectedRestaurant?._id;

  const { data: menuData, error, isLoading, refetch } = useGetMenuByRestaurantQuery(
    { restaurantId, page: active, category: '' },
    { skip: !restaurantId }
  );
  const [createMenuItem, { isLoading: isAdded, error: addError }] =
    useCreateMenuItemMutation();
  const [updateMenuItem, { isLoading: isUpdated, error: updateError }] = useUpdateMenuItemMutation();
  const [deleteMenuItem, { isLoading: isDeleted, error: deleteError }] =
    useDeleteMenuItemMutation();
  const list_menu = menuData?.data.map((menu) => ({
    id: menu._id,
    name: menu.name,
    price: Number(menu.price).toLocaleString("en-US") + " đ",
    unit: menu.unit,
    image: menu?.image?.url
  }));

  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [restaurant, setRestaurant] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [code, setCode] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [description, setDescription] = useState('');
  const [updateRestaurant, setUpdateRestaurant] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [updateCategory, setUpdateCategory] = useState('');
  const [updateCode, setUpdateCode] = useState('');
  const [updatePrice, setUpdatePrice] = useState(0);
  const [updateUnit, setUpdateUnit] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!selectedId || !menuData?.data) return;

    const selectedItem = menuData.data.find(item => item._id === selectedId);
    if (selectedItem) {
      setUpdateRestaurant(selectedItem.restaurantId || '');
      setUpdateName(selectedItem.name || '');
      setUpdateCategory(selectedItem.category || '');
      setUpdateCode(selectedItem.code || '');
      setUpdateDescription(selectedItem.description || '');
      setUpdateUnit(selectedItem.unit || '');
      setUpdatePrice(selectedItem.price || 0);
      setImagePreview(selectedItem?.image?.url || null);
      setImageFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    }
  }, [selectedId, menuData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleAddClose = () => setOpenAdd(false)


  const handleAddSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("code", code);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("unit", unit);
      formData.append("price", price);
      formData.append("discount", discount);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const data = await createMenuItem({
        restaurantId: restaurantId,
        menuItemData: formData,
      });

      if (data.data.status === 201) {
        refetch();

        Toast.fire({
          icon: "success",
          title: "Thêm món ăn thành công",
        }).then(() => {
          handleAddClose();
          setName("");
          setCode("");
          setCategory("");
          setDescription("");
          setUnit("");
          setPrice(0);
          setDiscount(0);
          setImageFile(null);
          setImagePreview(null);
        });
      }
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Thêm món ăn thất bại",
      });
    }
  };

  const updateSubmit = async () => {
    const formData = new FormData();
    formData.append("id", selectedId);
    formData.append("restaurantId", updateRestaurant);
    formData.append("name", updateName);
    formData.append("category", updateCategory);
    formData.append("description", updateDescription);
    formData.append("unit", updateUnit);
    formData.append("price", updatePrice);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await updateMenuItem(formData);
    refetch();
    return response;
  };
  const handleDeleteSubmit = async () => {
    const data = await deleteMenuItem(selectedId);
    if (data.data.status === 200) {
      Toast.fire({
        icon: "success",
        title: "Xóa món ăn thành công",
      });
      refetch();
    } else {
      Toast.fire({
        icon: "error",
        title: "Xóa món ăn thất bại",
      });
    }
  };
  if (isLoading) return <p>Đang tải menu...</p>;
  if (error) return <p>Đã xảy ra lỗi khi tải menu.</p>;

  return (
    <Dashboard
      name="Thực đơn"
      TABLE_HEAD={menu}
      TABLE_ROWS={list_menu}
      headerDetail="Chi tiết món"
      pagination={menuData?.pagination}
      page={active}
      setPage={setActive}
      bodyDetail={<MenuDetailView selectedId={selectedId} menuData={menuData} />}
      headerUpdate="Chỉnh sửa món ăn"
      bodyUpdate={
        <MenuUpdateForm
          updateName={updateName}
          setUpdateName={setUpdateName}
          updateCategory={updateCategory}
          setUpdateCategory={setUpdateCategory}
          updatePrice={updatePrice}
          setUpdatePrice={setUpdatePrice}
          updateUnit={updateUnit}
          setUpdateUnit={setUpdateUnit}
          updateDescription={updateDescription}
          setUpdateDescription={setUpdateDescription}
          fileInputRef={fileInputRef}
          handleImageChange={handleImageChange}
          imagePreview={imagePreview}
          handleRemoveImage={handleRemoveImage}
          restaurants={restaurants}
        />
      }
      sizeUpdate="lg"
      updateSubmit={updateSubmit}
      isUpdated={isUpdated}
      handleDeleteSubmit={handleDeleteSubmit}
    >
      <MenuAddForm
        open={openAdd}
        handleClose={handleAddClose}
        restaurant={restaurant}
        setRestaurant={setRestaurant}
        name={name}
        setName={setName}
        category={category}
        setCategory={setCategory}
        code={code}
        setCode={setCode}
        unit={unit}
        setUnit={setUnit}
        price={price}
        setPrice={setPrice}
        discount={discount}
        setDiscount={setDiscount}
        description={description}
        setDescription={setDescription}
        imagePreview={imagePreview}
        handleImageChange={handleImageChange}
        handleRemoveImage={handleRemoveImage}
        fileInputRef={fileInputRef}
        handleAddSubmit={handleAddSubmit}
        restaurants={restaurants}
      />
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outlined"
          className="w-full"
          size="regular"
          onClick={() => setOpenAdd(true)} // ✅ Đúng
        >
          Thêm mới
        </Button>
        <Input
          size="sm"
          label="Tìm kiếm"
          placeholder="Tìm kiếm sản phẩm"
        />
      </div>
    </Dashboard>
  );
};

export default Menu;
