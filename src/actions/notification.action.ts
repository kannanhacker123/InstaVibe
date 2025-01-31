"use server";

import { prisma } from "@/lib/prisma";
import { getDbUserId } from "./user.action";

export async function getNotifications() {
    try {
        const userId = await getDbUserId();
    if (!userId) return [];

    const notification = await prisma.notification.findMany({
        where: {
            userId: userId
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            creator: {
                select: {
                    id: true,
                    name: true,
                    username: true,
                    img: true
                }
            },
            post: {
                select: {
                    id: true,
                    content: true,
                    image: true,
                }
            },
            comment: {
                select: {
                    id: true,
                    content: true,
                    createdAt: true
                }
            }
        }
    });
    return notification
    } catch (error) {
        console.log("Error getting notifications", error);
        throw new Error("Failed to fetch notifications");
    }
}

export async function markNotificationsAsRead(notificationIds: string[]) {
    try {
      await prisma.notification.updateMany({
        where: {
          id: {
            in: notificationIds,
          },
        },
        data: {
          read: true,
        },
      });
  
      return { success: true };
    } catch (error) {
      console.error("Error marking notifications as read:", error);
      return { success: false };
    }
  }