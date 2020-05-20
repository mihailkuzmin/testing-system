import { Response } from '@common/typings'
import { Credentials, UserInfo } from '@common/typings/auth'
import { request } from '../request'

const login = async (credentials: Credentials): Promise<Response<UserInfo>> => {
  const result = await request.post<Credentials, UserInfo>('auth/login', credentials)
  return result
}

const check = async (): Promise<Response<UserInfo>> => {
  const result = await request.get<UserInfo>(`auth/check`)
  return result
}

const logout = async (): Promise<Response<void>> => {
  const result = await request.get<void>(`auth/logout`)
  return result
}

export const authApi = {
  login,
  logout,
  check,
}
