import React from 'react'
import { Router } from '@reach/router'
import { IRoutesConfig } from '../typings'

export const usePages = (isAuth: boolean, routesConfig: IRoutesConfig) => {
  if (isAuth) {
    return (
      <Router>
        {routesConfig.admin.map(({ path, Page }) => (
          <Page key={path} path={path} />
        ))}
      </Router>
    )
  }
  return (
    <Router>
      {routesConfig.common.map(({ path, Page }) => (
        <Page key={path} path={path} />
      ))}
    </Router>
  )
}
