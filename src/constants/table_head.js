const history = [
  { label: "ID", col: 1 },
  { label: "Vai trò", col: 1 },
  { label: "Hành động", col: 1 },
  { label: "Ngày", col: 1 },
];

const employee = [
  { label: "Tên", col: 1 },
  { label: "Email", col: 1 },
  { label: "Số điện thoại", col: 1 },
];
const menu = [
  { label: "Tên", col: 1 },
  { label: "Giá / Khẩu phần", col: 1 },
  { label: "Đơn vị", col: 1 },
  { label: "Hình ảnh", col: 1 },
];
const table = [
  { label: "Nhà hàng", col: 1 },
  { label: "Số bàn", col: 1 },
  { label: "Số người mỗi bàn", col: 1 },
  { label: "Giá / 1 người", col: 1 },
];
const promotion = [
  { label: "Khuyến mãi", col: 1 },
  { label: "Giảm giá", col: 1 },
  { label: "Ngày bắt đầu", col: 1 },
  { label: "Ngày kết thúc", col: 1 },
  { label: "Trạng thái", col: 1 },

];
const restaurant = [
  { label: "Tên", col: 1 },
  { label: "Hình ảnh", col: 1 },
  { label: "Địa chỉ", col: 1 },
  { label: "Giá mỗi người", col: 1 },
  { label: "Thời gian mở cửa", col: 1 },
  { label: "Thời gian đóng cửa", col: 1 },
];
// Mỗi hóa đơn bao gồm các thông tin: người thanh toán, số điện thoại, danh sách các món ăn, số bàn, giảm trừ, thành tiền, ngày thanh toán, hình thức thanh toán.

const order = [
  { label: "Ngày nhận bàn", col: 1 },
  //{ label: "Checkout", col: 1 },
  { label: "Tổng tiền", col: 1 },
  { label: "Trạng thái", col: 1 },
  { label: "Số người", col: 1 },
];

const staff_order = [
  { label: "Ngày nhận bàn", col: 1 },
  { label: "Số điện thoại", col: 1 },
  { label: "Tổng tiền", col: 1 },
  { label: "Trạng thái", col: 1 },
  { label: "email", col: 1 },
];
export { promotion, history, employee, menu, restaurant, order, staff_order, table };
