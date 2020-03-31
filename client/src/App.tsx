import React from 'react'
import { useStore } from 'effector-react'
import { Header } from './components'
import { usePages, useNavigation } from './hooks'
import { routesConfig } from './routes'
import { stores } from './model'

function App() {
  const isAuth = useStore(stores.$isAuth)
  const pages = usePages(isAuth, routesConfig)
  const navigation = useNavigation(isAuth, routesConfig)

  return (
    <div className='App'>
      <Header>{navigation}</Header>
      {pages}
    </div>
  )
}

export default App
