import { isUUID } from 'class-validator';
import { Replace } from 'src/helpers/Replace';
import { Content } from './content';

interface NotificationProps {
  id: string;
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private props: NotificationProps;

  constructor(props: Replace<NotificationProps, { createdAt?: Date }>) {
    if (!isUUID(props.id) || !isUUID(props.recipientId))
      throw new Error('IDs should be UUID.');

    this.props = { ...props, createdAt: props.createdAt ?? new Date() };
  }

  public set content(content: string) {
    this.props.content = new Content(content);
  }

  public get content() {
    return this.props.content.value;
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  public get recipientId() {
    return this.props.recipientId;
  }
  public set category(category: string) {
    this.props.category = category;
  }

  public get category() {
    return this.props.category;
  }
  public set readAt(readAt: Date | null | undefined) {
    this.props.readAt = readAt;
  }

  public get readAt() {
    return this.props.readAt;
  }

  public get createdAt() {
    return this.props.createdAt;
  }
}
