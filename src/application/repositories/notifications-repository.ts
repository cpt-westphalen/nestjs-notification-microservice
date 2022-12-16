import { Notification } from '../entities/notification';

export abstract class NotificationsRepository {
    abstract create(notification: Notification): Promise<void>;
    abstract findById(notification_id: string): Promise<Notification | null>;
    abstract cancel(notification_id: string): Promise<void>;
}
