import {Message, Stan} from 'node-nats-streaming';
import {Event} from '../types';

export abstract class Listener<T extends Event> {
  protected client: Stan;
  abstract subject: T['subject'];
  abstract groupQueueName: string;
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.groupQueueName);
  }

  abstract onMessage(data: T['data'], msg: Message): void;

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.groupQueueName,
      this.subscriptionOptions()
    );

    subscription.on('message', (msg: Message) => {
      console.log(`Message received ${this.subject} :: ${this.groupQueueName}`);
      const parseData = this.parseMessage(msg);

      this.onMessage(parseData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf8'));
  }
}
