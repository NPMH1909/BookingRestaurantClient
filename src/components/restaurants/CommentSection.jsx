import { Card, CardBody, Typography } from "@material-tailwind/react";
import { StarIcon as OutlineStar } from "@heroicons/react/24/outline";
import { UserIcon } from '@heroicons/react/24/solid'
import Pagination from "../shared/Pagination";

const CommentSection = ({
    commentSectionRef,
    reviews,
    reviewLoading,
    reviewError,
    page,
    setPage,
}) => {
    return (
        <Card className="mt-4" ref={commentSectionRef}>
           <CardBody>
             <Typography variant="h3" color="black" >
                Bình luận đánh giá
            </Typography>

            {reviewLoading && <Typography>Đang tải bình luận...</Typography>}
            {reviewError && <Typography>Lỗi khi tải bình luận!</Typography>}

            {reviews && reviews?.data?.length > 0 && (
                <div className="ml-4">
                    {reviews?.data.map((comment) => (
                        <div
                            key={comment._id}
                            className="flex flex-col mt-3 border p-3 rounded-md shadow-md relative"
                        >
                            {/* Header với avatar + tên */}
                            <div className="flex items-center mb-2">
                                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                                    <UserIcon className="w-4 h-4 text-black" />
                                </div>
                                <Typography variant="medium" className="text-black">
                                    {comment.userId.name || "Ẩn danh"}
                                </Typography>
                            </div>

                            {/* Nội dung + đánh giá */}
                            <div className="ml-4">
                                <div className="flex mb-1">
                                    {Array.from({ length: 5 }).map((_, index) =>
                                        index < comment.rating ? (
                                            <OutlineStar
                                                key={index}
                                                className="h-5 w-5 stroke-yellow-500 fill-yellow-500 drop-shadow-sm"
                                            />
                                        ) : (
                                            <OutlineStar
                                                key={index}
                                                className="h-5 w-5 stroke-gray-400 fill-white"
                                            />
                                        )
                                    )}
                                </div>
                                <Typography variant="medium" className="text-black mb-2">
                                    {comment.content}
                                </Typography>

                                {/* Ảnh nếu có */}
                                {comment.image?.url && (
                                    <img
                                        src={comment.image.url}
                                        alt="Uploaded"
                                        className="h-32 w-auto object-cover rounded-md mt-2"
                                    />
                                )}

                                {/* Thời gian */}
                                <Typography variant="small" className="mt-1 text-gray-500">
                                    {new Date(comment.userId.createdAt).toLocaleString()}
                                </Typography>
                            </div>
                        </div>
                    ))}

                    {/* Phân trang nếu có nhiều trang */}
                    {reviews?.info?.totalPages > 1 && (
                        <Pagination
                            page={reviews?.info?.totalPages}
                            active={page}
                            setActive={setPage}
                        />
                    )}
                </div>
            )}
           </CardBody>
        </Card>
    );
};

export default CommentSection;
