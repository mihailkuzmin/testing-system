import React from 'react'
import { Groups, Login, Logout, Main, Tasks, Users, Works } from '@pages'
import * as Icons from '@components/Icons'
import { QueryParams } from '@typings'
import { Roles } from '@common/typings/user'

type Link = { path: string; strict?: boolean; text: string; icon: () => JSX.Element }

const studentRoutes = {
  '/': () => <Main.Index />,
  '/login': () => <Login />,
  '/logout': () => <Logout />,
}

const studentLinks: Link[] = [
  { path: '/', strict: true, text: 'Главная', icon: Icons.Home },
  { path: '/logout', text: 'Выйти', icon: Icons.Logout },
]

const moderatorRoutes = {
  '/': () => <Main.Index />,
  '/login': () => <Login />,
  '/logout': () => <Logout />,
  '/tasks': () => <Tasks.AddTask />,
}

const moderatorLinks: Link[] = [
  { path: '/', strict: true, text: 'Главная', icon: Icons.Home },
  { path: '/tasks', text: 'Задания', icon: Icons.Tasks },
  { path: '/logout', text: 'Выйти', icon: Icons.Logout },
]

const anonymousRoutes = {
  '/login': () => <Login />,
}

const anonymousLinks: Link[] = []

const adminRoutes = {
  '/': () => <Main.Index />,
  '/login': () => <Login />,
  '/logout': () => <Logout />,
  '/groups': () => <Groups.Index />,
  '/users': () => <Users.Index />,
  '/users/add': () => <Users.AddUser />,
  '/users/edit/:id': ({ id }: QueryParams) => <Users.EditUser id={id} />,
  '/tasks': () => <Tasks.Index />,
  '/tasks/add': () => <Tasks.AddTask />,
  '/tasks/edit/:id': ({ id }: QueryParams) => <Tasks.EditTask id={id} />,
  '/tasks/preview/:id': ({ id }: QueryParams) => <Tasks.PreviewTask id={id} />,
  '/works': () => <Works.Index />,
  '/works/add': () => <Works.AddWork />,
  '/works/edit/:id': ({ id }: QueryParams) => <Works.EditWork id={id} />,
  '/works/preview/:id': ({ id }: QueryParams) => <Works.PreviewWork id={id} />,
}

const adminLinks: Link[] = [
  { path: '/', strict: true, text: 'Главная', icon: Icons.Home },
  { path: '/groups', text: 'Группы', icon: Icons.Groups },
  { path: '/users', text: 'Студенты', icon: Icons.Users },
  { path: '/tasks', text: 'Задания', icon: Icons.Tasks },
  { path: '/works', text: 'Работы', icon: Icons.Works },
  { path: '/logout', text: 'Выйти', icon: Icons.Logout },
]

export const getRoutes = (role?: Roles) => {
  switch (role) {
    case Roles.student:
      return studentRoutes
    case Roles.moderator:
      return moderatorRoutes
    case Roles.administrator:
      return adminRoutes
    default:
      return anonymousRoutes
  }
}

export const getNavigationLinks = (role?: Roles): Link[] => {
  switch (role) {
    case Roles.student:
      return studentLinks
    case Roles.moderator:
      return moderatorLinks
    case Roles.administrator:
      return adminLinks
    default:
      return anonymousLinks
  }
}
