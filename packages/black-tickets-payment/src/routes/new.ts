import { NotAuthorizedError, NotFoundError, requestValidator, requireAuth, OrderStatus, BadRequestError } from '@black-tickets/utils'
import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher'
import { Order } from '../models/order'
import { Payment } from '../models/payment'
import natsWrapper from '../nats-wrapper'
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


    const charge = await stripe.charges.create({
        amount: order.price * 100,
        currency: 'usd',
        source: token,
        description: 'Ticket app buy'
    })

    const payment = Payment.build({
        orderId,
        stripeId: charge.id
    })

    await payment.save()

    new PaymentCreatedPublisher(natsWrapper.client).publish({
        id: payment.id,
        orderId: payment.orderId,
        stripeId: payment.stripeId
    })

    res.status(200).send({  id: payment.id })
})

export { router as newPayment }
