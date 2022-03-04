import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import buildClient from '../utils/client'

const LandingPage: NextPage<{ currentUser: any }> = ({ currentUser }) => {
    console.log(currentUser)
    return (
        <div className='min-h-full'>
            <Head>
                <title>Ticket App</title>
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            </Head>
            <main>
                <div className='bg-gray-50 h-screen'>
                    <div className='max-w-7xl mx-auto h-screen py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between'>
                        <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
                            {currentUser && <span className='block'>Welcome {currentUser.email}</span>}
                            <span className='block'>Planing to go to the event?</span>
                            <span className='block text-indigo-600'>Let's dive in.</span>
                        </h2>
                        <div className='mt-8 flex lg:mt-0 lg:flex-shrink-0'>
                            <div className='inline-flex rounded-md shadow'>
                                <a
                                    href='#'
                                    className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700'
                                >
                                    {' '}
                                    Buy Tickets{' '}
                                </a>
                            </div>
                            <div className='ml-3 inline-flex rounded-md shadow'>
                                <a
                                    href='#'
                                    className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50'
                                >
                                    {' '}
                                    Sell Tickets{' '}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

LandingPage.getInitialProps = async (context: NextPageContext) => {
    const client = buildClient(context)
    const { data } = await client.get('/api/users/current-user')

    return { ...data }
}

export default LandingPage
