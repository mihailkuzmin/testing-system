import { Response } from '@common/typings'
import { WorkId, Work, CreateWork, UpdateWork } from '@common/typings/work'
import { Task, TaskId } from '@common/typings/task'
import { request } from '../request'

const getAll = async (): Promise<Response<Work[]>> => {
  const result = await request.get<Work[]>('work')
  return result
}

const getTasksOfWork = async (id: WorkId): Promise<Response<Task[]>> => {
  const result = await request.get<Task[]>(`work/${id}/tasks`)
  return result
}

const getWorksWithTask = async (id: TaskId): Promise<Response<Work[]>> => {
  const result = await request.get<Work[]>(`work/filterByTask/${id}`)
  return result
}

const getTasksOfWorkWithoutDescription = async (id: WorkId): Promise<Response<Task[]>> => {
  const result = await request.get<Task[]>(`work/${id}/tasks?exclude[]=description`)
  return result
}

const getTasksOfWorkWithoutDescriptionAndTests = async (id: WorkId): Promise<Response<Task[]>> => {
  const result = await request.get<Task[]>(`work/${id}/tasks?exclude[]=description&exclude[]=tests`)
  return result
}

const getById = async (id: WorkId): Promise<Response<Work>> => {
  const result = await request.get<Work>(`work/${id}`)
  return result
}

const deleteById = async (id: WorkId): Promise<Response<Work>> => {
  const result = await request.delete<void, Work>(`work/${id}`)
  return result
}

const create = async (work: CreateWork): Promise<Response<void>> => {
  const result = await request.post<CreateWork, void>('work', work)
  return result
}

const update = async (work: UpdateWork): Promise<Response<void>> => {
  const result = await request.put<UpdateWork, void>('work', work)
  return result
}

export const worksApi = {
  getAll,
  getById,
  getTasksOfWork,
  getWorksWithTask,
  getTasksOfWorkWithoutDescription,
  getTasksOfWorkWithoutDescriptionAndTests,
  deleteById,
  create,
  update,
}
