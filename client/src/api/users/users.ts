import { request } from '../request'
import { Response } from '../../typings'
import { CreateUser } from './typings'
import { UsersTableRow } from '../../typings'

const getAll = async (): Promise<Response<UsersTableRow[]>> => {
  const result = await request.get<UsersTableRow[]>('student')
  return result
}

const create = async (user: CreateUser): Promise<Response<UsersTableRow>> => {
  const result = await request.post<CreateUser, UsersTableRow>('student', user)
  return result
}

export const usersApi = {
  create,
  getAll,
}
