import { createEvent, createStore, combine } from 'effector'
import { getUsersFx, getGroupsFx } from '../usersTable/effects'

const open = createEvent()
const close = createEvent()

const onMount = () => {
  open()
  return () => close()
}

const $isLoading = createStore(2)
$isLoading.on(getUsersFx.done, (count) => (count ? count - 1 : count))
$isLoading.on(getGroupsFx.done, (count) => (count ? count - 1 : count))
$isLoading.on(getUsersFx.fail, () => 0)
$isLoading.on(getGroupsFx.fail, () => 0)
$isLoading.reset(close)

const $isFail = createStore(false)
$isFail.on(getUsersFx.fail, () => true)
$isFail.on(getGroupsFx.fail, () => true)
$isFail.reset(close)

const $status = combine({ isLoading: $isLoading.map(Boolean), isFail: $isFail })

export const IndexPage = { open, close, onMount, $status }
