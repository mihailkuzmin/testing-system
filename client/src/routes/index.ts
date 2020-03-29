import * as Pages from '../pages'
import * as Icons from '../components/Icons'
import { IRoutesConfig } from '../typings'

export const routesConfig: IRoutesConfig = {
  admin: [
    { path: '/', title: 'Главная', Page: Pages.Main, Icon: Icons.Home },
    {
      path: '/groups',
      title: 'Группы',
      Page: Pages.Groups,
      Icon: Icons.Groups,
    },
    {
      path: '/users',
      title: 'Пользователи',
      Page: Pages.Users,
      Icon: Icons.Users,
    },
    {
      path: '/works',
      title: 'Работы',
      Page: Pages.Works,
      Icon: Icons.Works,
    },
    {
      path: '/tasks',
      title: 'Задания',
      Page: Pages.Tasks,
      Icon: Icons.Tasks,
    },
  ],
  common: [{ path: '/', title: 'Main', Page: Pages.Main, Icon: Icons.Home }],
}
