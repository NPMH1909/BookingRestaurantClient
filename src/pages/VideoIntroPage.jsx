import React, { useState, useEffect, useRef, useCallback } from "react";
import SearchSuggestions from "../components/restaurants/SearchSuggestions";
import VideoList from "../components/restaurants/VideoList";
import {
  useGetVideosQuery,
  useLikeVideoMutation,
  useGetVideosLikeStatusQuery,
  useGetSearchSuggestionsQuery,
} from "../apis/videoApi";
import { useCreateCommentMutation, useGetCommentsForVideoQuery } from "../apis/commentApi";
import throttle from "lodash.throttle";
import Loading from "../components/shared/Loading";
import { remove as removeDiacritics } from "diacritics";
import { useNavigate } from "react-router-dom";

const VideoIntroPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [effectiveSearchTerm, setEffectiveSearchTerm] = useState("");
  const {data: searchSuggestions} = useGetSearchSuggestionsQuery()
  const [page, setPage] = useState(1);
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;
  const userId = localStorage.getItem("userId");
  const {
    data: videosData = { data: [] },
    isLoading: isLoadingVideos,
    isError,
    isFetching,
  } = useGetVideosQuery({ searchTerm: effectiveSearchTerm, page, limit, userId });
  const [createComment, { isLoading: isCreatingComment }] = useCreateCommentMutation();
  const [likeVideo, { isLoading: isLiking }] = useLikeVideoMutation();
  const videoData = videosData?.data
  const [likedVideos, setLikedVideos] = useState({});
  const videoIds = videos?.map((video) => video._id) || [];
  const { data: likeStatusData, isLoading: isLoadingLikeStatus } =
    useGetVideosLikeStatusQuery(videoIds, {
      skip: videoIds.length === 0,
    });

  useEffect(() => {
    if (videoData?.data?.length > 0) {
      setVideos((prevVideos) => {
        const newVideos = videoData.data.filter(
          (newVideo) => !prevVideos.some((v) => v._id === newVideo._id)
        );
        return [...prevVideos, ...newVideos];
      });
      setHasMore(videoData.data.length === limit);
    } else {
      setHasMore(false);
    }
  }, [videoData]);

  useEffect(() => {
    if (likeStatusData?.success && likeStatusData?.data) {
      setLikedVideos(likeStatusData.data);
    }
  }, [likeStatusData]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showSeekbar, setShowSeekbar] = useState(false);
  const [showPlayPauseIcon, setShowPlayPauseIcon] = useState(false);
  const hideIconTimerRef = useRef(null);
  const [replyToCommentId, setReplyToCommentId] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const navigate = useNavigate();

  const currentVideoId = videos[currentIndex]?._id;

  const { data: commentsData, isFetching: isFetchingComments } =
    useGetCommentsForVideoQuery(currentVideoId, {
      skip: !currentVideoId,
    });

  const handleScroll = useCallback(
    throttle(() => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const scrollPosition = container.scrollTop;
      const viewportHeight = container.clientHeight;
      const newIndex = Math.floor((scrollPosition + viewportHeight / 2) / viewportHeight);
      if (newIndex !== currentIndex && newIndex < videos.length) {
        setCurrentIndex(newIndex);
        setIsPaused(false);
      }
      if (
        scrollPosition + viewportHeight > container.scrollHeight - viewportHeight &&
        hasMore &&
        !isFetching
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    }, 200),
    [currentIndex, videos.length, hasMore, isFetching]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  // Manage video playback
  useEffect(() => {
    videoRefs.current.forEach((player, index) => {
      if (player && player.getInternalPlayer()) {
        if (index === currentIndex) {
          if (!isPaused) {
            player.getInternalPlayer().play().catch((error) => {
              console.error("Error playing video:", error);
            });
          } else {
            player.getInternalPlayer().pause();
          }
        } else {
          player.getInternalPlayer().pause();
          player.seekTo(0);
        }
      }
    });
  }, [currentIndex, isPaused]);

  // Update progress for current video
  useEffect(() => {
    if (videoRefs.current[currentIndex]) {
      const interval = setInterval(() => {
        if (
          videoRefs.current[currentIndex] &&
          videoRefs.current[currentIndex].getInternalPlayer() &&
          !isPaused
        ) {
          setProgress(videoRefs.current[currentIndex]?.getCurrentTime() || 0);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [currentIndex, isPaused]);

  // Show/hide play-pause icon
  useEffect(() => {
    if (hideIconTimerRef.current) {
      clearTimeout(hideIconTimerRef.current);
    }

    setShowPlayPauseIcon(true);
    hideIconTimerRef.current = setTimeout(() => {
      setShowPlayPauseIcon(false);
    }, 2000);
    return () => {
      if (hideIconTimerRef.current) {
        clearTimeout(hideIconTimerRef.current);
      }
    };
  }, [isPaused, currentIndex]);

  const handleSeekbarChange = (e, index) => {
    const newTime = parseFloat(e.target.value);
    if (videoRefs.current[index]) {
      videoRefs.current[index].seekTo(newTime);
      setProgress(newTime);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleCommentSubmit = async (e, videoId, parentId = null, content = null) => {
    e.preventDefault();
    const commentContent = content || newComment;
    if (!commentContent.trim()) return;

    try {
      await createComment({
        content: commentContent,
        videoId,
        parentId: parentId || replyToCommentId,
      }).unwrap();

      if (content) {
        setReplyContent("");
        setReplyToCommentId(null);
      } else {
        setNewComment("");
        setReplyToCommentId(null);
      }
    } catch (error) {
      console.error("Lỗi gửi bình luận:", error);
    }
  };

  const formatRestaurantName = (name) => {
    if (!name) return "";
    const noDiacritics = removeDiacritics(name);
    return `#${noDiacritics.toLowerCase().replace(/\s+/g, "").replace(/-/g, "#")}`;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const togglePlayPause = () => {
    setIsPaused(!isPaused);
  };

  const handleSearch = () => {
    setVideos([]); // 🔥 Clear old videos
    setPage(1); // Reset page to 1
    setHasMore(true);
    setEffectiveSearchTerm(searchTerm);  // chính thức gọi API với từ khoá
  };

  const handleVideoClick = () => {
    togglePlayPause();
  };

  const handleLikeVideo = async (videoId) => {
    try {
      setLikedVideos((prev) => ({
        ...prev,
        [videoId]: !prev[videoId],
      }));
      await likeVideo(videoId).unwrap();
    } catch (error) {
      console.error("Không thể like video:", error);
      setLikedVideos((prev) => ({
        ...prev,
        [videoId]: !prev[videoId],
      }));
    }
  };
    const handleSuggestionClick = (suggestion) => {
        setEffectiveSearchTerm(suggestion);
        handleSearch();
    };


  const isCurrentVideoLiked = (videoId) => {
    return likedVideos[videoId] || false;
  };

  if (isLoadingVideos && page === 1) return <Loading />;
  if (isError) return <div className="h-screen flex items-center justify-center">Error loading videos.</div>;
  if (!videos?.length && !isLoadingVideos && !isFetching) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">Không có video nào hiện tại.</p>
      </div>
    );
  }

  return (
    <div className="inset-0 bg-transparent flex justify-center">
      {!showComments && (
        <SearchSuggestions
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
          suggestions = {searchSuggestions?.data}
          handleSuggestionClick={handleSuggestionClick}
        />
      )}

      <VideoList
        showComments={showComments}
        containerRef={containerRef}
        videos={videos}
        currentIndex={currentIndex}
        isPaused={isPaused}
        isMuted={isMuted}
        showPlayPauseIcon={showPlayPauseIcon}
        showSeekbar={showSeekbar}
        setShowSeekbar={setShowSeekbar}
        progress={progress}
        handleVideoClick={handleVideoClick}
        handleSeekbarChange={handleSeekbarChange}
        toggleComments={toggleComments}
        toggleMute={toggleMute}
        handleLikeVideo={handleLikeVideo}
        isLiking={isLiking}
        isCurrentVideoLiked={isCurrentVideoLiked}
        commentsData={commentsData}
        isFetching={isFetchingComments}
        handleCommentSubmit={handleCommentSubmit}
        newComment={newComment}
        setNewComment={setNewComment}
        isCreatingComment={isCreatingComment}
        videoRefs={videoRefs}
        showFullDescription={showFullDescription}
        setShowFullDescription={setShowFullDescription}
        navigate={navigate}
        formatRestaurantName={formatRestaurantName}
        setReplyToCommentId={setReplyToCommentId}
        setReplyContent={setReplyContent}
        replyToCommentId={replyToCommentId}
        replyContent={replyContent}
      />
    </div>
  );
};

export default VideoIntroPage;