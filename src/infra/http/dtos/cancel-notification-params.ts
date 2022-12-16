import { IsNotEmpty, IsUUID } from 'class-validator';

export class CancelNotificationParams {
    @IsNotEmpty()
    @IsUUID()
    notification_id: string;
}
