import { NotificationsRepository } from '@application/repositories/notifications-repository';

export class CancelNotification {
    constructor(private notificationRepository: NotificationsRepository) {}

    async execute(notification_id: string): Promise<void> {
        const notification = await this.notificationRepository.findById(
            notification_id,
        );
        if (notification) this.notificationRepository.cancel(notification);
        else throw new Error('Notification not found');
    }
}
