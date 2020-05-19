import { createEvent, forward } from 'effector'
import { Credentials } from '@common/typings/auth'
import { $user, $isAuth } from './stores'
import { loginFx, checkFx, logoutFx } from './effects'

const checkAuth = createEvent()
const login = createEvent<Credentials>()
const loginFailed = createEvent()
const loggedIn = createEvent()

forward({ from: checkAuth, to: checkFx })
forward({ from: login, to: loginFx })
forward({ from: loginFx.fail, to: loginFailed })
forward({ from: loginFx.done, to: loggedIn })

$user.on(checkFx.doneData, (_, { payload }) => payload)
$user.on(loginFx.doneData, (_, { payload }) => payload)
$user.reset(logoutFx)

export const auth = {
  $user,
  $isAuth,
  $loginPending: loginFx.pending,
  $checkPending: checkFx.pending,
  check: () => checkAuth(),
  login,
  loginFailed,
  loggedIn,
}
