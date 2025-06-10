import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

// import { notificationAPI } from "../services/notificationAPI";
import { formatDate } from "../utils/utils";
import useAuth from "../hooks/useAuth";

const NotificationPage = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const { user } = useAuth();
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // const res = await notificationAPI.getNotifications(user.id);
        console.log("Fetched notifications:", res.data.notifications);
        setNotifications(res.data.notifications || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    if (isOpen && user?.id) {
      fetchNotifications();
    }
  }, [isOpen, user?.id]);

  const getFilteredNotifications = () => {
    const all = Array.isArray(notifications) ? notifications : [];
    if (activeFilter === "All") {
      return all;
    }
    return all?.filter(
      (notification) => notification.notificationType === activeFilter
    );
  };

  const formatNotificationText = (text) => {
    const appNumberRegex = /(#\d+)/g;
    const parts = text.split(appNumberRegex);

    return parts.map((part, index) => {
      if (part.startsWith("#")) {
        return (
          <span key={index} className="font-bold text-white">
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div
      className={`fixed top-14 right-4 z-30 w-96 max-h-[90vh] bg-[#0f0f0f] rounded-md border border-[#333333] shadow-lg overflow-hidden ${
        !isOpen && "hidden"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 ">
        <h3 className="font-medium text-white text-sm">Notifications</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white focus:outline-none"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Filter buttons */}
      <div className="flex space-x-1 px-3 py-2  bg-[#131313]">
        {["All", "Credit Manager", "System"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3 py-1 rounded-3xl text-xs ring-1 ${
              activeFilter === filter
                ? "bg-yellow-400/20 text-[#FFCA20]  ring-[#FFCA20]  font-medium"
                : "bg-[#131313] ring-[#333333] text-gray-300 hover:bg-gray-800"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Notification list */}
      <div className="max-h-[70vh] overflow-y-auto divide-y divide-dashed divide-gray-700">
        {getFilteredNotifications().length > 0 ? (
          getFilteredNotifications().map((notification, index) => (
            <div
              key={index}
              className="flex items-start gap-3 ml-4 px-4 py-3 hover:bg-[#1a1a1a] transition"
            >
              {/* Content */}
              <div className="flex-1">
                <p className="text-sm text-white leading-snug">
                  {formatNotificationText(notification.message)}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {formatDate(notification.sentAt)}
                </p>
              </div>

              {/* Type badge */}
              <div className="ml-auto px-2 py-1 rounded text-[10px] bg-[#131313] text-gray-300 border border-[#333333]">
                {notification.notificationType}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-6 text-sm">
            No notifications yet
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
