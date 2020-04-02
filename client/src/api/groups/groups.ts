import { request } from '../request'
import { Response } from '../../typings'
import { Group } from './typings'

const getAll = async (): Promise<Response<Group[]>> => {
  const result = await request.get<Group[]>('group')
  return result
}

export const groupsApi = {
  getAll,
}
