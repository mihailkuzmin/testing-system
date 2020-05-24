import { Response } from '@common/typings'
import { CreateUser, UpdateUser, User, UserId } from '@common/typings/user'
import { request } from '../request'

const getAll = async (): Promise<Response<User[]>> => {
  const result = await request.get<User[]>('user')
  return result
}

const getById = async (id: UserId): Promise<Response<User>> => {
  const result = await request.get<User>(`user/${id}`)
  return result
}

const create = async (user: CreateUser): Promise<Response<void>> => {
  const result = await request.post<CreateUser, void>('user', user)
  return result
}

const deleteById = async (id: UserId): Promise<Response<void>> => {
  const result = await request.delete<UserId, void>(`user/${id}`)
  return result
}

const update = async (user: UpdateUser): Promise<Response<void>> => {
  const result = await request.put<UpdateUser, void>('user', user)
  return result
}

export const usersApi = {
  create,
  getAll,
  getById,
  deleteById,
  update,
}
