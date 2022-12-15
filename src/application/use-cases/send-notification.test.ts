import { randomUUID } from 'crypto';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { Notification } from '../entities/notification';
import { SendNotification } from './send-notification';

const correctInputsForExecution = {
    recipientId: randomUUID(),
    content: 'this is a test content',
    category: 'alert',
};
describe('SendNotification Use-Case', () => {
    it('should return a Notification object when provided with recipientId, content and category', async () => {
        const sendNotification = new SendNotification(
            new InMemoryNotificationsRepository(),
        );
        const { notification } = await sendNotification.execute(
            correctInputsForExecution,
        );

        expect.assertions(2);
        expect(notification).toBeTruthy();
        expect(notification).toBeInstanceOf(Notification);
    });
    it('should persist the notification on the injected db', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const sendNotification = new SendNotification(notificationsRepository);
        const { notification } = await sendNotification.execute(
            correctInputsForExecution,
        );
        expect(notificationsRepository.notifications.length).toBeGreaterThan(0);
        expect(notificationsRepository.notifications[0]).toBe(notification);
    });
});
