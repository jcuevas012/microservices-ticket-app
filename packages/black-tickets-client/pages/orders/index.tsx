import Link from 'next/link'

const OrderList = ({ data = [] }) => {

    return  (

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Info
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((order:any) => (
                        <tr key={order.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    {order?.ticket?.title}
                                </th>
                                <td className="px-6 py-4">
                                    {order?.ticket?.price}
                                </td>
                                <td className="px-6 py-4">
                                    {`${order.status}`}
                                </td>
                                <td className="px-6 py-4">
                                    <Link href={`/orders/${order.id}`} >
                                        <a>View</a>
                                    </Link>
                                </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>)
    
}


OrderList.getInitialProps = async (_appContext:any, client: any) =>  {

    const response = await client.get('/api/orders')

    return { data: response.data}

}

export default OrderList
