import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UnreadNotification {
    constructor(private notificationsRepository: NotificationsRepository) {}

    private async _exec(notification_id: string) {
        this.notificationsRepository.unread(notification_id);
    }
    private async _execMany(notification_ids: string[]) {
        this.notificationsRepository.unreadMany(notification_ids);
    }

    async execute(params: string | string[]): Promise<void> {
        if (typeof params === 'string') {
            await this._exec(params);
        } else {
            await this._execMany(params);
        }
    }
}
