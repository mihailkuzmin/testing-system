import React from 'react'
import { useStore } from 'effector-react'
import { useRoutes } from 'hookrouter'
import { SnackbarProvider } from 'notistack'
import { Navigation, NavLink } from '@components/Navigation'
import { AppLoader } from '@components/Loaders'
import { Header, Layout, Notifier } from '@components'
import { getNavigationLinks, getRoutes } from '@routes'
import { Login } from '@pages'
import { auth } from '@model'

export const App = () => {
  const isLoading = useStore(auth.$checkPending)
  const isAuth = useStore(auth.$isAuth)
  const user = useStore(auth.$user)

  const pages = useRoutes(getRoutes(user?.role.name))
  const links = getNavigationLinks(user?.role.name)

  if (isLoading) {
    return <AppLoader />
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
            {links.map((link) => (
              <NavLink
                key={link.path}
                href={link.path}
                strict={link.strict}
                text={link.text}
                icon={link.icon}
              />
            ))}
          </Navigation>
        </Header>
        <Layout>{pages}</Layout>
      </SnackbarProvider>
    </div>
  )
}
