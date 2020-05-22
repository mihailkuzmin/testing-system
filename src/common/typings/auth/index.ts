import { User } from '../user'

export type UserId = number

export type Credentials = { login: string; password: string }

export type UserInfo = User

export type AuthInfo = {
  user?: UserInfo
  error?: boolean
  message?: string
}
