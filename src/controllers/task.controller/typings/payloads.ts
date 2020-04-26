import { ITask, Test } from '../../../typings/task'

export interface Create extends ITask {}
export interface GetAll extends Array<ITask> {}
export interface GetById extends ITask {}
export type GetTestsById = Test[]
export interface Update extends ITask {}
export interface RemoveById extends ITask {}
