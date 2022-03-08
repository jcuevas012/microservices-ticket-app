import {Request, Response} from 'express';

import {CustomError} from '../errors/custom-error';

export const errorHandler = (err: Error, _req: Request, res: Response) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({errors: err.serializeErrors()});
  }

  return res.status(400).send({
    errors: ['Something went wrong'],
  });
};
