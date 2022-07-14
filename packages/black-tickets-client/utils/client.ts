import axios, { AxiosRequestHeaders } from 'axios'

const buildClient = ({ req }: any) => {
      // We must be on the browser
      return axios.create({
        headers: { ...req?.headers } as AxiosRequestHeaders,
    })
  };


  

export default buildClient
