import { Notification } from '../entities/notification';

export abstract class NotificationsRepository {
    abstract findById(notification_id: string): Promise<Notification | null>;
    abstract findManyByRecipient(
        recipientId: string,
    ): Promise<Notification[] | null>;
    abstract create(notification: Notification): Promise<void>;
    abstract cancel(notification_id: string): Promise<void>;
    abstract read(notification_id: string, date: Date): Promise<void>;
    abstract readMany(notification_ids: string[], date: Date): Promise<void>;
    abstract unread(notification_id: string): Promise<void>;
    abstract unreadMany(notification_ids: string[]): Promise<void>;
}
