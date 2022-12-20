import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Patch,
    Post,
    Put,
    ValidationPipe,
} from '@nestjs/common';
import { Param } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { CancelNotificationParams } from '../dtos/cancel-notification-params';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CountNotifications } from '@application/use-cases/count-notifications';
import { ReadNotification } from '@application/use-cases/read-notification';
import { ReadManyNotificationsBody } from '../dtos/read-many-notifications-body';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { GetNotifications } from '@application/use-cases/get-notifications';
import { GetNotificationsByRecipientId } from '@application/use-cases/get-notifications-by-recipient-id';

@Controller('notifications')
export class NotificationsController {
    constructor(
        private getNotificationsByRecipientId: GetNotificationsByRecipientId,
        private getNotifications: GetNotifications,
        private sendNotification: SendNotification,
        private cancelNotification: CancelNotification,
        private countNotifications: CountNotifications,
        private readNotification: ReadNotification,
        private unreadNotification: UnreadNotification,
    ) {}

    @Get()
    async getAll() {
        const notifications = await this.getNotifications.execute();
        const httpNotifications = notifications.map((n) =>
            NotificationViewModel.toHTTP(n),
        );
        return {
            notifications: httpNotifications,
        };
    }

    @Get('/:recipient_id')
    async getByRecipientId(@Param('recipient_id') recipient_id: string) {
        const notifications = await this.getNotificationsByRecipientId.execute(
            recipient_id,
        );
        if (!notifications) throw new NotFoundException();
        return {
            notifications: notifications.map(NotificationViewModel.toHTTP),
        };
    }

    @Get(':id/count')
    async count(@Param('id') id: string) {
        const count = await this.countNotifications.execute(id);
        return { count };
    }

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

    @Patch(':notification_id/cancel')
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

    @Patch(':notification_id/read')
    async read(@Param('notification_id') notification_id: string) {
        try {
            const date = new Date();
            await this.readNotification.execute(notification_id, date);
            return { notification_id, readAt: date };
        } catch (error) {
            console.log('Caught an error! ', error);
            throw new NotFoundException();
        }
    }

    @Put(':recipient_id/read')
    async readMany(
        @Param('recipient_id') recipient_id: string,
        @Body(ValidationPipe) body: ReadManyNotificationsBody,
    ) {
        try {
            const { notification_ids } = body;
            const date = new Date();
            await this.readNotification.execute(notification_ids, date);
            return { notification_ids, readAt: date };
        } catch (error) {
            console.log('Caught! ', error);
            throw new InternalServerErrorException();
        }
    }

    @Patch(':notification_id/unread')
    async unread(@Param('notification_id') notification_id: string) {
        try {
            await this.unreadNotification.execute(notification_id);
            return { notification_id, readAt: null };
        } catch (error) {
            console.log('Caught an error! ', error);
            throw new NotFoundException();
        }
    }

    @Put(':recipient_id/unread')
    async unreadMany(
        @Param('recipient_id') recipient_id: string,
        @Body(ValidationPipe) body: ReadManyNotificationsBody,
    ) {
        try {
            const { notification_ids } = body;
            await this.unreadNotification.execute(notification_ids);
            return { notification_ids, readAt: null };
        } catch (error) {
            console.log('Caught! ', error);
            throw new InternalServerErrorException();
        }
    }
}
