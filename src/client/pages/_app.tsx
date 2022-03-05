import '../styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import Header from '../component/header/header'
import buildClient from '../utils/client'

function AppComponent({ Component, pageProps, currentUser }: AppProps | any) {
    return (
        <SWRConfig
            value={{
                refreshInterval: 3000,
            }}
        >
            <Header currentUser={currentUser} />
            <Component {...pageProps} />
        </SWRConfig>
    )
}

AppComponent.getInitialProps = async (appContext: AppContext) => {
    const client = buildClient(appContext.ctx)
    let data

    try {
        const response = await client.get('/api/users/current-user')
        data = response.data
    } catch {}

    let pageProps = {}

    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx)
    }

    return {
        ...data,
        pageProps,
    }
}

export default AppComponent
