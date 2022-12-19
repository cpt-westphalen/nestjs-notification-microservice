import { SendNotificationRequest } from '@application/use-cases/send-notification';
import { randomUUID } from 'crypto';

type Override = Partial<SendNotificationRequest>;

export function makeNotification(override?: Override) {
    return {
        recipientId: override?.recipientId ?? randomUUID(),
        content: override?.content ?? 'this is a test content',
        category: override?.category ?? 'social',
    };
}
