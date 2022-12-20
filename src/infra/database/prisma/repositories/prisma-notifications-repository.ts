import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mapper/prisma-notification-mapper';
import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { Notification } from '@application/entities/notification';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
    constructor(private prismaService: PrismaService) {}

    async getAll(): Promise<Notification[]> {
        const rawNotifications =
            await this.prismaService.notification.findMany();
        const notifications = rawNotifications.map((n) =>
            PrismaNotificationMapper.fromPrisma(n),
        );
        return notifications;
    }

    async findById(notification_id: string): Promise<Notification | null> {
        const prismaNotification =
            await this.prismaService.notification.findUnique({
                where: { id: notification_id },
            });
        if (!prismaNotification) throw new Error('Notification not found');
        const notification =
            PrismaNotificationMapper.fromPrisma(prismaNotification);
        return notification;
    }

    async findManyByRecipient(
        recipientId: string,
    ): Promise<Notification[] | null> {
        const notifications = await this.prismaService.notification.findMany({
            where: { recipientId },
        });
        if (!notifications) return null;
        return notifications.map(PrismaNotificationMapper.fromPrisma);
    }

    async create(notification: Notification): Promise<void> {
        const prismaDataNotification =
            PrismaNotificationMapper.toPrisma(notification);

        await this.prismaService.notification.create({
            data: prismaDataNotification,
        });
    }

    async cancel(notification_id: string): Promise<void> {
        await this.prismaService.notification.update({
            data: { cancelled: true },
            where: { id: notification_id },
        });
    }

    async read(notification_id: string, date: Date): Promise<void> {
        await this.prismaService.notification.update({
            data: { readAt: date },
            where: { id: notification_id },
        });
    }
    async readMany(notification_ids: string[], date: Date): Promise<void> {
        await this.prismaService.$transaction(
            notification_ids.map((id) =>
                this.prismaService.notification.update({
                    data: { readAt: date },
                    where: { id },
                }),
            ),
        );
    }
    async unread(notification_id: string): Promise<void> {
        await this.prismaService.notification.update({
            data: { readAt: null },
            where: { id: notification_id },
        });
    }
    async unreadMany(notification_ids: string[]): Promise<void> {
        await this.prismaService.$transaction(
            notification_ids.map((id) =>
                this.prismaService.notification.update({
                    data: { readAt: null },
                    where: { id },
                }),
            ),
        );
    }
}
