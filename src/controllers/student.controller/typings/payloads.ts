import { StudentQueryResult } from '../../../typings/student'

export interface Create extends StudentQueryResult {}
export interface GetAll extends Array<StudentQueryResult> {}
export interface GetById extends StudentQueryResult {}
export interface RemoveById extends StudentQueryResult {}
export interface Update extends StudentQueryResult {}
