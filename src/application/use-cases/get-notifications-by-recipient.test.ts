import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';
import { GetNotificationsByRecipientId } from './get-notifications-by-recipient-id';
import { makeNotification } from '@test/factories/make-notification';
import { randomUUID } from 'crypto';

const repo = new InMemoryNotificationsRepository();
const sendNotification = new SendNotification(repo);
const getNotificationsByRecipientId = new GetNotificationsByRecipientId(repo);

describe('Get Notifications By Recipient use case', () => {
    it('should return all and only notifications of the provided recipientId', async () => {
        const recipientId = randomUUID();
        await sendNotification.execute(makeNotification({ recipientId }));
        await sendNotification.execute(makeNotification({ recipientId }));
        await sendNotification.execute(
            makeNotification({ recipientId: randomUUID() }),
        );
        await sendNotification.execute(makeNotification({ recipientId }));
        await sendNotification.execute(
            makeNotification({ recipientId: randomUUID() }),
        );
        await sendNotification.execute(
            makeNotification({ recipientId: randomUUID() }),
        );
        await sendNotification.execute(makeNotification({ recipientId }));

        const notificationsForRecipientId =
            await getNotificationsByRecipientId.execute(recipientId);

        expect(notificationsForRecipientId).toHaveLength(4);
        expect(notificationsForRecipientId).toEqual(
            repo.notifications.filter((n) => n.recipientId === recipientId),
        );
    });
});
