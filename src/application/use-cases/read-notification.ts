import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReadNotification {
    constructor(private notificationsRepository: NotificationsRepository) {}

    private async _exec(notification_id: string, date: Date) {
        this.notificationsRepository.read(notification_id, date);
    }
    private async _execMany(notification_ids: string[], date: Date) {
        this.notificationsRepository.readMany(notification_ids, date);
    }

    async execute(params: string | string[], date?: Date): Promise<void> {
        const _date = date ?? new Date();
        if (typeof params === 'string') {
            await this._exec(params, _date);
        } else {
            await this._execMany(params, _date);
        }
    }
}
