import { createStore } from 'effector'
import { UsersTableRow, UsersTableGroup } from '../../../../typings'
import { Status } from '../../../../typings'

export const $users = createStore<UsersTableRow[]>([])

export const $groups = createStore<UsersTableGroup[]>([])

export const $groupSelectMinWidth = $groups.map((groups) => {
  const names = groups.map((g) => g.name)
  const maxName = names.reduce((a, b) => {
    return b.length > a.length ? b : a
  }, '')
  return `${maxName.length - 0.5}rem`
})

export const $groupSelectValue = createStore<number | string>('')

export const $getAllUsersStatus = createStore<Status>(Status.Pending)
export const $getGroupsStatus = createStore<Status>(Status.Pending)
