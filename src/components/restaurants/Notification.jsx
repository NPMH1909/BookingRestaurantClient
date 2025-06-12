import React from 'react';

const Notification = ({ notification }) => {
  if (!notification) return null;

  return (
    <div
      className={`mb-4 p-4 rounded-lg text-white font-medium ${
        notification.isSuccess ? "bg-green-500" : "bg-red-500"
      } notification-animation shadow-lg`}
    >
      {notification.message}
    </div>
  );
};

export default Notification;