import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetNotificationsByRecipientId {
    constructor(private notificationsRepository: NotificationsRepository) {}

    async execute(recipientId: string) {
        return await this.notificationsRepository.findManyByRecipient(
            recipientId,
        );
    }
}
