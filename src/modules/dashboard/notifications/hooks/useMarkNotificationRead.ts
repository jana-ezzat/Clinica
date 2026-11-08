"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosConfig from "@/services/axiosConfig";
import {
  NOTIFICATIONS_KEY,
  type NotificationsData,
} from "./useNotifications";

export default function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axiosConfig.patch(`/notification/${id}`);
      return id;
    },
    onSuccess: (id) => {
      // Flip the item locally so the badge and the list update instantly.
      queryClient.setQueryData<NotificationsData>(NOTIFICATIONS_KEY, (old) => {
        if (!old) return old;
        const target = old.notifications.find((n) => n._id === id);
        if (!target || target.isRead) return old;
        return {
          notifications: old.notifications.map((n) =>
            n._id === id ? { ...n, isRead: true } : n,
          ),
          unreadCount: Math.max(0, old.unreadCount - 1),
        };
      });
    },
  });
}
