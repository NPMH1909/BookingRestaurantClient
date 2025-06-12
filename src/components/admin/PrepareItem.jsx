import React, { useState } from 'react';
import { useGetMenuItemPrepareItemsQuery } from '../../apis/statisticApi';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
dayjs.locale('vi');

const PrepareItem = ({ selectedRestaurant }) => {
    const restaurantId = selectedRestaurant?._id;

    const { data: prepareItems = [], isLoading, isError } = useGetMenuItemPrepareItemsQuery(
        { restaurantId },
        { skip: !restaurantId }
    );

    const groupedByDate = prepareItems.reduce((acc, item) => {
        const dateStr = dayjs(item.date).format('YYYY-MM-DD');
        if (!acc[dateStr]) acc[dateStr] = [];
        acc[dateStr].push(item);
        return acc;
    }, {});

    const dates = Object.keys(groupedByDate).sort(); // sort tăng dần
    const [selectedDate, setSelectedDate] = useState(dates[0]);

    if (isLoading) return <p className="text-gray-600 text-center mt-10">Đang tải dữ liệu...</p>;
    if (isError) return <p className="text-red-500 text-center mt-10">Lỗi khi tải dữ liệu.</p>;

    if (dates.length === 0) {
        return (
            <div className="p-6 bg-white rounded-2xl shadow-md text-gray-500 italic text-center">
                Không có món nào cần chuẩn bị.
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            <div className="bg-white p-6 rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold text-indigo-700 mb-4">
                    Món ăn cần chuẩn bị (7 ngày tới)
                </h2>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {dates.map((date) => (
                        <button
                            key={date}
                            onClick={() => setSelectedDate(date)}
                            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                                selectedDate === date
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {dayjs(date).format('ddd, DD/MM')}
                        </button>
                    ))}
                </div>

                {/* Danh sách món theo ngày chọn */}
                <ul className="space-y-3">
                    {groupedByDate[selectedDate]?.map((item) => (
                        <li
                            key={item.itemId}
                            className="flex items-center space-x-4 bg-gray-100 p-4 rounded-xl shadow-sm hover:bg-gray-200 transition"
                        >
                            <img
                                src={item.image?.url || '/placeholder.jpg'}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg border"
                            />
                            <div>
                                <p className="font-semibold text-gray-800">{item.name}</p>
                                <p className="text-sm text-gray-600">
                                    {item.totalQuantity} {item.unit}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PrepareItem;
