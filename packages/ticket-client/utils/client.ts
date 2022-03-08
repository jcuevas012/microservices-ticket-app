import axios, { AxiosRequestHeaders } from 'axios'
import { NextPageContext } from 'next'

const buildClient = (context: NextPageContext) => {
    try {
        if (typeof window === 'undefined') {
            return axios.create({
                baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
                headers: { ...context.req?.headers } as AxiosRequestHeaders,
            })
        }

        return axios.create({
            baseURL: '/',
            headers: { ...context.req?.headers } as AxiosRequestHeaders,
        })
    } catch (error) {
        throw Error('Error building axios client')
    }
}

export default buildClient
