import { Request, Response } from '../typings'
import ky from 'ky'

const timeout = (time: number): Promise<void> =>
  new Promise((r) => setTimeout(r, time))

const HOST = 'http://localhost:5000/api/'
const TIMEOUT = 500

const api = ky.extend({
  hooks: {
    beforeRequest: [async (req) => await timeout(TIMEOUT)],
  },
  prefixUrl: HOST,
  retry: 0
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
}
