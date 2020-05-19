import React from 'react'
import { useStore } from 'effector-react'
import { useRoutes } from 'hookrouter'
import { SnackbarProvider } from 'notistack'
import { Navigation, NavLink } from '@components/Navigation'
import { PageLoader } from '@components/Loaders'
import { Header, Layout, Notifier } from '@components'
import * as Icons from '@components/Icons'
import { routes } from '@routes'
import { Login } from '@pages'
import { auth } from '@model'

export const App = () => {
  const isLoading = useStore(auth.$checkPending)
  const isAuth = useStore(auth.$isAuth)
  const pages = useRoutes(routes)

  if (isLoading) {
    return <PageLoader style={{ marginLeft: '0' }} />
  }

  if (!isAuth) {
    return <Login />
  }

  return (
    <div className='App'>
      <SnackbarProvider maxSnack={4}>
        <Notifier />
        <Header>
          <Navigation>
            <NavLink href='/' strict text='Главная' icon={Icons.Home} />
            <NavLink href='/groups' text='Группы' icon={Icons.Groups} />
            <NavLink href='/users' text='Пользователи' icon={Icons.Users} />
            <NavLink href='/tasks' text='Задания' icon={Icons.Tasks} />
            <NavLink href='/works' text='Работы' icon={Icons.Works} />
            <NavLink href='/logout' text='Выйти' icon={Icons.Logout} />
          </Navigation>
        </Header>
        <Layout>{pages}</Layout>
      </SnackbarProvider>
    </div>
  )
}
