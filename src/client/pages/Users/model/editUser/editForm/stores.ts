import { combine, createStore } from 'effector'
import { Group, GroupId } from '@common/typings/group'
import { Role, RoleId, UserId } from '@common/typings/user'

export const $id = createStore<UserId | null>(null)
export const $firstName = createStore('')
export const $lastName = createStore('')
export const $patronymic = createStore('')
export const $bookNumber = createStore<string | null>('')
export const $login = createStore('')
export const $password = createStore('')
export const $selectedGroup = createStore<GroupId | null>(null)
export const $selectedRole = createStore<RoleId | null>(null)
export const $changePassword = createStore(false)

export const $groups = createStore<Group[]>([])
export const $roles = createStore<Role[]>([])

export const $form = combine({
  id: $id,
  firstName: $firstName,
  lastName: $lastName,
  patronymic: $patronymic,
  bookNumber: $bookNumber,
  login: $login,
  password: $password,
  groupId: $selectedGroup,
  roleId: $selectedRole,
  changePassword: $changePassword,
})
