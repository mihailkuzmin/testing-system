import React from 'react'
import { Header } from './components'
import { usePages } from './pages'

function App() {
  const [pages, links] = usePages(true)

  return (
    <div className='App'>
      <Header>
        <nav>{links}</nav>
      </Header>
      {pages}
    </div>
  )
}

export default App
