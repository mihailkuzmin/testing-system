import React from 'react'
import { Main, Groups, Works, Users, Tasks } from '../pages'
import { QueryParams } from '../typings'

export const routes = {
  '/': () => <Main.Index />,
  '/groups': () => <Groups.Index />,
  '/users': () => <Users.Index />,
  '/tasks': () => <Tasks.Index />,
  '/tasks/add': () => <Tasks.AddTask />,
  '/tasks/edit/:id': ({ id }: QueryParams) => <Tasks.EditTask id={id} />,
  '/tasks/preview/:id': ({ id }: QueryParams) => <Tasks.PreviewTask id={id} />,
  '/works': () => <Works.Index />,
  '/works/add': () => <Works.AddWork />,
}
