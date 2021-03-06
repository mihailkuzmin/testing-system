import ky from 'ky'
import { Request, Response } from '@common/typings'
import { timeout } from '@common/helpers'

const TIMEOUT = 500

const api = ky.extend({
  hooks: {
    beforeRequest: [() => timeout(TIMEOUT)],
  },
  prefixUrl: '/api/',
  retry: 0,
})

export const request: Request = {
  get: async <R>(url: string) => {
    const res: Response<R> = await api.get(url).json()
    return res
  },

  post: async <P, R>(url: string, payload: P) => {
    const res: Response<R> = await api.post(url, { json: payload }).json()
    return res
  },

  put: async <P, R>(url: string, payload: P) => {
    const res: Response<R> = await api.put(url, { json: payload }).json()
    return res
  },

  delete: async <P, R>(url: string, payload: P) => {
    const res: Response<R> = await api.delete(url, { json: payload }).json()
    return res
  },
}
