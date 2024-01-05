import { Notification, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sendNotification = async (data: Notification) => {
  const { userId } = data; 

  // Check the number of notifications for the user
  const userNotificationCount = await prisma.notification.count({
    where: { userId },
  });

  if (userNotificationCount >= 20) {
    const notificationsToDelete = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
      take: userNotificationCount - 19,
    });

    const notificationIdsToDelete = notificationsToDelete.map(
      (notification) => notification.id
    );

    await prisma.notification.deleteMany({
      where: {
        id: { in: notificationIdsToDelete },
      },
    });
  }

  // Create and return the new notification
  const newNotification = await prisma.notification.create({
    data,
  });
  return newNotification;
};





const sendNotificationToAllUsers = async (
  data: Notification
): Promise<unknown> => {
  const users = await prisma.user.findMany({
    where: {
      role: "user",
    },
  });

  const notifications = users.map((user) => ({
    ...data,
    userId: user.id,
  }));

  const newNotifications = await prisma.notification.createMany({
    data: notifications,
    skipDuplicates: true,
  });

  return newNotifications;
};

const getUserNotifications = async (
  userId: string
): Promise<Notification[]> => {
  const notifications = await prisma.notification.findMany({
    where: { userId },
  });
  return notifications;
};

const deleteAllUserNotifications = async (userId: string): Promise<unknown> => {
  const result = await prisma.notification.deleteMany({
    where: { userId },
  });
  return result;
};



export const notificationService = {
  sendNotification,
  getUserNotifications,
  deleteAllUserNotifications,
  sendNotificationToAllUsers,
};
