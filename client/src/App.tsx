import React from 'react'
import { Header } from './components'
import { usePages, useNavigation } from './hooks'
import { routesConfig } from './routes'

function App() {
  const isAuth = true
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
