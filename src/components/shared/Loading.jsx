import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.2,
      repeat: Infinity,
    },
  },
};

const dotVariants = {
  animate: {
    y: ["0%", "-50%", "0%"],
    scale: [1, 1.5, 1],
    opacity: [1, 0.6, 1],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="flex flex-col items-center space-y-4">
        <motion.div
          className="flex space-x-2"
          variants={containerVariants}
          animate="animate"
        >
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="w-4 h-4 bg-red-500 rounded-full"
              variants={dotVariants}
            />
          ))}
        </motion.div>
        <p className="text-white text-sm font-medium tracking-wide">Đang tải...</p>
      </div>
    </div>
  );
};

export default Loading;
