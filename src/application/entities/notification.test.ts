import { randomUUID } from 'crypto';
import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should create a notification', () => {
    const content = new Content('test content');
    const notification = new Notification({
      id: randomUUID(),
      recipientId: randomUUID(),
      category: 'news',
      content,
      createdAt: new Date(),
    });
    expect(notification).toBeTruthy();
  });
});
it('should not create a notification when any ID is not UUID', () => {
  const content = new Content('test content');
  const notification = () => {
    return new Notification({
      id: '129481',
      recipientId: randomUUID(),
      category: 'news',
      content,
      createdAt: new Date(),
    });
  };
  expect(notification).toThrow();
});
