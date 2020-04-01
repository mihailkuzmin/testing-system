import React from 'react'
import { useStore } from 'effector-react'
import { SnackbarProvider } from 'notistack'
import { Header } from './components'
import { usePages, useNavigation } from './hooks'
import { routesConfig } from './routes'
import { Notifier } from './Notifier'
import { app } from './model'

function App() {
  const isAuth = useStore(app.$isAuth)
  const pages = usePages(isAuth, routesConfig)
  const navigation = useNavigation(isAuth, routesConfig)

  return (
    <SnackbarProvider maxSnack={4}>
      <div className='App'>
        <Notifier />
        <Header>{navigation}</Header>
        {pages}
      </div>
    </SnackbarProvider>
  )
}

export default App
