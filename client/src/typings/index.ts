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
