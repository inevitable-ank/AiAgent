import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message, type = "info") => {
        const newNotification = {
            id: Date.now(),
            message,
            type, // 'info', 'success', 'error'
        };
        setNotifications((prev) => [...prev, newNotification]);

        // Auto-remove notification after 5 seconds
        setTimeout(() => {
            setNotifications((prev) =>
                prev.filter((notification) => notification.id !== newNotification.id)
            );
        }, 5000);
    };

    return (
        <NotificationContext.Provider value={{ notifications, addNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
