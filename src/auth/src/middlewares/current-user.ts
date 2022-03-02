import { NextFunction, Request, Response } from 'express'
import BadRequestError from '../errors/bad-request-error'

import utils from '../utils'

interface UserPayload {
    id: string
    email: string
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}

export default function (req: Request, res: Response, next: NextFunction) {
    const jwt = req.session?.jwt

    if (!jwt) {
        next()
    }

    try {
        const payload = utils.jwt.verify(jwt) as UserPayload
        req.currentUser = payload
    } catch (error) {
        throw new BadRequestError('Error setting current user')
    }

    next()
}
