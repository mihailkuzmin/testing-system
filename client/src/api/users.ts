import { request } from './request'
import { Response } from '../typings'

export interface User {
  id: number
  name: string
  group: number | string
  login: string
}

export interface CreateUser {
  name: string
  group: number | string
  login: string
  password: string
}

const timeout = (time: number) => new Promise((r) => setTimeout(r, time))

const api = 'http://localhost:5000/api'

const getAll = async (): Promise<Response<User[]>> => {
  try {
    await timeout(1000)
    const result = await request.get<User[]>(`${api}/student`)
    return result
  } catch (e) {
    throw e
  }
}

const create = async (user: CreateUser): Promise<Response<User>> => {
  try {
    await timeout(1000)
    const result = await request.post<CreateUser, User>(`${api}/student`, user)
    return result
  } catch (e) {
    throw e
  }
}

export const usersApi = {
  create,
  getAll,
}
