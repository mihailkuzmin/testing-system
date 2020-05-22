import { createEvent, createStore, combine, forward } from 'effector'
import { getUsersFx, getGroupsFx } from '../usersTable/effects'

const open = createEvent()
const close = createEvent()

const onMount = () => {
  open()
  return () => close()
}

const $isLoading = combine([getUsersFx.pending, getGroupsFx.pending], (arr) => {
  return arr.reduce((prev, next) => prev || next)
})

const setFail = createEvent()
forward({ from: [getUsersFx.fail, getGroupsFx.fail], to: setFail })

const $isFail = createStore(false)
$isFail.on(setFail, () => true)
$isFail.reset(close)

const $status = combine({ isLoading: $isLoading, isFail: $isFail })

export const IndexPage = { open, close, onMount, $status }
