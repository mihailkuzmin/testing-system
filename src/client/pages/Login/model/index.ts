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

auth.loginFailed.watch(() => setTimeout(resetFailed, 2000))

const $loginValid = $login.map((login) => Boolean(login.length))
const $passwordValid = $password.map((password) => Boolean(password.length))
const $canSubmit = combine([$loginValid, $passwordValid], (arr) => {
  return arr.reduce((prev, next) => prev && next)
})

const $form = combine({ login: $login, password: $password })

guard({ source: sample($form, login), filter: $canSubmit, target: auth.login })

export const loginForm = {
  $login,
  $password,
  $loginFailed,
  $canSubmit,
  loginChanged,
  passwordChanged,
  login,
}
