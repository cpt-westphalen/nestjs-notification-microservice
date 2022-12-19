import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CountNotifications {
    constructor(private notificationRepository: NotificationsRepository) {}

    async execute(recipientId: string): Promise<number> {
        const notifications =
            await this.notificationRepository.findManyByRecipient(recipientId);
        return notifications?.length || 0;
    }
}
