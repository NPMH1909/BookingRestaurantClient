import { Input } from "@material-tailwind/react";

const UserInfoUpdateForm = ({ formData, setFormData, setFormType, handleSaveUpdate }) => {
  return (
    <div className="space-y-4">
      <Input label="Tên" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      <Input label="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      <Input label="Số điện thoại" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
      <div className="mt-4 flex justify-end space-x-2">
        <button onClick={() => setFormType("")} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Hủy</button>
        <button onClick={handleSaveUpdate} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Lưu</button>
      </div>
    </div>
  );
}

export default UserInfoUpdateForm