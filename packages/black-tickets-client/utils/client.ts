import axios, { AxiosRequestHeaders } from 'axios'

const buildClient = (context: NextPageContext) => {
  try {
      if (typeof window === 'undefined') {
          return axios.create({
              baseURL: 'http://www.black-ticket-rd.shop',
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
