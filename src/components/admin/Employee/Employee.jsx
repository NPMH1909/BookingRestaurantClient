import React, { useState } from 'react';
import Dashboard from '../Dashboard';
import { useCreateEmployeeMutation, useDeleteEmployeeMutation, useGetAllEmployeeQuery } from '../../../apis/employeeApi';
import { employee } from '../../../constants/table_head';
import EmployeeDetail from './EmployeeDetail';
import { useSelector } from 'react-redux';
import EmployeeAddForm from './EmployeeAddForm';
import { Toast } from '../../../configs/SweetAlert2';
import { Input, Button } from '@material-tailwind/react';

const Employee = ({ selectedRestaurant, restaurantsData }) => {
  const [active, setActive] = useState(1);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [restaurant, setRestaurant] = useState("");

  const restaurantId = selectedRestaurant?._id;
  const selectedId = useSelector((state) => state.selectedId.value);

  const { data: employees, error, isLoading } = useGetAllEmployeeQuery(
    { restaurantId, page: active },
    { skip: !restaurantId }
  );

  const [createEmployee, { isLoading: isLoadingCreateStaff }] = useCreateEmployeeMutation();
  const [deleteEmployee, { isLoading: isDeleted, error: deleteError }] =
    useDeleteEmployeeMutation();
  const handleAddSubmit = async () => {
    try {
      const result = await createEmployee({
        name,
        email,
        phone,
        password,
        restaurantId,
      });
      if (result.data?.status === 201) {
        Toast.fire({
          icon: "success",
          title: "Thêm mới thành công",
        }).then(() => {
          setOpen(false);
          // Reset form
          setName("");
          setEmail("");
          setPhone("");
          setPassword("");
        });
      }
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Thêm mới thất bại",
      });
    }
  };
  const handleDeleteSubmit = async () => {
    try {
      const result = await deleteEmployee(selectedId);
      if (result.data.status === 200 || result.data.status === 202) {
        Toast.fire({
          icon: "success",
          title: "Xóa thành công",
        });
      }
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Xóa thất bại",
      });
    }
  };
  const list_employee = employees?.data?.map((employee) => ({
    id: employee._id,
    name: employee.staff.name,
    email: employee.staff.email,
    phone: employee.staff.phone,
  })) || [];

  return (
    <Dashboard
      name="Danh sách nhân viên"
      TABLE_HEAD={employee}
      TABLE_ROWS={list_employee}
      page={active}
      setPage={setActive}
      pagination={employees?.info}
      updateContent="Chỉnh sửa"
      deleteContent="Xóa"
      size="lg"
      headerDetail="Chi tiết nhân viên"
      bodyDetail={
        <EmployeeDetail employees={employees} selectedId={selectedId} />
      }
      handleDeleteSubmit={handleDeleteSubmit}
      noUpdate={true}
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

      <EmployeeAddForm
        open={open}
        handleClose={() => setOpen(false)}
        restaurants={restaurantsData}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        restaurant={restaurant}
        setRestaurant={setRestaurant}
        onAddStaff={handleAddSubmit}
        isCreated={isLoadingCreateStaff}
      />

    </Dashboard>
  );
};

export default Employee;
