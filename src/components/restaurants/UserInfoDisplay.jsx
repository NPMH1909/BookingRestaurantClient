import { Input } from "@material-tailwind/react";

const UserInfoDisplay = ({ formData, setFormType }) => {
  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <span className="font-semibold w-1/3">Tên:</span>
          <Input type="text" value={formData.name} readOnly className="w-full" />
        </div>
        <div className="flex items-center space-x-4">
          <span className="font-semibold w-1/3">Email:</span>
          <Input type="text" value={formData.email} readOnly className="w-full" />
        </div>
        <div className="flex items-center space-x-4">
          <span className="font-semibold w-1/3">Số điện thoại:</span>
          <Input type="text" value={formData.phone} readOnly className="w-full" />
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setFormType("update")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Cập nhật thông tin
        </button>
        <button
          onClick={() => setFormType("changePassword")}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Đổi mật khẩu
        </button>
      </div>
    </>
  );
}

export default UserInfoDisplay