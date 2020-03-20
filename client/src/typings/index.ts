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
