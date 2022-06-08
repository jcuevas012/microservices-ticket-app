import { requestValidator, requireAuth } from '@black-tickets/utils'
import express, { Request, Response } from 'express'
import { body } from 'express-validator'

const router = express.Router()

router.post('/', [
    body('token')
    .not()
    .isEmpty()
    .withMessage('Should provide a valid payment token'),
    body('orderId')
    .not()
    .isEmpty()
    .withMessage('Should provide a valid orderId')

], requestValidator,  requireAuth, async (req: Request, res: Response) => {
    


    res.status(200).send({ success: true })
})

export { router as newPayment }
