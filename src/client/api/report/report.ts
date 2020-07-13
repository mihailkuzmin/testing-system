import { Response } from '@common/typings'
import { Work, WorkId } from '@common/typings/work'
import { User } from '@common/typings/user'
import { request } from '../request'

const getWorks = async (): Promise<Response<Work[]>> => {
  const result = await request.get<Work[]>('report/work')
  return result
}

const getUsers = async (id: WorkId): Promise<Response<User[]>> => {
  const result = await request.get<User[]>(`report/work/${id}/users`)
  return result
}

export const reportApi = {
  getWorks,
  getUsers,
}
