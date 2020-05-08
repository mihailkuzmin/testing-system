export { Controller } from './controller'

export type Response<T> = {
  payload: T
  message: string
}
