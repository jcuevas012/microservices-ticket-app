import type { NextPage } from 'next'
import Link from 'next/link'

const TicketList: NextPage = ({ data = [] }) => {
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
                            Info
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((ticket:any) => (
                        <tr key={ticket.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    {ticket.title}
                                </th>
                                <td className="px-6 py-4">
                                    {`${ticket.price}`}
                                </td>
                                <td className="px-6 py-4">
                                    <Link href={`/tickets/${ticket.id}`}>
                                        <a>View</a>
                                    </Link>
                                </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>)
    
}


TicketList.getInitialProps = async (_appContext, client) =>  {

    const response = await client.get('/api/tickets')

    return { data: response.data}

}

export default TicketList
