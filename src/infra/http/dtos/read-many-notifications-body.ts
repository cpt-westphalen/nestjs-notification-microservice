import { IsUUID } from 'class-validator';

export class ReadManyNotificationsBody {
    @IsUUID('all', { each: true })
    notification_ids!: string[];
}
