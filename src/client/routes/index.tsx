import React from 'react'
import { Groups, Login, Logout, Main, Tasks, Users, Works, Begin, Report } from '@pages'
import * as Icons from '@components/Icons'
import { QueryParams } from '@typings'
import { Roles } from '@common/typings/user'

type Link = { path: string; strict?: boolean; text: string; icon: () => JSX.Element }

const studentRoutes = {
  '/': () => <Main.Index />,
  '/begin/:id': ({ id }: QueryParams) => <Begin id={id} />,
  '/login': () => <Login />,
  '/logout': () => <Logout />,
}

const studentLinks: Link[] = [
  { path: '/', strict: true, text: 'Главная', icon: Icons.Home },
  { path: '/logout', text: 'Выйти', icon: Icons.Logout },
]

const moderatorRoutes = {
  '/': () => <Main.Index />,
  '/begin/:id': ({ id }: QueryParams) => <Begin id={id} />,
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
  '/report': () => <Report />,
}

const adminLinks: Link[] = [
  { path: '/', strict: true, text: 'Главная', icon: Icons.Home },
  { path: '/groups', text: 'Группы', icon: Icons.Groups },
  { path: '/users', text: 'Студенты', icon: Icons.Users },
  { path: '/tasks', text: 'Задания', icon: Icons.Tasks },
  { path: '/works', text: 'Работы', icon: Icons.Works },
  { path: '/report', text: 'Результаты', icon: Icons.Report },
  { path: '/logout', text: 'Выйти', icon: Icons.Logout },
]

export const getRoutes = (role?: Roles) => {
  switch (role) {
    case Roles.Student:
      return studentRoutes
    case Roles.Moderator:
      return moderatorRoutes
    case Roles.Administrator:
      return adminRoutes
    default:
      return anonymousRoutes
  }
}

export const getNavigationLinks = (role?: Roles): Link[] => {
  switch (role) {
    case Roles.Student:
      return studentLinks
    case Roles.Moderator:
      return moderatorLinks
    case Roles.Administrator:
      return adminLinks
    default:
      return anonymousLinks
  }
}
