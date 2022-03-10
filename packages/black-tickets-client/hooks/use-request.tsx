import axios from 'axios'
import { ReactElement, useState } from 'react'

interface UseRequestProps {
    url: string
    method: 'post' | 'put' | 'delete'
    body: any
    onSuccess: Function
}

const useRequest = (options: UseRequestProps) => {
    const [errors, setErrors] = useState<ReactElement | null>()

    const request = async (): Promise<any> => {
        try {
            setErrors(null)
            const response = await axios[options.method](options.url, options.body)

            if (options.onSuccess) {
                options.onSuccess()
            }

            return response.data
        } catch (error: any) {
            const errors = error.response?.data?.errors
            setErrors(errors && errors.map((err: any, i: number) => <div key={i}>{err.message}</div>))
        }
    }

    return [request, errors]
}

export default useRequest
