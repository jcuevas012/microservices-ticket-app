import {Stan} from 'node-nats-streaming';
import {Event} from '../types';

export abstract class Publisher<T extends Event> {
  abstract subject: T['subject'];
  private client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: T['data']): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), error => {
        if (error) {
          return reject();
        }
        console.log('Event publish to subject :::', this.subject);
        return resolve('');
      });
    });
  }
}
