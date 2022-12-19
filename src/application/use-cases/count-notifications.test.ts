import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';
import { CountNotifications } from './count-notifications';
import { makeNotification } from '@test/factories/make-notification';
import { randomUUID } from 'crypto';

const repository = new InMemoryNotificationsRepository();
const sendNotification = new SendNotification(repository);
const idOne = randomUUID();
const idTwo = randomUUID();

describe('CountNotification Use-Case', () => {
    beforeAll(async () => {
        await await sendNotification.execute(
            makeNotification({ recipientId: idOne }),
        );
        await sendNotification.execute(
            makeNotification({ recipientId: idTwo }),
        );
        await sendNotification.execute(
            makeNotification({ recipientId: idOne }),
        );
        await sendNotification.execute(
            makeNotification({ recipientId: idOne }),
        );
    });

    afterAll(() => {
        repository.notifications = [];
    });

    it('should count the notifications for a provided recipient id', async () => {
        const countNotification = new CountNotifications(repository);
        const countOne = await countNotification.execute(idOne);
        const countTwo = await countNotification.execute(idTwo);
        expect.assertions(2);
        expect(countOne).toBe(3);
        expect(countTwo).toBe(1);
    });
});
