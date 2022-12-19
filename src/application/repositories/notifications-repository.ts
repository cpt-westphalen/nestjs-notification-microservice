import { Notification } from '../entities/notification';

export abstract class NotificationsRepository {
    abstract findById(notification_id: string): Promise<Notification | null>;
    abstract findManyByRecipient(
        recipientId: string,
    ): Promise<Notification[] | null>;
    abstract create(notification: Notification): Promise<void>;
    abstract cancel(notification_id: string): Promise<void>;
}
