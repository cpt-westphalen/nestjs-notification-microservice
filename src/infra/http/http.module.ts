import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { SendNotification } from '@application/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { CountNotifications } from '@application/use-cases/count-notifications';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { GetNotifications } from '@application/use-cases/get-notifications';

@Module({
    imports: [DatabaseModule],
    providers: [
        GetNotifications,
        SendNotification,
        CancelNotification,
        CountNotifications,
        ReadNotification,
        UnreadNotification,
    ],
    controllers: [NotificationsController],
})
export class HttpModule {}
