import { combine, forward, guard, sample } from 'effector'
import { notifications } from '@model'
import { MessageType } from '@typings'
import { AddUserPage } from '../page'
import {
  $bookNumber,
  $firstName,
  $form,
  $groups,
  $lastName,
  $login,
  $password,
  $patronymic,
  $roles,
  $selectedGroup,
  $selectedRole,
} from './stores'
import {
  bookNumberChanged,
  createUser,
  firstNameChanged,
  groupChanged,
  lastNameChanged,
  loginChanged,
  passwordChanged,
  patronymicChanged,
  roleChanged,
} from './events'
import { createUserFx, getGroupsFx, getRolesFx } from './effects'

forward({ from: AddUserPage.open, to: [getGroupsFx, getRolesFx] })
forward({ from: AddUserPage.close, to: [getGroupsFx.cancel, getRolesFx.cancel] })

$roles.on(getRolesFx.doneData, (_, { payload }) => payload)
$roles.reset(AddUserPage.close)

$selectedRole.on(roleChanged, (_, role) => role)
$selectedRole.reset(AddUserPage.close, createUserFx.done)

const $adminRoleSelected = combine(
  { selectedId: $selectedRole, roles: $roles },
  ({ selectedId, roles }) => {
    return roles.some((role) => role.name === 'Администратор' && role.id === selectedId)
  },
)

$groups.on(getGroupsFx.doneData, (_, { payload }) => payload)
$groups.reset(AddUserPage.close)

$selectedGroup.on(groupChanged, (_, group) => group)
$selectedGroup.on($adminRoleSelected, (group, isAdmin) => (isAdmin ? null : group))
$selectedGroup.reset(AddUserPage.close, createUserFx.done)

$login.on(loginChanged, (_, login) => login)
$login.reset(AddUserPage.close, createUserFx.done)

$password.on(passwordChanged, (_, password) => password)
$password.reset(AddUserPage.close, createUserFx.done)

$bookNumber.on(bookNumberChanged, (_, number) => number)
$bookNumber.on($adminRoleSelected, (_, isAdmin) => (isAdmin ? null : ''))
$bookNumber.reset(AddUserPage.close, createUserFx.done)

$firstName.on(firstNameChanged, (_, firstName) => firstName)
$firstName.reset(AddUserPage.close, createUserFx.done)

$lastName.on(lastNameChanged, (_, lastName) => lastName)
$lastName.reset(AddUserPage.close, createUserFx.done)

$patronymic.on(patronymicChanged, (_, patronymic) => patronymic)
$patronymic.reset(AddUserPage.close, createUserFx.done)

const forSubmit = sample({ source: $form, clock: createUser })

const $canSubmit = $form.map((form) => {
  const roleSelected = form.roleId !== null
  const groupSelected = form.groupId !== null

  if (!roleSelected) {
    return false
  }

  const isStudent = form.bookNumber !== null
  return (groupSelected && isStudent) || !isStudent
})
guard({
  source: forSubmit,
  filter: $canSubmit,
  target: createUserFx,
})

createUserFx.watch(() => {
  notifications.createMessage({ text: 'Выполняется', type: MessageType.Info })
})

createUserFx.doneData.watch(({ message }) => {
  if (message) {
    notifications.createMessage({ text: message, type: MessageType.Success })
  }
})

createUserFx.failData.watch(({ message }) => {
  notifications.createMessage({ text: message, type: MessageType.Error })
})

export const addForm = {
  $firstName,
  $lastName,
  $patronymic,
  $bookNumber,
  $login,
  $password,
  $selectedGroup,
  $selectedRole,
  $adminRoleSelected,
  $groups,
  $roles,
  loginChanged,
  passwordChanged,
  bookNumberChanged,
  firstNameChanged,
  groupChanged,
  lastNameChanged,
  patronymicChanged,
  roleChanged,
  createUser,
}
