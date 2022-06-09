import { NotAuthorizedError, NotFoundError, requestValidator, requireAuth, OrderStatus, BadRequestError } from '@black-tickets/utils'
import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { Order } from '../models/order'
import { stripe } from '../stripe'

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

    const { token , orderId } = req.body

    const order = await Order.findById(orderId)

    if (!order) {
        throw new NotFoundError('Not order found')
    }
    
    if (order.userId !== req.currentUser?.id) {
        throw new NotAuthorizedError()
    }

    if (order.status === OrderStatus.Cancelled) {
        throw new BadRequestError('Can not process payment for cancelled order')
    }


    await stripe.charges.create({
        amount: order.price * 100,
        currency: 'usd',
        source: token,
        description: 'Ticket app buy'
    })

    res.status(200).send({ success: true })
})

export { router as newPayment }
