import { ITask } from '../../../typings/task'

export interface Create extends ITask {}
export interface GetAll extends Array<ITask> {}
export interface GetById extends ITask {}
