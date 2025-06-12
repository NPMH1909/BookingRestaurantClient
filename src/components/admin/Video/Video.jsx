import React, { useState, useEffect } from 'react';
import { useGetAllVideosByResIdQuery, useUpdateVideoMutation, useDeleteVideoMutation, useCreateVideoMutation } from '../../../apis/videoApi';
import { Button } from '@material-tailwind/react';
import Pagination from '../../shared/Pagination';
import { useGetAllRestaurantByUserIdQuery } from '../../../apis/restaurantApi'; // Assuming you have a restaurantApi defined
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; //
import Loading from '../../shared/Loading';
import { Toast } from '../../../configs/SweetAlert2';

const Video = ({ selectedRestaurant }) => {
  const restaurantId = selectedRestaurant?._id;
  const [active, setActive] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const [videoData, setVideoData] = useState({
    title: '', description: '', videoFile: null, videoId: '', restaurantId: ''
  });
  const { data, error, isLoading, refetch: refetchVideos } = useGetAllVideosByResIdQuery(restaurantId, { skip: !restaurantId });

  const [addVideo, { isLoading: isAdded, error: addedError }] = useCreateVideoMutation();
  const [updateVideo, { isLoading: isUpdated, error: updatedError }] = useUpdateVideoMutation();
  const [deleteVideo] = useDeleteVideoMutation();

  const handleOpenModal = (video = null) => {
    setIsEditMode(video !== null);
    if (video) {
      setVideoData({
        content: video.content,
        videoFile: null,
        videoId: video._id,
      });
    } else {
      setVideoData({ content: '', videoFile: null, videoId: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVideoData((prev) => ({
      ...prev,
      videoFile: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("content", videoData.content);

      if (videoData.videoFile) {
        formData.append("video", videoData.videoFile); // key "url" tương ứng với backend xử lý file
      }

      let response;

      if (isEditMode) {
        // Cập nhật video, gửi videoId kèm formData
        response = await updateVideo({
          videoId: videoData.videoId,
          updatedData: formData,
        });
        if (response?.data) {
          Toast.fire({
            icon: "success",
            title: "Cập nhật video thành công",
          })
        }
      } else {
        // Thêm video mới, gửi restaurantId bên ngoài cùng formData
        response = await addVideo({
          formData,
          restaurantId,
        });
        if (response?.data) {
          Toast.fire({
            icon: "success",
            title: "Thêm video thành công",
          })
        }
      }

      if (response?.data) {
        setShowModal(false);
        setVideoData({
          content: '',
          videoFile: null,
          videoId: '',
        });
        refetchVideos();
      }
    } catch (err) {
      console.error("Error adding/updating video:", err);
      toast.error("Đã có lỗi xảy ra!");
    }
  };



  const handleShowDeleteDialog = (video) => {
    setVideoToDelete(video);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (videoToDelete) {
        const response = await deleteVideo(videoToDelete._id);
        if (response?.data) {
          refetchVideos();
        }
        Toast.fire({
          icon: "success",
          title: "Xóa video thành công",
        })

      }
    } catch (err) {
      console.error("Error deleting video:", err);
    } finally {
      setShowDeleteDialog(false);
      setVideoToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
    setVideoToDelete(null);
  };

  if (isLoading) return <p>Đang tải video và nhà hàng...</p>;
  if (error) return <p>Có lỗi xảy ra: {error.message}</p>;

  return (
    <div className="m-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold mx-8 mt-2">Danh sách Video</h1>
        <Button
          variant="outlined"
          className="w-auto"
          size="regular"
          onClick={() => handleOpenModal()}
        >
          Thêm Video
        </Button>
      </div>
      {!restaurantId && (
        <div className="text-center text-gray-700 mt-4">
          Không có dữ liệu
        </div>
      )}


      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Xác nhận xóa video</h3>

            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                onClick={handleDeleteCancel}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded"
                onClick={handleDeleteConfirm}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.map((video) => (
          <div key={video._id} className="flex flex-col items-center p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold text-lg text-center mb-2">{video.content}</h3>
            <video
              src={video.url}
              controls
              className="mt-auto"
              style={{ width: '100%', height: '180px' }}
            />
            <div className="flex gap-2 mt-4">
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleOpenModal(video)}
              >
                Sửa
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="red"
                onClick={() => handleShowDeleteDialog(video)}
              >
                Xóa
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        page={data?.totalPages || 1}
        active={active}
        setActive={setActive}
      />

      {/* Modal for add/edit video */}
      {showModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          {(isUpdated || isAdded) ? (<Loading />) : (<div className="bg-white p-6 w-96 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">{isEditMode ? 'Sửa Video' : 'Thêm Video Mới'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Tiêu Đề</label>
                <input
                  type="text"
                  value={videoData.content}
                  onChange={(e) => setVideoData({ ...videoData, content: e.target.value })}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>


              <div className="mb-4">
                <label className="block text-sm font-semibold">Video</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="flex justify-end gap-4">
                <Button variant="outlined" onClick={handleCloseModal}>Hủy</Button>
                <Button variant="filled" type="submit">{isEditMode ? 'Cập nhật' : 'Thêm Video'}</Button>
              </div>
            </form>
          </div>)}
        </div>
      )}
      <ToastContainer className="w-auto" />
    </div>
  );
};

export default Video;
