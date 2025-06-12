import React from "react";
import ReactPlayer from "react-player";
import { Heart, MessageSquare, Volume2, VolumeX } from "lucide-react";
import CommentItem from "./CommentItem";

const VideoList = ({
  showComments,
  containerRef,
  videos,
  currentIndex,
  isPaused,
  isMuted,
  showPlayPauseIcon,
  showSeekbar,
  progress,
  handleVideoClick,
  handleSeekbarChange,
  toggleComments,
  toggleMute,
  handleLikeVideo,
  isLiking,
  isCurrentVideoLiked,
  commentsData,
  isFetching,
  handleCommentSubmit,
  newComment,
  setNewComment,
  isCreatingComment,
  videoRefs,
  showFullDescription,
  setShowFullDescription,
  navigate,
  formatRestaurantName,
  setShowSeekbar,
  setReplyToCommentId,
  setReplyContent,
  replyToCommentId,
  replyContent,
}) => {
  return (
    <div
      ref={containerRef}
      className={`${showComments ? "h-[70vh]" : "h-[70vh]"} 
        ${showComments ? "w-[90vw]" : "w-[60vw]"} 
        ${showComments ? "mt-8" : "mt-2"}
        overflow-y-scroll snap-y snap-mandatory scrollbar-hide rounded-lg shadow-lg mx-auto`}
      style={{ scrollBehavior: "smooth" }}
    >
      {videos?.map((video, index) => {
        const videoId = video._id;
        const isLiked = isCurrentVideoLiked(videoId);

        return (
          <div
            key={video._id} // Use actual _id as key
            className="h-[70vh] snap-start relative flex transition-all duration-300"
            onMouseEnter={() => setShowSeekbar(true)}
            onMouseLeave={() => setShowSeekbar(false)}
          >
            <div
              className={`h-full pt-2 ${
                showComments ? "w-[60vw]" : "w-full"
              } transition-all duration-300 border-r-4 border-gray-300 ${
                showComments ? "border-solid" : ""
              }`}
            >
              <div className="relative h-full w-full bg-black rounded-lg overflow-hidden shadow-lg">
                {!showComments && (
                  <div className="absolute bottom-4 left-4 text-white p-2 rounded-lg text-sm max-w-[90%] transition-all duration-300 z-50">
                    <p className={`description ${showFullDescription ? "line-clamp-none" : ""}`}>
                      {video.content || "No description available"}
                    </p>

                    {video.content?.length > 200 && (
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => setShowFullDescription(!showFullDescription)}
                      >
                        {showFullDescription ? " Ẩn bớt" : " Xem thêm"}
                      </span>
                    )}

                    {Array.isArray(video.tags) && video.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {video.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-blue-300 cursor-pointer hover:underline"
                            onClick={() => navigate("/restaurant/" + video.restaurantId._id)}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div onClick={handleVideoClick} className="w-full h-full cursor-pointer">
                  <ReactPlayer
                    ref={(el) => (videoRefs.current[index] = el)}
                    url={video.url}
                    playing={index === currentIndex && !isPaused}
                    controls={false}
                    width="100%"
                    height="100%"
                    muted={isMuted}
                    loop={true}
                    playsinline={true}
                    config={{ file: { attributes: { preload: "auto" } } }}
                  />
                </div>

                {index === currentIndex && showPlayPauseIcon && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-70 transition-all">
                    <span className="block w-8 h-8 text-white text-center">
                      {isPaused ? "▶" : "⏸"}
                    </span>
                  </div>
                )}

                {showSeekbar && (
                  <div className="absolute bottom-0 w-full bg-opacity-50 bg-black">
                    <input
                      type="range"
                      min="0"
                      max={videoRefs.current[index]?.getDuration() || 100}
                      value={index === currentIndex ? progress : 0}
                      onChange={(e) => handleSeekbarChange(e, index)}
                      className="w-full h-2"
                    />
                  </div>
                )}

                <button
                  onClick={() => handleLikeVideo(videoId)}
                  className="absolute bottom-40 right-4 z-10 p-2 rounded-full hover:bg-opacity-70 transition-all"
                  disabled={isLiking}
                >
                  <Heart
                    className={`w-6 h-6 ${isLiked ? "fill-current text-red-500" : "fill-transparent text-white"}`}
                  />
                </button>

                <button
                  onClick={toggleComments}
                  className="absolute bottom-28 right-4 z-10 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-all"
                >
                  <MessageSquare className="w-6 h-6 text-white" />
                </button>

                <button
                  onClick={toggleMute}
                  className="absolute bottom-16 right-4 z-10 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-all"
                >
                  {isMuted ? <VolumeX className="w-6 h-6 text-white" /> : <Volume2 className="w-6 h-6 text-white" />}
                </button>
              </div>
            </div>

            {showComments && (
              <div className="h-full w-[40vw] bg-white p-4 overflow-y-auto shadow-lg relative flex flex-col justify-between">
                <div className="mb-4">
                  <h2 className="text-lg font-bold mb-4">{video.description}</h2>
                  <p
                    className="text-blue-300 cursor-pointer hover:underline"
                    onClick={() => navigate("/restaurant/" + video.restaurantId)}
                  >
                    {formatRestaurantName(video.restaurantName)}
                  </p>
                  <p className="border-b-2 border-gray-300">Bình luận</p>

                  {isFetching ? (
                    <p>Hiển thị bình luận...</p>
                  ) : commentsData?.data?.length > 0 ? (
                    <div className="mb-24">
                      {commentsData?.data?.map((comment) => (
                        <CommentItem
                          key={comment._id}
                          comment={comment}
                          onReplyClick={(id) => {
                            if (replyToCommentId === id) {
                              setReplyToCommentId(null);
                            } else {
                              setReplyToCommentId(id);
                              setReplyContent("");
                            }
                          }}
                          replyingToId={replyToCommentId}
                          replyContent={replyContent}
                          setReplyContent={setReplyContent}
                          handleReplySubmit={handleCommentSubmit}
                          currentVideoId={videoId}
                        />
                      ))}
                    </div>
                  ) : (
                    <p>Chưa có bình luận nào.</p>
                  )}
                </div>

                <div className="sticky bottom-0 left-0 w-full bg-white p-4 shadow-lg z-10">
                  <form
                    onSubmit={(e) => handleCommentSubmit(e, videoId)}
                    className="flex items-center space-x-2"
                  >
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Viết bình luận của bạn..."
                      className="flex-1 border rounded-lg p-2 resize-none"
                      rows={3}
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 text-white p-2 rounded-lg"
                      disabled={isCreatingComment}
                    >
                      {isCreatingComment ? "Đang đăng tải..." : "Đăng"}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default VideoList;