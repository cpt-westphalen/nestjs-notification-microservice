import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
    constructor(private prismaService: PrismaService) {}

    async create(notification: Notification): Promise<void> {
        const { id, category, content, createdAt, readAt, recipientId } =
            notification;
        await this.prismaService.notification.create({
            data: {
                id,
                category,
                content,
                recipientId,
                readAt,
                createdAt,
            },
        });
    }
}
