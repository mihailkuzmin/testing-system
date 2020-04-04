import { request } from '../request'
import { Response } from '../../typings'
import { CreateUser, UserId } from './typings'
import { UsersTableRow } from '../../typings'

const getAll = async (): Promise<Response<UsersTableRow[]>> => {
  const result = await request.get<UsersTableRow[]>('student')
  return result
}

const create = async (user: CreateUser): Promise<Response<UsersTableRow>> => {
  const result = await request.post<CreateUser, UsersTableRow>('student', user)
  return result
}

const deleteById = async (id: UserId): Promise<Response<UsersTableRow>> => {
  const result = await request.delete<void, UsersTableRow>(`student/${id}`)
  return result
}

export const usersApi = {
  create,
  getAll,
  deleteById,
}
