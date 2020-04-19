import React from 'react'
// import {RouteComponentProps} from 'react-router-dom'
import { OptionsObject } from 'notistack'

export interface PageProps {
  children?: React.ReactNode
}

/*
  Async operation status
  Done - operation successfull
  Fail - operation fails with error
  Pending - wait for server response
  Idle - standby - waiting for user action
*/
export enum Status {
  Done,
  Fail,
  Pending,
  Idle,
}

export interface Request {
  get: <R>(url: string) => Promise<Response<R>>
  post: <P, R>(url: string, payload?: P) => Promise<Response<R>>
  put: <P, R>(url: string, payload?: P) => Promise<Response<R>>
  delete: <P, R>(url: string, payload?: P) => Promise<Response<R>>
}

export interface Response<T> {
  payload: T
  message: string
}

export enum MessageType {
  Default = 'default',
  Error = 'error',
  Success = 'success',
  Warning = 'warning',
  Info = 'info',
}

export interface NewMessage {
  type: MessageType
  text: string
}

export interface Message extends OptionsObject {
  key: string
  options: any
  message: string
  displayed: boolean
}

export type UsersTableRowId = number

export interface UsersTableRow {
  id: UsersTableRowId
  lastName: string
  firstName: string
  patronymic: string
  group: UsersTableGroup
  bookNumber: string
  login: string
}

export interface UsersTableGroup {
  id: number | string
  name: string
}
