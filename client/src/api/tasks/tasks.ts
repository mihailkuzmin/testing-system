import { request } from '../request'
import { Response } from '../../typings'
import { Task, CreateTask, UpdateTask, TaskId } from './typings'

const getAll = async (): Promise<Response<Task[]>> => {
  const result = await request.get<Task[]>('task')
  return result
}

const getById = async (id: TaskId): Promise<Response<Task>> => {
  const result = await request.get<Task>(`task/${id}`)
  return result
}

const create = async (task: CreateTask): Promise<Response<Task>> => {
  const result = await request.post<CreateTask, Task>('task', task)
  return result
}

const update = async (task: UpdateTask): Promise<Response<Task>> => {
  const result = await request.put<UpdateTask, Task>('task', task)
  return result
}

const deleteById = async (id: TaskId): Promise<Response<Task>> => {
  const result = await request.delete<void, Task>(`task/${id}`)
  return result
}

export const tasksApi = {
  getAll,
  create,
  deleteById,
  getById,
  update,
}