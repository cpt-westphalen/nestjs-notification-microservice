import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetNotifications {
    constructor(private notificationsRepository: NotificationsRepository) {}

    async execute() {
        return await this.notificationsRepository.getAll();
    }
}
