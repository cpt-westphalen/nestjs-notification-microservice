import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';
import { ReadNotification } from './read-notification';
import { UnreadNotification } from './unread-notification';
import { makeNotification } from '@test/factories/make-notification';

const repository = new InMemoryNotificationsRepository();
const sendNotification = new SendNotification(repository);
const readNotification = new ReadNotification(repository);
const unreadNotification = new UnreadNotification(repository);

describe('Unread Notification Use-Case', () => {
    afterEach(() => {
        repository.notifications = [];
    });

    it('should update a notification in repository with the "readAt" date when UUID string is provided', async () => {
        const {
            notification: { id: notification_id },
        } = await sendNotification.execute(makeNotification());
        await readNotification.execute(notification_id, new Date());
        await unreadNotification.execute(notification_id);
        expect.assertions(1);
        expect(await repository.findById(notification_id)).toHaveProperty(
            'readAt',
            null,
        );
    });

    it('should update many notifications in repository with the "readAt" as "null" when UUID string array is provided', async () => {
        const notifications = await (async () => {
            const results = await Promise.all([
                sendNotification.execute(makeNotification()),
                sendNotification.execute(makeNotification()),
                sendNotification.execute(makeNotification()),
                sendNotification.execute(makeNotification()),
            ]);
            return results.map((notification) => notification.notification.id);
        })();
        await readNotification.execute(notifications, new Date());
        await unreadNotification.execute([notifications[1], notifications[2]]);

        expect(repository.notifications[0].readAt).toEqual(expect.any(Date));
        expect(repository.notifications[1].readAt).toBeNull;
        expect(repository.notifications[2].readAt).toBeNull;
        expect(repository.notifications[3].readAt).toEqual(expect.any(Date));
    });
});
