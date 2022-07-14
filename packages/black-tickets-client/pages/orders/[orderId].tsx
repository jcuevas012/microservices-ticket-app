import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import StripeCheckout from 'react-stripe-checkout';

import useRequest from '../../hooks/use-request'

const OrderView = ({ order, currentUser }: any) => {
    const [expirationTime, setExpirationTime] = useState<number>()
    const router  = useRouter()
    
    const [ request, errors ] = useRequest({
        url: '/api/payments',
        method: 'post',
        body: {
            orderId: order.id, 
        }, 
        onSuccess: () => router.push('/orders')
    })

    useEffect(() => {
        const calExpirationTime = () => {
            // @ts-ignore
            const timeLeft: number = Math.round(new Date(`${order.expiredAt}`) - new Date() / 1000);
            setExpirationTime(timeLeft)
        }

        calExpirationTime()

        const timerId: any = setInterval(calExpirationTime, 1000)

        return () => {
            clearInterval(timerId)
        }
    }, [order])

    const onToken = async (token: any) => {
        // @ts-ignore
        await request({ token: token.id })
    }

    // @ts-ignore
    if (expirationTime < 0) {
        return (
                <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">  Order {order.ticket.title} expired</h5>
                </div>
            )
    }

    return (<>
                <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">  Purchasing {order.ticket.title}</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> Order will expire in {expirationTime} seconds </p>
                    <StripeCheckout
                        token={onToken}
                        stripeKey="pk_test_ra6XBS5SsI8k0QmN4sjtngUs"
                        amount={order.ticket.price * 100}
                        email={currentUser.email}
                    />
                </div>

                <div className='text-sm text-red-800'>{errors}</div>
              
        </>
    )

}

// @ts-ignore
OrderView.getInitialProps = async (context: any, client, currentUser) => {

    const { orderId } = context.query;

    const { data } = await client.get(`/api/orders/${orderId}`)

    return  { order: data, currentUser }
}

export default OrderView
