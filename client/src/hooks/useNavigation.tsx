import React from 'react'
import { List, Item as ListItem, NavLink } from '../components/Navigation'
import { IRoutesConfig } from '../typings'

interface INavItem {
  title: string
  path: string
  Icon: () => JSX.Element
}

const Item = ({ title, path, Icon }: INavItem) => {
  return (
    <ListItem key={path}>
      <NavLink to={path}>
        <Icon />
        {title}
      </NavLink>
    </ListItem>
  )
}

export const useNavigation = (isAuth: boolean, routesConfig: IRoutesConfig) => {
  if (isAuth) {
    return (
      <List>
        {routesConfig.admin.map(({ title, path, Icon }) => (
          <Item Icon={Icon} key={path} path={path} title={title} />
        ))}
      </List>
    )
  }

  return (
    <List>
      {routesConfig.common.map(({ title, path, Icon }) => (
        <Item Icon={Icon} key={path} path={path} title={title} />
      ))}
    </List>
  )
}
