import { WindowLocation, NavigateFn } from 'reach__router'
import React from 'react'

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
  Status for operation
  success/error/etc - material-ui alert prop type
  Using info & warning for types compatibility
  Done - operation successfull
  Fail - operation fails with error
  Pending - wait for server response
  Idle - initial state
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
}

export interface Response<T> {
  payload: T
  message: string
}
