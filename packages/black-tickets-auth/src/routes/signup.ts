import { Request, Response, Router } from 'express'

import { BadRequestError, requestValidator, generateToken } from '@black-tickets/utils'
import User from '../models/user'
import validation from '../validators/signup-validator'

const router = Router()

router.post('/signup', [...validation], requestValidator, async (req: Request, res: Response) => {
    const { email, password } = req.body

    const userFound = await User.findOne({ email })

    if (userFound) {
        throw new BadRequestError('Email already exist')
    }

    const user = User.build({
        email,
        password,
    })

    await user.save()

    // generate jwt

    const jwt = generateToken({
        id: user.id,
        email: user.email,
    })

    // set jwt to session

    req.session.jwt = jwt

    res.status(201).send(user)
})

export { router as signUpRouter }
