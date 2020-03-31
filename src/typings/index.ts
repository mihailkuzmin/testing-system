export { IController } from './controller'

export interface Response<T> {
  payload: T
  message: string
}
