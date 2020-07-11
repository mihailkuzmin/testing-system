import { guard, sample, createStore } from 'effector'
import { createReEffect } from 'effector-reeffect'
import { Work } from '@common/typings/work'
import { usersApi } from '@api'
import { auth } from '@model'
import { getTimeToCompleteString } from '@common/helpers'

const getWorksFx = createReEffect({ handler: usersApi.getAvailableWorks })

const $works = createStore<Work[]>([])
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
$works.reset(auth.logout)

guard({
  source: sample({
    source: auth.$store,
    clock: auth.loggedIn,
    fn: ({ user }) => (user ? user.id : null),
  }),
  filter: Boolean,
  target: getWorksFx,
})

export const MainPage = {
  $works,
  $isLoading: getWorksFx.pending,
}
