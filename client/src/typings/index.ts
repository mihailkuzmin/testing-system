import React from 'react'
import { WindowLocation, NavigateFn } from 'reach__router'
import { OptionsObject } from 'notistack'

// Used for @reach-router
export interface IPageProps {
  path?: string | undefined
  default?: boolean | undefined
  location?: WindowLocation | undefined
  navigate?: NavigateFn | undefined
  uri?: string | undefined
  children?: React.ReactNode
}

export interface IRoute {
  path: string
  Page: (props: IPageProps) => JSX.Element
  Icon: () => JSX.Element
  title: string
}

export interface IRoutesConfig {
  admin: IRoute[]
  common: IRoute[]
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
  post: <P, R>(url: string, payload: P) => Promise<Response<R>>
  delete: <P, R>(url: string, payload: P) => Promise<Response<R>>
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
  name: string
  group: string
  login: string
}

export interface UsersTableGroup {
  id: number
  name: string
}
