import { Response } from '@common/typings'
import { Task, CreateTask, UpdateTask, TaskId, Test, Topic } from '@common/typings/task'
import { request } from '../request'

const getAll = async (): Promise<Response<Task[]>> => {
  const result = await request.get<Task[]>('task')
  return result
}

const getAllWithoutDescriptionAndTests = async (): Promise<Response<Task[]>> => {
  const result = await request.get<Task[]>('task?exclude[]=description&exclude[]=tests')
  return result
}

const getById = async (id: TaskId): Promise<Response<Task>> => {
  const result = await request.get<Task>(`task/${id}`)
  return result
}

const getByIdWithoutTests = async (id: TaskId): Promise<Response<Task>> => {
  const result = await request.get<Task>(`task/${id}?exclude[]=tests`)
  return result
}

const getTestsById = async (id: TaskId): Promise<Response<Test[]>> => {
  const result = await request.get<Test[]>(`task/${id}/test`)
  return result
}

const getTopics = async (): Promise<Response<Topic[]>> => {
  const result = await request.get<Topic[]>(`task/topic`)
  return result
}

const create = async (task: CreateTask): Promise<Response<void>> => {
  const result = await request.post<CreateTask, void>('task', task)
  return result
}

const update = async (task: UpdateTask): Promise<Response<void>> => {
  const result = await request.put<UpdateTask, void>('task', task)
  return result
}

const deleteById = async (id: TaskId): Promise<Response<void>> => {
  const result = await request.delete<TaskId, void>(`task/${id}`)
  return result
}

export const tasksApi = {
  getAll,
  getAllWithoutDescriptionAndTests,
  create,
  deleteById,
  getById,
  getByIdWithoutTests,
  getTestsById,
  getTopics,
  update,
}
