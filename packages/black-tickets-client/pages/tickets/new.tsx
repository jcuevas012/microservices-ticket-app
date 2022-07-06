import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useRequest from '../../hooks/use-request'

const NewTicketPage: NextPage = () => {

    const router = useRouter()
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')

    
        const [ request , errors ] = useRequest({
        url: '/api/tickets',
        method: 'post',
        body: {title, price},
        onSuccess: () => router.push('/tickets/')
    })
    

    

    const onBlur = () => {
        const value = parseFloat(price)

        if (isNaN(value)) {
            return;
        }

        setPrice(value.toFixed(2))

    }

    const onSubmit = async (e) => {
        e.preventDefault()

        const response = await request()
    }

     return (
        <div>
            <Head>
                <title>Create New Ticket</title>
            </Head>

            <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
                <div className='max-w-md w-full space-y-8'>
                    <div>
                        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                            Create new ticket
                        </h2>
                    </div>
                    <form className='mt-8 space-y-6' onSubmit={onSubmit}>
                        <input type='hidden' name='remember' value='true' />
                        <div className='rounded-md shadow-sm -space-y-px'>
                            <div>
                                <label className='sr-only'>
                                    Name
                                </label>
                                <input
                                    name='title'
                                    required
                                    value={title}
                                    onChange={({ target: { value } }) => setTitle(value)}
                                    className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                    placeholder='Name'
                                />
                            </div>
                            <div>
                                <label className='sr-only'>
                                    Price
                                </label>
                                <input
                                    name='price'
                                    value={price}
                                    onBlur={onBlur}
                                    onChange={({ target: { value } }) => setPrice(value)}
                                    autoComplete='current-password'
                                    required
                                    className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                    placeholder='Price'
                                />
                            </div>
                        </div>

                        <div className='text-sm text-red-800'>{errors}</div>

                        <div>
                            <button
                                type='submit'
                                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewTicketPage
