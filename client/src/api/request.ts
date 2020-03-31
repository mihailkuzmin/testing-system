import { Request, Response } from '../typings'
import ky from 'ky'

export const request: Request = {
  get: async <R>(url: string) => {
    try {
      const res: Response<R> = await ky.get(url).json()
      return res
    } catch (e) {
      throw e
    }
  },

  post: async <P, R>(url: string, payload: P) => {
    try {
      const res: Response<R> = await ky.post(url, { json: payload }).json()
      return res
    } catch (e) {
      throw e
    }
  },
}
