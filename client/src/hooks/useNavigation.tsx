import React from 'react'
import { Link } from '@reach/router'
import { List, Item as ListItem } from '../components/Navigation'
import { IRoutesConfig } from '../typings'

interface INavItem {
  title: string
  path: string
  Icon: () => JSX.Element
}

const Item = ({ title, path, Icon }: INavItem) => {
  return (
    <ListItem key={path}>
      <Link className='nav-link' to={path}>
        <Icon />
        {title}
      </Link>
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
