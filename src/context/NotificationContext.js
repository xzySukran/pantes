import { createContext, useState } from "react";

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (type, title, message) => {
    const newNotif = {
      id: Date.now().toString(),
      type,
      title,
      message,
      read: false,
      createdAt: new Date(),
    };

    setNotifications((prev) => [newNotif, ...prev]);

    // auto read setelah 5 detik
    setTimeout(() => {
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === newNotif.id ? { ...n, read: true } : n
        )
      );
    }, 5000);
  };

  // ✅ TAMBAHAN PENTING
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAllAsRead,
        markAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
