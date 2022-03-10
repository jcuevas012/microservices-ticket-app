import {CustomError} from './custom-error';

export class NotAuthorized extends CustomError {
  statusCode: number = 401;

  constructor() {
    super('Not Authorized');

    Object.setPrototypeOf(this, NotAuthorized.prototype);
  }
  serializeErrors() {
    return [
      {
        message: 'Not Authorized',
      },
    ];
  }
}
