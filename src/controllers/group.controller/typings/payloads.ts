import { IGroup } from '../../../typings/group'

export interface GetAll extends Array<IGroup> {}
export interface GetById extends IGroup {}
export interface Create extends IGroup {}
export interface RemoveById extends IGroup {}
export interface Update extends IGroup {}
