import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';

interface PrismaNotification {
    id: string;
    category: string;
    content: string;
    recipientId: string;
    readAt: Date | null | undefined;
    createdAt: Date;
    cancelled?: boolean | null;
}

export class PrismaNotificationMapper {
    static toPrisma(notification: Notification): PrismaNotification {
        return {
            id: notification.id,
            category: notification.category,
            content: notification.content,
            recipientId: notification.recipientId,
            readAt: notification.readAt,
            createdAt: notification.createdAt,
            cancelled: notification.cancelled,
        };
    }

    static fromPrisma(prismaNotification: PrismaNotification): Notification {
        const {
            id,
            category,
            content,
            createdAt,
            readAt,
            recipientId,
            cancelled,
        } = prismaNotification;
        const contentObj = new Content(content);
        const notification = new Notification(
            {
                recipientId,
                category,
                content: contentObj,
                cancelled: cancelled ?? false,
                createdAt,
                readAt,
            },
            id,
        );
        return notification;
    }
}
