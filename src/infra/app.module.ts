import { Module } from '@nestjs/common';
import { NotificationsController } from './http/controllers/notifications.controller';
import { PrismaService } from './database/prisma/prisma.service';
import { HttpModule } from './http/http.module';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [HttpModule, DatabaseModule],
})
export class AppModule {}
