import {
    Body,
    Controller,
    NotFoundException,
    Patch,
    Post,
} from '@nestjs/common';
import { Param } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { CancelNotificationParams } from '../dtos/cancel-notification-params';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
    constructor(
        private sendNotification: SendNotification,
        private cancelNotification: CancelNotification,
    ) {}

    @Post()
    async create(@Body() body: CreateNotificationBody) {
        const { recipientId, content, category } = body;

        const { notification } = await this.sendNotification.execute({
            recipientId,
            category,
            content,
        });

        const httpNotification = NotificationViewModel.toHTTP(notification);

        return {
            message: 'Success! New notification sent',
            notification: httpNotification,
        };
    }

    @Patch('cancel/:notification_id')
    async cancel(@Param() { notification_id }: CancelNotificationParams) {
        try {
            await this.cancelNotification.execute(notification_id);
            return {
                message:
                    "Done! Notification '" +
                    notification_id +
                    "' was cancelled.",
            };
        } catch (error) {
            console.log('Caught an error! ', error);
            throw new NotFoundException();
        }
    }
}
