import { TaskQueryResult } from '../../../typings/task'

export interface Create extends TaskQueryResult {}
export interface GetAll extends Array<TaskQueryResult> {}
export interface GetById extends TaskQueryResult {}
