import { Main } from '../pages'
import * as Edit from '../pages/Edit'
import { IRoutesConfig } from '../typings'

export const routesConfig: IRoutesConfig = {
  admin: [
    { groupName: 'Single', routes: [{ path: '/', title: 'Main', Page: Main }] },
    {
      groupName: 'Edit',
      routes: [{ path: 'edit/users', title: 'Users', Page: Edit.Users }],
    },
  ],
  common: [
    {
      groupName: 'Single',
      routes: [{ path: '/', title: 'Main', Page: Main }],
    },
  ],
}
