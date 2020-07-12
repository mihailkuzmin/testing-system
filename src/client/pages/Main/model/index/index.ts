import { guard, sample, createStore, createEvent, forward } from 'effector'
import { createReEffect } from 'effector-reeffect'
import { AvailableWork } from '@common/typings/work'
import { usersApi } from '@api'
import { auth } from '@model'
import { getTimeToCompleteString } from '@common/helpers'

const getWorksFx = createReEffect({ handler: usersApi.getAvailableWorks })

const open = createEvent()
const close = createEvent()

forward({ from: close, to: getWorksFx.cancel })

const onMount = () => {
  open()
  return () => close()
}

const $works = createStore<AvailableWork[]>([])
$works.on(getWorksFx.doneData, (_, { payload }) => {
  if (payload) {
    return payload.map(({ openAt, closeAt, timeToComplete, ...w }) => {
      return {
        ...w,
        openAt: new Date(openAt).toLocaleString(),
        closeAt: new Date(closeAt).toLocaleString(),
        timeToComplete: getTimeToCompleteString(new Date(timeToComplete)),
      }
    })
  }
})
$works.reset(close)

guard({
  source: sample({
    source: auth.$store,
    clock: open,
    fn: ({ user }) => (user ? user.id : null),
  }),
  filter: Boolean,
  target: getWorksFx,
})

export const MainPage = {
  onMount,
  $works,
  $isLoading: getWorksFx.pending,
}
