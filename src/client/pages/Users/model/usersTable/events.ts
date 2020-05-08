import { createEvent } from 'effector'
import { Response, UsersTableRow, UsersTableGroup, UsersTableRowId } from '@typings'

export const groupSelectChange = createEvent<number>()
export const onGroupSelectChange = groupSelectChange.prepend(
  (e: React.ChangeEvent<{ value: unknown }>) => {
    return e.target.value as number
  },
)

export const refreshUsers = createEvent()
export const groupsRefreshed = createEvent<Response<UsersTableGroup[]>>()
export const usersRefreshed = createEvent<Response<UsersTableRow[]>>()

export const selectForDelete = createEvent<UsersTableRowId>()
export const selectForEdit = createEvent<UsersTableRowId>()
export const deleteUser = createEvent()
export const userDeleted = createEvent<Response<UsersTableRow>>()
export const confirmDelete = createEvent()
export const cancelDelete = createEvent()
