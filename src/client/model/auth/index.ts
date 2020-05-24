import { createEvent, forward } from 'effector'
import { navigate } from 'hookrouter'
import { Credentials } from '@common/typings/auth'
import { $user, $isAuth } from './stores'
import { loginFx, checkFx, logoutFx } from './effects'

const checkAuth = createEvent()
const login = createEvent<Credentials>()
const logout = createEvent()
const loginFailed = createEvent()
const loggedIn = createEvent()

forward({ from: checkAuth, to: checkFx })
forward({ from: login, to: loginFx })
forward({ from: logout, to: logoutFx })
forward({ from: loginFx.fail, to: loginFailed })
forward({ from: [loginFx.done, checkFx.done], to: loggedIn })

$user.on(checkFx.doneData, (_, { payload }) => payload)
$user.on(loginFx.doneData, (_, { payload }) => payload)
$user.reset(logoutFx.done)

loggedIn.watch(() => navigate('/'))
logoutFx.done.watch(() => navigate('/'))

export const auth = {
  $user,
  $isAuth,
  $loginPending: loginFx.pending,
  $checkPending: checkFx.pending,
  checkAuth,
  login,
  logout,
  loginFailed,
  loggedIn,
}
