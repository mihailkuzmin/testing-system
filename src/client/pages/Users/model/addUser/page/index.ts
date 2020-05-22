import { combine, createEvent, createStore, forward } from 'effector'
import { getGroupsFx, getRolesFx } from '../addForm/effects'

const open = createEvent()
const close = createEvent()

const onMount = () => {
  open()
  return () => close()
}

const $isLoading = combine([getGroupsFx.pending, getRolesFx.pending], (arr) => {
  return arr.reduce((prev, next) => prev || next)
})

const setFail = createEvent()
forward({ from: [getGroupsFx.fail, getRolesFx.fail], to: setFail })

const $isFail = createStore(false)
$isFail.on(setFail, () => true)
$isFail.reset(close)

const $status = combine({ isLoading: $isLoading, isFail: $isFail })

export const AddUserPage = { open, close, onMount, $status }
