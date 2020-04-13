import { IStudent } from '../../../typings/student'

export interface Create extends IStudent {}
export interface GetAll extends Array<IStudent> {}
export interface GetById extends IStudent {}
export interface RemoveById extends IStudent {}
export interface Update extends IStudent {}
