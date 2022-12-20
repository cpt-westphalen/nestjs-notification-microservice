import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { NotFoundException } from '@nestjs/common';

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

    async read(notification_id: string, date: Date): Promise<void> {
        const notification = this.notifications.find(
            (n) => n.id === notification_id,
        );
        if (!notification) throw new NotFoundException();
        notification.readAt = date ?? new Date();
    }

    async readMany(notification_ids: string[], date: Date): Promise<void> {
        const _date = date ?? new Date();
        notification_ids.forEach((notification_id) => {
            const notification = this.notifications.find(
                (n) => n.id === notification_id,
            );
            if (!notification) throw new NotFoundException();
            notification.readAt = _date;
        });
    }
    async unread(notification_id: string): Promise<void> {
        const notification = this.notifications.find(
            (n) => n.id === notification_id,
        );
        if (!notification) throw new NotFoundException();
        notification.readAt = null;
    }

    async unreadMany(notification_ids: string[]): Promise<void> {
        notification_ids.forEach((notification_id) => {
            const notification = this.notifications.find(
                (n) => n.id === notification_id,
            );
            if (!notification) throw new NotFoundException();
            notification.readAt = null;
        });
    }
}
