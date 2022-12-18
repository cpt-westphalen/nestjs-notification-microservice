import { randomUUID } from 'crypto';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { Notification } from '../entities/notification';
import { SendNotification } from './send-notification';
import { CancelNotification } from './cancel-notification';

const correctInputsForExecution = {
    recipientId: randomUUID(),
    content: 'this is a test content',
    category: 'alert',
};

const repository = new InMemoryNotificationsRepository();
const sendNotification = new SendNotification(repository);
let notification: Notification;

describe('CancelNotification Use-Case', () => {
    beforeAll(async () => {
        notification = (
            await sendNotification.execute(correctInputsForExecution)
        ).notification;
    });

    afterAll(() => {
        repository.notifications = [];
    });

    it('should update notification in repository with the "cancelled" flag', async () => {
        const cancelNotification = new CancelNotification(repository);
        const notification_id = notification.id;
        await cancelNotification.execute(notification_id);
        expect(await repository.findById(notification_id)).toHaveProperty(
            'cancelled',
            true,
        );
    });
});
