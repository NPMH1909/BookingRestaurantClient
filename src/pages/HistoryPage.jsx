import React, { useRef, useState } from 'react'
import Notification from '../components/restaurants/Notification';
import DishReviewModal from '../components/restaurants/DishReviewModal';
import CommentForm from '../components/restaurants/CommentForm';
import { useGetUserOrdersQuery, useUpdateOrderRatingMutation, useUpdateOrderStatusMutation } from '../apis/orderApi';
import { useCreateReviewMutation } from '../apis/reviewApi';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/shared/Pagination';
import OrderDetailActions from '../components/restaurants/OrderDetailActions';
import RatingModal from '../components/restaurants/RatingModal';
import MenuTable from '../components/restaurants/MenuTable';
import OrderInfo from '../components/restaurants/OrderInfo';
import OrderTable from '../components/restaurants/OrderTable';
import CancelModal from '../components/restaurants/CancelModal';
import Loading from '../components/shared/Loading';

const HistoryPage = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, isError, refetch } = useGetUserOrdersQuery({page});
    const [open, setOpen] = useState(false);
    const [selectedDish, setSelectedDish] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [rating, setRating] = useState(5);
    const [showRatingForm, setShowRatingForm] = useState(false);
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate()
    // Comment form states
    const [reviewContent, setReviewContent] = useState('');
    const [image, setImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fileInputRef = useRef(null);

    // API mutations
    const [updateOrderRating] = useUpdateOrderRatingMutation();
    const [updateOrderStatus] = useUpdateOrderStatusMutation();
    const [createReview] = useCreateReviewMutation();

    const handleOpen = (dish) => {
        setSelectedDish(dish);
        setOpen(true);
    };

    const handleSubmitReview = (reviewData) => {
        console.log("Dữ liệu đánh giá:", reviewData);
        // Gửi API ở đây nếu cần
    };

    const showNotification = (message, isSuccess) => {
        setNotification({ message, isSuccess });
        setTimeout(() => setNotification(null), 4000);
    };

    const handleRowClick = (order) => {
        setSelectedOrder(order);
        setRating(order.rating || 5);
    };

    const handleCloseDetail = () => {
        setSelectedOrder(null);
    };

    const handleStarClick = (star) => {
        setRating(star);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const clearCommentForm = () => {
        setReviewContent('');
        setImage(null);
        setSelectedImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Step 1: Submit star rating
    const handleSubmitRating = async () => {
        setIsSubmitting(true);
        try {
            await updateOrderRating({
                orderId: selectedOrder._id,
                rating,
            }).unwrap();
            showNotification("Cảm ơn đánh giá của bạn!", true);
            refetch();
            setShowRatingForm(false);
            setSelectedOrder({ ...selectedOrder, rating });

            // Open the comment form immediately after rating submission
            setShowCommentForm(true);
        } catch (error) {
            showNotification("Đã xảy ra lỗi khi gửi đánh giá. Vui lòng thử lại!", false);
            console.error("Lỗi khi đánh giá:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Step 2: Submit comment and image (if any)
    const handleSubmitComment = async () => {
        if (!reviewContent.trim()) {
            showNotification("Vui lòng nhập nội dung đánh giá.", false);
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("restaurantId", selectedOrder.restaurantId._id);
        formData.append("content", reviewContent);
        formData.append("rating", rating);

        if (image) {
            formData.append("image", image);
        }

        try {
            await createReview(formData).unwrap();
            showNotification("Cảm ơn nhận xét của bạn!", true);
            refetch();
            setShowCommentForm(false);
            clearCommentForm();
        } catch (error) {
            console.error("Error:", error);
            showNotification("Có lỗi xảy ra khi gửi nhận xét.", false);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Skip comment submission and just close the form
    const handleSkipComment = () => {
        setShowCommentForm(false);
        clearCommentForm();
    };

    const handleCancelOrder = async () => {
        try {
            console.log('id', selectedOrder._id)
            await updateOrderStatus({
                id: selectedOrder._id,
                status: "CANCELLED",
            }).unwrap();
            showNotification("Đơn hàng đã được hủy!", true);
            setShowCancelModal(false);
            refetch();
            setSelectedOrder(null);
        } catch (error) {
            showNotification("Đã xảy ra lỗi khi hủy đơn. Vui lòng thử lại!", false);
            console.error("Lỗi khi hủy đơn:", error);
        }
    };

    const handleCancelModalClose = () => {
        setShowCancelModal(false);
    };

    if (isLoading) return <p><Loading/></p>;
    if (isError) return <p>Đã xảy ra lỗi khi tải dữ liệu.</p>;
    return (
        <div className="max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-2xl font-bold mb-5 text-center">
                Lịch sử đặt bàn
            </h1>

            <Notification notification={notification} />

            {selectedOrder ? (
                <div className="bg-white shadow-lg rounded-lg px-6 py-5 w-full md:w-2/3 lg:w-2/3 mx-auto">
                    <h2 className="uppercase text-xl font-bold mb-4 text-gray-800">
                        Chi tiết đơn hàng
                    </h2>

                    <OrderInfo selectedOrder={selectedOrder} navigate={navigate} />

                    <MenuTable
                        menuItems={selectedOrder?.list_menu}
                        onReviewClick={handleOpen}
                    />

                    <DishReviewModal
                        open={open}
                        handleClose={() => setOpen(false)}
                        dish={selectedDish}
                        onSubmit={handleSubmitReview}
                    />

                    <RatingModal
                        showRatingForm={showRatingForm}
                        rating={rating}
                        onStarClick={handleStarClick}
                        onSubmit={handleSubmitRating}
                        onClose={() => {
                            setShowRatingForm(false);
                            setRating(5);
                        }}
                        isSubmitting={isSubmitting}
                    />

                    <CommentForm
                        showCommentForm={showCommentForm}
                        reviewContent={reviewContent}
                        setReviewContent={setReviewContent}
                        selectedImage={selectedImage}
                        fileInputRef={fileInputRef}
                        onFileChange={handleFileChange}
                        onImageRemove={() => {
                            setSelectedImage(null);
                            setImage(null);
                            if (fileInputRef.current) {
                                fileInputRef.current.value = '';
                            }
                        }}
                        onSubmit={handleSubmitComment}
                        onSkip={handleSkipComment}
                        isSubmitting={isSubmitting}
                    />

                    <OrderDetailActions
                        selectedOrder={selectedOrder}
                        onClose={handleCloseDetail}
                        onRate={() => setShowRatingForm(true)}
                        onCancel={() => setShowCancelModal(true)}
                    />
                </div>
            ) : (
                <OrderTable orders={data?.data} onRowClick={handleRowClick} />
            )}

            {!selectedOrder && data.pagination?.totalPages > 1 && (
                <Pagination
                    page={data.pagination?.totalPages}
                    active={page}
                    setActive={setPage}
                />
            )}

            <CancelModal
                show={showCancelModal}
                onConfirm={handleCancelOrder}
                onClose={handleCancelModalClose}
            />
        </div>
    );
}

export default HistoryPage