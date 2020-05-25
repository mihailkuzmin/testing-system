import { createStore, createEvent, sample, combine, forward, guard } from 'effector'
import { auth } from '@model'

const login = createEvent()
const loginChanged = createEvent<string>()
const passwordChanged = createEvent<string>()
const resetFailed = createEvent()

const $login = createStore('')
$login.on(loginChanged, (_, login) => login)
$login.reset(auth.loggedIn)

const $password = createStore('')
$password.on(passwordChanged, (_, password) => password)
$password.reset(auth.loggedIn)

forward({ from: [loginChanged, passwordChanged], to: resetFailed })

const $loginFailed = createStore(false)
$loginFailed.on(auth.loginFailed, () => true)
$loginFailed.reset(resetFailed)

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
