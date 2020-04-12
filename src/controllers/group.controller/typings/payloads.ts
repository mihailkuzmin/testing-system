import { GroupQueryResult } from '../../../typings/group'

export interface GetAll extends Array<GroupQueryResult> {}
export interface GetById extends GroupQueryResult {}
export interface Create extends GroupQueryResult {}
