import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';

export class InMemoryNotificationsRepository
    implements NotificationsRepository
{
    public notifications: Notification[];
    constructor() {
        this.notifications = [];
    }
    async create(notification: Notification) {
        this.notifications.push(notification);
    }
    async findById(notification_id: string): Promise<Notification | null> {
        return this.notifications.find((n) => n.id === notification_id) || null;
    }
    async cancel(notification: Notification): Promise<void> {
        const dbNotification = (await this.findById(notification.id)) || null;
        if (dbNotification) {
            dbNotification.cancelled = true;
        }
    }
}
