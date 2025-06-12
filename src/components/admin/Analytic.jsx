import React, { useState } from 'react';
import {
  useGetSummaryQuery,
  useGetRevenueChartQuery,
} from '../../apis/statisticApi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const StatCard = ({ label, value }) => (
  <div className="bg-white p-4 rounded-2xl shadow text-center">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const formatCurrency = (num) =>
  num?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

const Analytic = ({ selectedRestaurant }) => {
  const restaurantId = selectedRestaurant?._id;

  const [revenueRange, setRevenueRange] = useState('daily'); // 'daily', 'weekly', 'monthly'

  const { data: summary = {} } = useGetSummaryQuery(restaurantId, {
    skip: !restaurantId
  });

  const { data: revenue = [] } = useGetRevenueChartQuery(
    { restaurantId, range: revenueRange },
    { skip: !restaurantId }
  );

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Thống Kê</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Tổng đơn hàng (toàn thời gian)" value={summary.totalOrders || 0} />
        <StatCard label="Doanh thu hôm nay" value={formatCurrency(summary.totalRevenueToday || 0)} />
        <StatCard label="Doanh thu tháng này" value={formatCurrency(summary.totalRevenueMonth || 0)} />
        <StatCard label="Tổng người dùng" value={summary.totalUsers || 0} />
      </div>

      <div className="bg-white p-4 rounded-2xl shadow">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">
            Doanh thu theo {revenueRange === 'daily' ? 'ngày' : revenueRange === 'weekly' ? 'tuần' : 'tháng'}
          </h2>
          <select
            value={revenueRange}
            onChange={(e) => setRevenueRange(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="daily">Theo ngày</option>
            <option value="weekly">Theo tuần</option>
            <option value="monthly">Theo tháng</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenue}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Bar dataKey="total" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default Analytic;
