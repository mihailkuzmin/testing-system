import React from 'react'
import { Link, Router } from '@reach/router'
import { Header } from './components'
import * as Pages from './pages'

function App() {
  return (
    <div className='App'>
      <Header>
        <nav>
          <Link to='/'>Main</Link>
          <Link to='admin'>Admin</Link>
          <Link to='admin/users'>Users</Link>
        </nav>
      </Header>
      <Router>
        <Pages.Main path='/' />
        <Pages.Admin path='admin'>
          <Pages.Users path='users' />
        </Pages.Admin>
      </Router>
    </div>
  )
}

export default App
