import React, { useRef } from "react";
import ReactPlayer from "react-player";
import { useInView } from "react-intersection-observer";
import { HeartIcon, ChatBubbleOvalLeftEllipsisIcon, ShareIcon } from "@heroicons/react/24/solid";

const VideoCard = ({ video }) => {
  const videoRef = useRef(null);
  const { ref, inView } = useInView({ threshold: 0.9 });

  return (
    <div ref={ref} className="relative w-full h-screen flex items-center justify-center">
      {/* Video */}
      <ReactPlayer
        ref={videoRef}
        url={video.videoUrl}
        playing={inView}
        loop
        muted
        width="100%"
        height="100%"
        className="object-cover"
      />

      {/* Thông tin */}
      <div className="absolute bottom-16 left-4 text-white">
        <h2 className="text-xl font-bold">{video.user}</h2>
        <p className="text-sm">{video.description}</p>
      </div>

      {/* Nút tương tác */}
      <div className="absolute bottom-20 right-4 flex flex-col items-center gap-4 text-white">
        <button className="p-2 rounded-full bg-black/50 hover:bg-black">
          <HeartIcon className="w-7 h-7" />
        </button>
        <button className="p-2 rounded-full bg-black/50 hover:bg-black">
          <ChatBubbleOvalLeftEllipsisIcon className="w-7 h-7" />
        </button>
        <button className="p-2 rounded-full bg-black/50 hover:bg-black">
          <ShareIcon className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
