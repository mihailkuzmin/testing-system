import * as Pages from '../pages'
import * as Icons from '../components/Icons'
import { IRoutesConfig } from '../typings'

export const routesConfig: IRoutesConfig = {
  admin: [
    { path: '/', title: 'Главная', Page: Pages.Main, Icon: Icons.Home },
    { path: '/groups', title: 'Группы', Page: Pages.Groups, Icon: Icons.Groups },
    { path: '/users', title: 'Пользователи', Page: Pages.Users, Icon: Icons.Users },
  ],
  common: [{ path: '/', title: 'Main', Page: Pages.Main, Icon: Icons.Home }],
}
