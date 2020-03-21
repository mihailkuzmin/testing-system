import * as Pages from '../pages'
import { IRoutesConfig } from '../typings'

/**
 * Use another groupName for group links in dropdown menu
 */

export const routesConfig: IRoutesConfig = {
  admin: [
    {
      groupName: 'Single',
      routes: [
        { path: '/', title: 'Главная', Page: Pages.Main },
        { path: '/groups', title: 'Группы', Page: Pages.Groups },
        { path: '/users', title: 'Пользователи', Page: Pages.Users },
      ],
    },
  ],
  common: [
    {
      groupName: 'Single',
      routes: [{ path: '/', title: 'Main', Page: Pages.Main }],
    },
  ],
}
