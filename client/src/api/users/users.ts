import { request } from '../request'
import { Response } from '../../typings'
import { CreateUser, UpdateUser, User, UserId } from './typings'

const getAll = async (): Promise<Response<User[]>> => {
  const result = await request.get<User[]>('student')
  return result
}

const create = async (user: CreateUser): Promise<Response<User>> => {
  const result = await request.post<CreateUser, User>('student', user)
  return result
}

const deleteById = async (id: UserId): Promise<Response<User>> => {
  const result = await request.delete<void, User>(`student/${id}`)
  return result
}

const update = async (user: UpdateUser): Promise<Response<User>> => {
  const result = await request.put<UpdateUser, User>('student', user)
  return result
}

export const usersApi = {
  create,
  getAll,
  deleteById,
  update
}
