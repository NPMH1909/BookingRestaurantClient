import React from 'react';
import Dashboard from '../Dashboard';
import { useGetOrdersByResIdQuery, useUpdateOrderStatusMutation } from '../../../apis/orderApi';
import { order } from '../../../constants/table_head';
import { order_tab } from "../../../constants/tab";
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import OrderDetailModal from './OrderDetailModal';
import { useState } from 'react';


const Order = ({ selectedRestaurant }) => {
  const restaurantId = selectedRestaurant?._id;
  const [active, setActive] = useState(1);

  const { data: orders, refetch } = useGetOrdersByResIdQuery({ restaurantId, page: active }, { skip: !restaurantId });
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const selectedId = useSelector((state) => state.selectedId.value);

  // Format và map status giữ nguyên
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString('vi-VN', { /* giữ nguyên */ });
  };

  const mapStatusToLabel = (status) => {
    const tab = order_tab.find((tab) => tab.value === status);
    return tab ? tab.label : "Không xác định";
  };

  const list_order = orders?.data.map((order) => ({
    id: order._id,
    checkin: formatDateTime(order.checkin),
    total: Number(order.total.toFixed(0)).toLocaleString("en-US") + " đ",
    status: mapStatusToLabel(order.status),
    peopleAmount: order.totalPeople,
  }));

  const updateSubmit = async () => {
    try {
      await updateOrderStatus({ id: selectedId, status: "CONFIRM" });
      refetch()
      return { status: 200 };
    } catch (error) {
      return { status: 500, error };
    }
  };

  const rejectSubmit = async () => {
    try {
      await updateOrderStatus({ id: selectedId, status: "REJECT" });
      refetch()
      return { status: 200 };
    } catch (error) {
      return { status: 500, error };
    }
  };

  return (
    <Dashboard
      name="Đơn đặt bàn"
      TABLE_ROWS={list_order}
      TABLE_HEAD={order}
      pagination={orders?.pagination}
      noDelete={true}
      isOrder={true}
      page={active}
      setPage={setActive}
      headerDetail="Chi tiết Đơn hàng"
      bodyDetail={
        <OrderDetailModal orders={orders} />
      }
      bodyUpdate={
        <div className="text-center font-bold text-3xl mb-4 text-blue-gray-500">
          Chấp nhận đơn hàng
        </div>
      }
      updateSubmit={updateSubmit}
      rejectSubmit={rejectSubmit}
    />
  );
};

export default Order;
