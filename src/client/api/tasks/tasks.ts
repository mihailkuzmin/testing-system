import { Response } from '@common/typings'
import {
  Task,
  CreateTask,
  UpdateTask,
  TaskId,
  Test,
  Topic,
  PLang,
  SubmitTask,
  ExecResult,
} from '@common/typings/task'
import { request } from '../request'

const run = async (task: SubmitTask): Promise<Response<ExecResult[]>> => {
  const result = await request.post<SubmitTask, ExecResult[]>('task/run', task)
  return result
}

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
  const result = await request.get<Test[]>(`task/${id}/tests`)
  return result
}

const getTopics = async (): Promise<Response<Topic[]>> => {
  const result = await request.get<Topic[]>(`task/topics`)
  return result
}

const getPLangs = async (): Promise<Response<PLang[]>> => {
  const result = await request.get<PLang[]>(`task/plangs`)
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
  run,
  getAll,
  getAllWithoutDescriptionAndTests,
  create,
  deleteById,
  getById,
  getByIdWithoutTests,
  getTestsById,
  getTopics,
  getPLangs,
  update,
}
