import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaNotificationMapper } from '../mapper/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
    constructor(private prismaService: PrismaService) {}

    async create(notification: Notification): Promise<void> {
        const prismaDataNotification =
            PrismaNotificationMapper.toPrisma(notification);

        await this.prismaService.notification.create({
            data: prismaDataNotification,
        });
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

    async cancel(notification_id: string): Promise<void> {
        await this.prismaService.notification.update({
            data: { cancelled: true },
            where: { id: notification_id },
        });
    }
}
