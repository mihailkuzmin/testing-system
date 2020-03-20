import React from 'react'
import { Router } from '@reach/router'
import { IRoutesConfig } from '../typings'

export const usePages = (isAuth: boolean, routesConfig: IRoutesConfig) => {
  if (isAuth) {
    return (
      <Router>
        {routesConfig.admin.map((group) => {
          return group.routes.map(({ path, Page }) => <Page path={path} />)
        })}
      </Router>
    )
  }
  return (
    <Router>
      {routesConfig.common.map((group) => {
        return group.routes.map(({ path, Page }) => <Page path={path} />)
      })}
    </Router>
  )
}
