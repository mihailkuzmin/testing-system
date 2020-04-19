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
    <SnackbarProvider maxSnack={4}>
      <Router>
        <div className='App'>
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
          <Layout>
            <Switch>
              <Route exact path='/' component={Pages.Main} />
              <Route path='/groups' component={Pages.Groups} />
              <Route path='/users' component={Pages.Users} />
              <Route path='/tasks' component={Pages.Tasks} />
              <Route path='/works' component={Pages.Works} />
            </Switch>
          </Layout>
        </div>
      </Router>
    </SnackbarProvider>
  )
}

export default App
