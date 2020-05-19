import { createStore, createEvent, sample, combine } from 'effector'
import { auth } from '@model'

const login = createEvent()
const loginChanged = createEvent<string>()
const passwordChanged = createEvent<string>()

const $login = createStore('')
$login.on(loginChanged, (_, login) => login)
$login.reset(auth.loggedIn)

const $password = createStore('')
$password.on(passwordChanged, (_, password) => password)
$password.reset(auth.loggedIn)

const $loginFailed = createStore(false)
$loginFailed.on(auth.loginFailed, () => true)
$loginFailed.reset(loginChanged, passwordChanged, auth.loggedIn)

sample({
  source: combine({ login: $login, password: $password }),
  clock: login,
  target: auth.login,
})

export const loginForm = {
  $login,
  $password,
  $loginFailed,
  loginChanged,
  passwordChanged,
  login,
}
