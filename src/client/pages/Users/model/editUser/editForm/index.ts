import { forward, guard, sample } from 'effector'
import { EditUserPage } from '../page'
import {
  $bookNumber,
  $changePassword,
  $firstName,
  $form,
  $groups,
  $id,
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
  firstNameChanged,
  groupChanged,
  lastNameChanged,
  loginChanged,
  passwordChanged,
  patronymicChanged,
  roleChanged,
  toggleChangePassword,
  updateUser,
} from './events'
import { getGroupsFx, getRolesFx, getUserFx, updateUserFx } from './effects'
import { notifications } from '@model'
import { MessageType } from '@typings'

forward({ from: EditUserPage.open, to: [getUserFx, getGroupsFx, getRolesFx] })
forward({ from: EditUserPage.close, to: [getUserFx.cancel, getGroupsFx.cancel, getRolesFx.cancel] })

$roles.on(getRolesFx.doneData, (_, { payload }) => payload)
$roles.reset(EditUserPage.close)

$selectedRole.on(roleChanged, (_, role) => role)
$selectedRole.on(getUserFx.doneData, (_, { payload }) => payload?.role.id)
$selectedRole.reset(EditUserPage.close)

$groups.on(getGroupsFx.doneData, (_, { payload }) => payload)
$groups.reset(EditUserPage.close)

$selectedGroup.on(groupChanged, (_, group) => group)
$selectedGroup.on(getUserFx.doneData, (_, { payload }) => payload?.group?.id)
$selectedGroup.reset(EditUserPage.close)

$id.on(getUserFx.doneData, (_, { payload }) => payload?.id)
$id.reset(EditUserPage.close)

$login.on(loginChanged, (_, login) => login)
$login.on(getUserFx.doneData, (_, { payload }) => payload?.login)
$login.reset(EditUserPage.close)

$password.on(passwordChanged, (_, password) => password)
$password.reset(EditUserPage.close)

$changePassword.on(toggleChangePassword, (state) => !state)
$changePassword.reset(EditUserPage.close)

$bookNumber.on(bookNumberChanged, (_, number) => number)
$bookNumber.on(getUserFx.doneData, (_, { payload }) => payload?.bookNumber)
$bookNumber.reset(EditUserPage.close)

$firstName.on(firstNameChanged, (_, firstName) => firstName)
$firstName.on(getUserFx.doneData, (_, { payload }) => payload?.firstName)
$firstName.reset(EditUserPage.close)

$lastName.on(lastNameChanged, (_, lastName) => lastName)
$lastName.on(getUserFx.doneData, (_, { payload }) => payload?.lastName)
$lastName.reset(EditUserPage.close)

$patronymic.on(patronymicChanged, (_, patronymic) => patronymic)
$patronymic.on(getUserFx.doneData, (_, { payload }) => payload?.patronymic)
$patronymic.reset(EditUserPage.close)

const $canSubmit = $form.map((form) => {
  return form.roleId !== null && form.id !== null && form.groupId !== null
})

const forSubmit = sample({ source: $form, clock: updateUser })
guard({
  source: forSubmit,
  filter: $canSubmit,
  target: updateUserFx,
})

updateUserFx.watch(() => {
  notifications.createMessage({ text: 'Выполняется', type: MessageType.Info })
})

updateUserFx.doneData.watch(({ message }) => {
  if (message) {
    notifications.createMessage({ text: message, type: MessageType.Success })
  }
})

updateUserFx.failData.watch(({ message }) => {
  notifications.createMessage({ text: message, type: MessageType.Error })
})

export const editForm = {
  $firstName,
  $lastName,
  $patronymic,
  $bookNumber,
  $login,
  $password,
  $changePassword,
  $selectedGroup,
  $selectedRole,
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
  toggleChangePassword,
  updateUser,
}
