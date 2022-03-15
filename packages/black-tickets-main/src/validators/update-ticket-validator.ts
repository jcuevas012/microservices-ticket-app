import { body } from 'express-validator'

export default [
    body('title').optional().isString().notEmpty().withMessage('Ticket title is not valid'),
    body('price').optional().isFloat({ gt: 0 }).withMessage('Ticket price is not valid'),
]
