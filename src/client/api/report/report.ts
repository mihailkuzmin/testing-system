import { Response } from '@common/typings'
import { Work, WorkId } from '@common/typings/work'
import { User, UserId } from '@common/typings/user'
import { Group, GroupId } from '@common/typings/group'
import { request } from '../request'

const getWorks = async (): Promise<Response<Work[]>> => {
  const result = await request.get<Work[]>('report/work')
  return result
}

const getGroups = async (id: WorkId): Promise<Response<Group[]>> => {
  const result = await request.get<Group[]>(`report/work/${id}/group`)
  return result
}

type getUsersArgs = { workId: WorkId; groupId: GroupId }

const getUsers = async ({ workId, groupId }: getUsersArgs): Promise<Response<User[]>> => {
  const result = await request.get<User[]>(`report/work/${workId}/group/${groupId}/user`)
  return result
}

type getUserReportArgs = { workId: WorkId; groupId: GroupId; userId: UserId }

const getUserReport = async (args: getUserReportArgs): Promise<Response<any>> => {
  const result = await request.get<any>(
    `report/work/${args.workId}/group/${args.groupId}/user/${args.userId}`,
  )
  return result
}

export const reportApi = {
  getWorks,
  getGroups,
  getUsers,
  getUserReport,
}
