"use client";

import { useQuery } from "@tanstack/react-query";
import axiosConfig from "@/services/axiosConfig";
import { useAuth } from "@/shared/hooks/useAuth";

export interface AppNotification {
  _id: string;
  type: string;
  title: string;
  message: string;
  relatedId: string;
  relatedModel: string;
  createdAt: string;
  isRead: boolean;
}

interface NotificationsResponse {
  status: string;
  results: number;
  unreadCount: number;
  data: { notifications: AppNotification[] };
}

export interface NotificationsData {
  notifications: AppNotification[];
  unreadCount: number;
}

export const NOTIFICATIONS_KEY = ["notifications"] as const;

const fetchNotifications = async (): Promise<NotificationsData> => {
  const { data } = await axiosConfig.get<NotificationsResponse>("/notification");
  return {
    notifications: data.data.notifications,
    unreadCount: data.unreadCount,
  };
};

export default function useNotifications() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: NOTIFICATIONS_KEY,
    queryFn: fetchNotifications,
    enabled: isAuthenticated,
    refetchInterval: 60_000,
  });
}
