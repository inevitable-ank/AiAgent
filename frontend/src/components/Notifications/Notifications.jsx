import React from "react";
import { useNotification } from "../context/NotificationContext";

const Notifications = () => {
    const { notifications } = useNotification();

    return (
        <div className="fixed top-5 right-5 space-y-4 z-50">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`p-4 rounded shadow-md text-white ${
                        notification.type === "success"
                            ? "bg-green-500"
                            : notification.type === "error"
                            ? "bg-red-500"
                            : "bg-blue-500"
                    }`}
                >
                    {notification.message}
                </div>
            ))}
        </div>
    );
};

export default Notifications;
