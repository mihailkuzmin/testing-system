import { guard, sample, createStore } from 'effector'
import { createReEffect } from 'effector-reeffect'
import { Work } from '@common/typings/work'
import { usersApi } from '@api'
import { auth } from '@model'

const getWorksFx = createReEffect({ handler: usersApi.getAvailableWorks })

const $works = createStore<Work[]>([])
$works.on(getWorksFx.doneData, (_, { payload }) => payload)
$works.reset(auth.logout)

guard({
  source: sample({
    source: auth.$user,
    clock: auth.loggedIn,
    fn: (user) => (user ? user.id : null),
  }),
  filter: Boolean,
  target: getWorksFx,
})

export const MainPage = {
  $works,
  $isLoading: getWorksFx.pending,
}
