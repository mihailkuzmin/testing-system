import React from 'react'
import { useRoutes } from 'hookrouter'
import { SnackbarProvider } from 'notistack'
import { Navigation, NavLink } from './components/Navigation'
import * as Icons from './components/Icons'
import { Header, Layout } from './components'
import { Notifier } from './Notifier'
import { routes } from './routes'

function App() {
  const pages = useRoutes(routes)

  return (
    <div className='App'>
      <SnackbarProvider maxSnack={4}>
        <Notifier />
        <Header>
          <Navigation>
            <NavLink href='/' text='Главная' icon={Icons.Home} />
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
