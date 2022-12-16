import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateNotificationBody } from '../dtos/create-notification-body';

@Controller('notifications')
export class NotificationsController {
    constructor() {}

    @Post()
    async create(@Body() body: CreateNotificationBody) {
        const { recipientId, content, category } = body;
    }
}
