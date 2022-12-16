import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { SendNotification } from '@application/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { CancelNotification } from '@application/use-cases/cancel-notification';

@Module({
    imports: [DatabaseModule],
    providers: [SendNotification, CancelNotification],
    controllers: [NotificationsController],
})
export class HttpModule {}
