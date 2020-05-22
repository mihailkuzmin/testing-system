import { createEvent } from 'effector'
import { GroupId } from '@common/typings/group'
import { RoleId } from '@common/typings/user'

export const firstNameChanged = createEvent<string>()
export const lastNameChanged = createEvent<string>()
export const patronymicChanged = createEvent<string>()
export const bookNumberChanged = createEvent<string>()
export const loginChanged = createEvent<string>()
export const passwordChanged = createEvent<string>()
export const groupChanged = createEvent<GroupId>()
export const roleChanged = createEvent<RoleId>()
export const toggleChangePassword = createEvent()

export const updateUser = createEvent()
