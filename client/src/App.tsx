import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { Navigation, NavLink } from './components/Navigation'
import * as Icons from './components/Icons'
import { Header, Layout } from './components'
import { Notifier } from './Notifier'
import * as Pages from './pages'

function App() {
  return (
    <div className='App'>
      <SnackbarProvider maxSnack={4}>
        <Router>
          <Notifier />
          <Header>
            <Navigation>
              <NavLink to='/' text='Главная' Icon={Icons.Home} />
              <NavLink to='/groups' text='Группы' Icon={Icons.Groups} />
              <NavLink to='/users' text='Пользователи' Icon={Icons.Users} />
              <NavLink to='/tasks' text='Задания' Icon={Icons.Tasks} />
              <NavLink to='/works' text='Работы' Icon={Icons.Works} />
            </Navigation>
          </Header>
          <Switch>
            <Layout>
              <Route exact path='/' component={Pages.Main} />
              <Route path='/groups' component={Pages.Groups} />
              <Route path='/users' component={Pages.Users} />
              <Route path='/tasks' component={Pages.Tasks} />
              <Route path='/works' component={Pages.Works} />
            </Layout>
          </Switch>
        </Router>
      </SnackbarProvider>
    </div>
  )
}

export default App
