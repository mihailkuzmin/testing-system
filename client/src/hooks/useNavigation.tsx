import React from 'react'
import { Link } from '@reach/router'
import { LinksGroup } from '../components'
import { List, Item } from '../components/Navigation'
import { IRoutesConfig, RouteGroup } from '../typings'

const renderGroup = (group: RouteGroup) => {
  return (
    <Item key={group.groupName}>
      <LinksGroup placeholder={group.groupName}>
        {group.routes.map(({ path, title }) => (
          <Link key={path} className='nav-link' to={path}>
            {title}
          </Link>
        ))}
      </LinksGroup>
    </Item>
  )
}

const renderSingle = (group: RouteGroup) => {
  return group.routes.map(({ path, title }) => (
    <Item key={path}>
      <Link className='nav-link' to={path}>
        {title}
      </Link>
    </Item>
  ))
}

export const useNavigation = (isAuth: boolean, routesConfig: IRoutesConfig) => {
  if (isAuth) {
    return (
      <List>
        {routesConfig.admin.map((group) => {
          if (group.groupName === 'Single') {
            return renderSingle(group)
          }
          return renderGroup(group)
        })}
      </List>
    )
  }

  return (
    <List>
      {routesConfig.common.map((group) => {
        if (group.groupName === 'Single') {
          return renderSingle(group)
        }
        return renderGroup(group)
      })}
    </List>
  )
}
