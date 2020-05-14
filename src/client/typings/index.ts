import React from 'react'
import { OptionsObject } from 'notistack'

export type PageProps = { children?: React.ReactNode }

export type QueryParams = { [key: string]: any }

/*
  Async operation status
  Done - operation successful
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

export enum MessageType {
  Default = 'default',
  Error = 'error',
  Success = 'success',
  Warning = 'warning',
  Info = 'info',
}

export type NewMessage = { type: MessageType; text: string }

export type Message = OptionsObject & {
  key: string
  options: any
  message: string
  displayed: boolean
}

export type UsersTableRowId = number

export type UsersTableRow = {
  id: UsersTableRowId
  lastName: string
  firstName: string
  patronymic: string
  group: UsersTableGroup
  bookNumber: string
  login: string
}

export type UsersTableGroup = { id: number | string; name: string }
