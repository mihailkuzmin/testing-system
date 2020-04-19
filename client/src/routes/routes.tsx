import React from 'react'
import * as Pages from '../pages'

export const routes = {
  '/': () => <Pages.Main.Index />,
  '/groups': () => <Pages.Groups.Index />,
  '/users': () => <Pages.Users.Index />,
  '/tasks': () => <Pages.Tasks.Index />,
  '/tasks/add': () => <Pages.Tasks.AddTask />,
  '/works': () => <Pages.Works.Index />,
}
