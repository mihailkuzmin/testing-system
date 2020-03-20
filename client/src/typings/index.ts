import { WindowLocation, NavigateFn } from 'reach__router'
import { ReactNode } from 'react'

// Used for @reach-router
export interface IPageProps {
  path?: string | undefined
  default?: boolean | undefined
  location?: WindowLocation | undefined
  navigate?: NavigateFn | undefined
  uri?: string | undefined
  children?: ReactNode
}

export type Route = {
  path: string
  Page: (props: IPageProps) => JSX.Element
  title?: string
}

export type RouteGroup = {
  groupName: string
  routes: Route[]
}

export interface IRoutesConfig {
  admin: RouteGroup[]
  common: RouteGroup[]
}
