import { Notification } from 'src/application/entities/notification';
import { NotificationsRepository } from '../../../../../src/application/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';

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
