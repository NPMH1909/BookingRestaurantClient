import { Input } from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const ChangePasswordForm = ({ 
    passwordData,
    setPasswordData,
    passwordVisibility,
    togglePasswordVisibility,
    handleChangePassword,
    setFormType}) => {
    return (
        <div className="space-y-4">
            {["oldPassword", "newPassword", "confirmPassword"].map((field, idx) => (
                <div className="relative" key={idx}>
                    <Input
                        type={passwordVisibility[field] ? "text" : "password"}
                        label={
                            field === "oldPassword"
                                ? "Mật khẩu cũ"
                                : field === "newPassword"
                                    ? "Mật khẩu mới"
                                    : "Xác nhận mật khẩu"
                        }
                        value={passwordData[field]}
                        onChange={(e) => setPasswordData({ ...passwordData, [field]: e.target.value })}
                        className="w-full"
                    />
                    <div
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() => togglePasswordVisibility(field)}
                    >
                        {passwordVisibility[field] ? (
                            <EyeSlashIcon className="w-5 h-5" />
                        ) : (
                            <EyeIcon className="w-5 h-5" />
                        )}
                    </div>
                </div>
            ))}

            <div className="mt-4 flex justify-end space-x-2">
                <button
                    onClick={() => setFormType("")}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    Hủy
                </button>
                <button
                    onClick={handleChangePassword}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Đổi mật khẩu
                </button>
            </div>
        </div>
    );
}

export default ChangePasswordForm