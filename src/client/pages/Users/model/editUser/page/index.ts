import { combine, createEvent, createStore, forward } from 'effector'
import { UserId } from '@common/typings/user'
import { getUserFx, getGroupsFx, getRolesFx } from '../editForm/effects'

const open = createEvent<UserId>()
const close = createEvent()

const onMount = (id: UserId) => {
  open(id)
  return () => close()
}

const $isLoading = combine([getUserFx.pending, getGroupsFx.pending, getRolesFx.pending], (arr) => {
  return arr.reduce((prev, next) => prev || next)
})

const setFail = createEvent()
forward({ from: [getUserFx.fail, getGroupsFx.fail, getRolesFx.fail], to: setFail })

const $isFail = createStore(false)
$isFail.on(setFail, () => true)
$isFail.reset(close)

const $status = combine({ isLoading: $isLoading, isFail: $isFail })

export const EditUserPage = { open, close, onMount, $status }
