import { Request, Response, Router } from 'express'

import { BadRequestError, requestValidator, generateToken } from '@black-tickets/utils'
import User from '../models/user'
import utils from '../utils'
import validator from '../validators/signin-validator'

const router = Router()

router.post('/signin', [...validator], requestValidator, async (req: Request, res: Response) => {
    const { email, password } = req.body

    const userFound = await User.findOne({ email })

    if (!userFound) {
        throw new BadRequestError('Invalid credential')
    }

    const validPassword = utils.password.compare(userFound.password, password)

    if (!validPassword) {
        throw new BadRequestError('Invalid credentials')
    }

    // generate jwt

    const jwt = generateToken({
        id: userFound.id,
        email: userFound.email,
    })

    // set jwt to session

    req.session.jwt = jwt

    res.status(200).send(userFound)
})

export { router as signInRouter }
