import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';
import { ReadNotification } from './read-notification';
import { makeNotification } from '@test/factories/make-notification';

const repository = new InMemoryNotificationsRepository();
const sendNotification = new SendNotification(repository);

describe('Read Notification Use-Case', () => {
    afterEach(() => {
        repository.notifications = [];
    });

    it('should update a notification in repository with the "readAt" date when UUID string is provided', async () => {
        const {
            notification: { id: notification_id },
        } = await sendNotification.execute(makeNotification());
        const readNotification = new ReadNotification(repository);
        await readNotification.execute(notification_id, new Date());
        expect.assertions(1);
        expect(await repository.findById(notification_id)).toHaveProperty(
            'readAt',
            expect.any(Date),
        );
    });

    it('should update many notifications in repository with the "readAt" date when UUID string array is provided', async () => {
        const notifications = await (async () => {
            const results = await Promise.all([
                sendNotification.execute(makeNotification()),
                sendNotification.execute(makeNotification()),
                sendNotification.execute(makeNotification()),
                sendNotification.execute(makeNotification()),
            ]);
            return results.map((notification) => notification.notification.id);
        })();
        const readNotification = new ReadNotification(repository);
        await readNotification.execute(notifications, new Date());

        repository.notifications.forEach((n) =>
            expect(n.readAt).toEqual(expect.any(Date)),
        );

        expect.assertions(repository.notifications.length);
    });
});
