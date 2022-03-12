import { body } from 'express-validator'

export default [
    body('title').isString().notEmpty().withMessage('Ticket title is not valid'),
    body('price').isInt().withMessage('Ticket price is not valid'),
]
