import { useEffect, useState } from "react";
import { useChangePasswordMutation, useGetUserByIdQuery, useUpdateUserByIdMutation } from "../apis/userApi";
import ChangePasswordForm from "../components/restaurants/ChangePasswordForm";
import UserInfoDisplay from "../components/restaurants/UserInfoDisplay";
import UserInfoUpdateForm from "../components/restaurants/UserInfoUpdateForm";
import Loading from "../components/shared/Loading";


const ProfilePage = ({ userId }) => {
    const { data: userData, isLoading, isError } = useGetUserByIdQuery(userId);
    const [updateUserById] = useUpdateUserByIdMutation();
    const [changePassword] = useChangePasswordMutation();
    const user = userData?.data;

    const [formType, setFormType] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [passwordVisibility, setPasswordVisibility] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [notification, setNotification] = useState(null);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                phone: user.phone,
            });
        }
    }, [user]);

    const getTitle = () => {
        if (formType === "update") return "Cập nhật thông tin";
        if (formType === "changePassword") return "Đổi mật khẩu";
        return "Thông tin cá nhân";
    };

    const showNotification = (message, isSuccess) => {
        setNotification({ message, isSuccess });
        setTimeout(() => setNotification(null), 4000);
    };

    const handleSaveUpdate = async () => {
        try {
            await updateUserById({ id: userId, data: formData }).unwrap();
            showNotification("Thông tin đã được cập nhật thành công!", true);
            setFormType("");
        } catch (error) {
            console.error("Lỗi khi cập nhật thông tin:", error);
            showNotification("Cập nhật thất bại. Vui lòng thử lại.", false);
        }
    };

    const handleChangePassword = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            showNotification("Mật khẩu mới và xác nhận mật khẩu không khớp.", false);
            return;
        }
        try {
            await changePassword({
                oldPassword: passwordData.oldPassword,
                newPassword: passwordData.newPassword,
            }).unwrap();
            showNotification("Mật khẩu đã được thay đổi thành công!", true);
            setFormType("");
        } catch (error) {
            console.error("Lỗi khi đổi mật khẩu:", error);
            showNotification("Đổi mật khẩu thất bại. Vui lòng thử lại.", false);
        }
    };

    if (isLoading) {
        return <div><Loading/></div>;
    }

    if (isError) {
        return <div className="text-center text-red-500">Lỗi khi tải dữ liệu người dùng.</div>;
    }

    const togglePasswordVisibility = (field) => {
        setPasswordVisibility((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };
    return (
        <div className="max-w-lg mx-auto mt-10 p-5 bg-white shadow rounded">
            {notification && (
                <div
                    className={`mb-4 p-3 text-white rounded ${notification.isSuccess ? "bg-green-500" : "bg-red-500"
                        } notification-animation`}
                >
                    {notification.message}
                </div>
            )}

            <h1 className="text-2xl font-bold mb-5 text-center">{getTitle()}</h1>

            {formType === "" && (
                <UserInfoDisplay formData={formData} setFormType={setFormType} />
            )}

            {formType === "update" && (
                <UserInfoUpdateForm
                    formData={formData}
                    setFormData={setFormData}
                    setFormType={setFormType}
                    handleSaveUpdate={handleSaveUpdate}
                />
            )}

            {formType === "changePassword" && (
                <ChangePasswordForm
                    passwordData={passwordData}
                    setPasswordData={setPasswordData}
                    passwordVisibility={passwordVisibility}
                    togglePasswordVisibility={togglePasswordVisibility}
                    handleChangePassword={handleChangePassword}
                    setFormType={setFormType}
                />
            )}
        </div>
    );
}

export default ProfilePage