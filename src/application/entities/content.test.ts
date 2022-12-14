import { Content } from './content';

describe('Notification Content', () => {
  it('should create a truthy notification content with value', () => {
    const content = new Content('Você recebeu uma solicitação de amizade');

    expect(content).toBeTruthy();
    expect(content.value).toBe('Você recebeu uma solicitação de amizade');
  });

  it("shouldn't be created with less then 5 char", () => {
    const content = '1234';
    expect(() => new Content(content)).toThrow();
  });

  it("shouldn't be created with more then 140 char", () => {
    const content = '1'.repeat(141);
    expect(() => new Content(content)).toThrow();
  });
});
