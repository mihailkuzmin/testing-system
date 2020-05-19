import { Student } from '../student'

export type UserId = number

export type Credentials = { login: string; password: string }

export type UserInfo = Student

export type AuthInfo = {
  user?: UserInfo
  error?: boolean
  message?: string
}
