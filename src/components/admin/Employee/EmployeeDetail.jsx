import { Typography } from '@mui/material';
import React from 'react';

const EmployeeDetail = ({ employees, selectedId }) => {
  if (!employees?.data || !selectedId) {
    return <p>Loading...</p>;
  }

  const employee = employees.data.find(emp => emp._id === selectedId);

  if (!employee) {
    return <p>Không tìm thấy nhân viên.</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <img
          src="https://www.raiven.com/hs-fs/hubfs/shutterstock_1153673752-no-image-found.jpg?width=500&height=500&name=shutterstock_1153673752-no-image-found.jpg"
          alt="Nhân viên"
          className="h-[200px] w-auto object-cover mx-auto"
        />
      </div>
      <div className="col-span-2 grid grid-cols-3 gap-4 my-auto">
        <Typography variant="h6" color="blue-gray" className="text-left my-auto">
          Họ và tên:
        </Typography>
        <Typography color="blue-gray" className="col-span-2 text-left">
          {employee.staff.name}
        </Typography>

        <Typography variant="h6" color="blue-gray" className="text-left">
          Email:
        </Typography>
        <Typography color="blue-gray" className="col-span-2 text-left">
          {employee.staff.email}
        </Typography>

        <Typography variant="h6" color="blue-gray" className="text-left">
          Số điện thoại:
        </Typography>
        <Typography color="blue-gray" className="col-span-2 text-left">
          {employee.staff.phone}
        </Typography>

        <Typography color="blue-gray" className="col-span-2 text-left">
          {employee.staff.username}
        </Typography>
      </div>
    </div>
  );
};

export default EmployeeDetail;
