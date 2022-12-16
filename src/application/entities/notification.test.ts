import { randomUUID } from 'crypto';
import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
    it('should create a notification', () => {
        const content = new Content('test content');
        const notification = new Notification({
            recipientId: randomUUID(),
            category: 'news',
            content,
            createdAt: new Date(),
        });
        expect(notification).toBeTruthy();
    });

    it('should not create a notification when any ID is not UUID', () => {
        const content = new Content('test content');
        const notificationWrongRecipientId = () => {
            return new Notification({
                recipientId: '129481',
                category: 'news',
                content,
                createdAt: new Date(),
            });
        };
        expect(notificationWrongRecipientId).toThrow();
    });
    it('should create with createdAt date even if it is not provided to Notification constructor', () => {
        const content = new Content('test content');
        const notification = new Notification({
            recipientId: randomUUID(),
            category: 'news',
            content,
        });
        expect(notification).toBeTruthy();
        expect(notification.createdAt).toBeInstanceOf(Date);
    });
});
