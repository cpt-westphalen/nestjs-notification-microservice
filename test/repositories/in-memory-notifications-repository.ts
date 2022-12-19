import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';

export class InMemoryNotificationsRepository
    implements NotificationsRepository
{
    public notifications: Notification[];
    constructor() {
        this.notifications = [];
    }

    async findById(notification_id: string): Promise<Notification | null> {
        return this.notifications.find((n) => n.id === notification_id) || null;
    }
    async findManyByRecipient(
        recipientId: string,
    ): Promise<Notification[] | null> {
        return (
            this.notifications.filter((n) => n.recipientId === recipientId) ||
            null
        );
    }

    async create(notification: Notification) {
        this.notifications.push(notification);
    }

    async cancel(notification_id: string): Promise<void> {
        const dbNotification = (await this.findById(notification_id)) || null;
        if (dbNotification) {
            dbNotification.cancelled = true;
        }
    }
}
