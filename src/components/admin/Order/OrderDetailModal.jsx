import React, { useState } from 'react';
import { Card, CardBody, Typography } from "@material-tailwind/react";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";

const TABLE_HEAD = ["Tên món", "Giá sau giảm", "Số lượng"];

const OrderDetailModal = ({ orders }) => {
    const selectedId = useSelector((state) => state.selectedId.value);
    const [subactive, setSubactive] = useState(1);

    const selectedOrder = orders?.data.find((order) => order._id === selectedId);

    if (!selectedOrder) return <div>Không tìm thấy đơn hàng</div>;

    return (
        <Card>
            <CardBody>
                <div className="grid grid-cols-3 mb-5 mt-5">
                    <Typography variant="h5" color="blue-gray" className="font-bold">
                        Thông tin liên hệ
                    </Typography>
                    <div className="col-span-2 grid grid-cols-3">
                        <Typography variant="h6" color="blue-gray">Người nhận bàn:</Typography>
                        <Typography variant="body" className="col-span-2" color="blue-gray">
                            {selectedOrder.name}
                        </Typography>
                        <Typography variant="h6" color="blue-gray">Số điện thoại:</Typography>
                        <Typography variant="body" className="col-span-2" color="blue-gray">
                            {selectedOrder.phone_number}
                        </Typography>
                    </div>
                </div>

                <Divider />
                <div className="grid grid-cols-3 mt-5 mb-5">
                    <Typography variant="h5" color="blue-gray" className="font-bold">
                        Phương thức thanh toán
                    </Typography>
                    <div className="col-span-2 grid grid-cols-3">
                        <Typography variant="h6" color="blue-gray">Hình thức thanh toán</Typography>
                        <Typography variant="body" className="col-span-2" color="blue-gray">
                            {selectedOrder.payment}
                        </Typography>
                        <Typography variant="h6" color="blue-gray">Trạng thái</Typography>
                        <Typography variant="body" className="col-span-2" color="blue-gray">
                            {selectedOrder.status}
                        </Typography>
                    </div>
                </div>

                <Divider />
                <div className="grid grid-cols-3 mt-5 mb-5">
                    <Typography variant="h5" color="blue-gray" className="font-bold">
                        Thông tin đơn hàng
                    </Typography>
                    <div className="col-span-2 grid grid-cols-3">
                        <Typography variant="h6" color="blue-gray">Số người</Typography>
                        <Typography variant="body" className="col-span-2" color="blue-gray">
                            {selectedOrder.totalPeople}
                        </Typography>
                        <Typography variant="h6" color="blue-gray">Tổng cộng:</Typography>
                        <Typography variant="body" className="col-span-2" color="blue-gray">
                            {Number(selectedOrder.total).toFixed(0).toLocaleString("en-US")} đ
                        </Typography>
                    </div>
                </div>

                <Divider />
                <Typography variant="h5" color="blue-gray" className="font-bold mt-5">
                    Danh sách thực đơn
                </Typography>

                <table className="w-full table-auto text-center mt-5">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {selectedOrder.menuItems
                            ?.slice((subactive - 1) * 5, subactive * 5)
                            .map(({ item, priceAtBooking, quantity }) => (
                                <tr key={item.name}>
                                    <td className="p-4 border-b border-blue-gray-50 text-center">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {item.name}
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50 text-center">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {priceAtBooking.toFixed(0).toLocaleString("vi-VN")}
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50 text-center">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {quantity}
                                        </Typography>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                {/* <Pagination
          page={Math.ceil(selectedOrder.menuList.length / 5)}
          active={subactive}
          setActive={setSubactive}
        /> */}
            </CardBody>
        </Card>
    );
};

export default OrderDetailModal;
