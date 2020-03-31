import { request } from '../request'
import { Response } from '../../typings'
import { User, CreateUser } from './typings'

const getAll = async (): Promise<Response<User[]>> => {
  const result = await request.get<User[]>('student')
  return result
}

const create = async (user: CreateUser): Promise<Response<User>> => {
  const result = await request.post<CreateUser, User>('student', user)
  return result
}

export const usersApi = {
  create,
  getAll,
}
