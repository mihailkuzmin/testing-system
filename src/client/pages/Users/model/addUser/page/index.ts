import { combine, createEvent, createStore } from 'effector'
import { getGroupsFx, getRolesFx } from '../addForm/effects'

const open = createEvent()
const close = createEvent()

const onMount = () => {
  open()
  return () => close()
}

const $isLoading = createStore(2)
$isLoading.on(getGroupsFx.done, (count) => (count ? count - 1 : count))
$isLoading.on(getRolesFx.done, (count) => (count ? count - 1 : count))
$isLoading.on(getGroupsFx.fail, () => 0)
$isLoading.on(getRolesFx.fail, () => 0)
$isLoading.reset(close)

const $isFail = createStore(false)
$isFail.on(getGroupsFx.fail, () => true)
$isFail.on(getRolesFx.fail, () => true)
$isFail.reset(close)

const $status = combine({ isLoading: $isLoading.map(Boolean), isFail: $isFail })

export const AddUserPage = { open, close, onMount, $status }
