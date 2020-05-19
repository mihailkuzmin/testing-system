import React from 'react'
import { useStore } from 'effector-react'
import { useRoutes } from 'hookrouter'
import { SnackbarProvider } from 'notistack'
import { Navigation, NavLink } from '@components/Navigation'
import * as Icons from '@components/Icons'
import { Header, Layout, Notifier } from '@components'
import { routes } from '@routes'
import { Login } from '@pages'
import { auth } from '@model'

function App() {
  React.useEffect(auth.check, [])
  const isAuth = useStore(auth.$isAuth)
  const pages = useRoutes(routes)

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
          </Navigation>
        </Header>
        <Layout>{pages}</Layout>
      </SnackbarProvider>
    </div>
  )
}

export default App
