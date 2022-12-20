import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';
import { GetNotifications } from './get-notifications';
import { makeNotification } from '@test/factories/make-notification';
import { randomUUID } from 'crypto';

const repository = new InMemoryNotificationsRepository();
const sendNotification = new SendNotification(repository);
const getNotifications = new GetNotifications(repository);

describe('Get All Notifications Use-Case', () => {
    it('should get an array with every notification in the repository', async () => {
        const notification0 = (
            await sendNotification.execute(makeNotification())
        ).notification;
        const notification1 = (
            await sendNotification.execute(
                makeNotification({ recipientId: randomUUID() }),
            )
        ).notification;
        const notifications = await getNotifications.execute();
        expect(notifications).toEqual([notification0, notification1]);
    });
});
