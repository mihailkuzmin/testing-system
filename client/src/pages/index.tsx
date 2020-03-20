import React from 'react'
import { Router, Link } from '@reach/router'

import { Main } from './Main'
import { Admin } from './Admin'
import { Users } from './Admin/Users'

export const usePages = (isAuth: boolean) => {
  if (isAuth) {
    return [adminPages, adminLinks]
  }

  return [commonPages, commonLinks]
}

const adminPages = (
  <Router>
    <Main path='/' />
    <Admin path='admin'>
      <Users path='users' />
    </Admin>
  </Router>
)

const adminLinks = (
  <React.Fragment>
    <Link to='/'>Main</Link>
    <Link to='admin'>Admin</Link>
    <Link to='admin/users'>Users</Link>
  </React.Fragment>
)

const commonPages = (
  <Router>
    <Main path='/' />
  </Router>
)

const commonLinks = <Link to='/'>Main</Link>
