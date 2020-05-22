import React from 'react'
import { useStore } from 'effector-react'
import { editForm } from '@pages/Users/model/editUser'
import { CheckBox, Input } from '@components/Inputs'
import { Item, Select } from '@components/Inputs/Select'
import { GroupId } from '@common/typings/group'
import { RoleId } from '@common/typings/user'

export const FirstName = () => {
  const value = useStore(editForm.$firstName)

  return (
    <Input label='Имя' value={value} onChange={(e) => editForm.firstNameChanged(e.target.value)} />
  )
}

export const LastName = () => {
  const value = useStore(editForm.$lastName)

  return (
    <Input
      label='Фамилия'
      value={value}
      onChange={(e) => editForm.lastNameChanged(e.target.value)}
    />
  )
}

export const Patronymic = () => {
  const value = useStore(editForm.$patronymic)

  return (
    <Input
      label='Отчество'
      value={value}
      onChange={(e) => editForm.patronymicChanged(e.target.value)}
    />
  )
}

export const Group = () => {
  const value = useStore(editForm.$selectedGroup)
  const groups = useStore(editForm.$groups)

  return (
    <Select
      label='Группа'
      value={value ?? ''}
      onChange={(e) => editForm.groupChanged(e.target.value as GroupId)}
    >
      {groups.map((group) => (
        <Item key={group.id} value={group.id}>
          {group.name}
        </Item>
      ))}
    </Select>
  )
}

export const Login = () => {
  const value = useStore(editForm.$login)

  return (
    <Input label='Логин' value={value} onChange={(e) => editForm.loginChanged(e.target.value)} />
  )
}

type PasswordProps = { disabled?: boolean }
export const Password = ({ disabled }: PasswordProps) => {
  const value = useStore(editForm.$password)

  return (
    <Input
      label='Пароль'
      value={value}
      type='password'
      onChange={(e) => editForm.passwordChanged(e.target.value)}
      disabled={disabled}
    />
  )
}

export const BookNumber = () => {
  const value = useStore(editForm.$bookNumber)

  return (
    <Input
      label='Номер зачетной книжки'
      value={value}
      onChange={(e) => editForm.bookNumberChanged(e.target.value)}
    />
  )
}

export const Role = () => {
  const value = useStore(editForm.$selectedRole)
  const roles = useStore(editForm.$roles)

  return (
    <Select
      label='Роль'
      value={value ?? ''}
      onChange={(e) => editForm.roleChanged(e.target.value as RoleId)}
    >
      {roles.map((role) => (
        <Item key={role.id} value={role.id}>
          {role.name}
        </Item>
      ))}
    </Select>
  )
}

type ChangePasswordProps = { value: boolean; onChange: () => void }
export const ChangePassword = ({ value, onChange }: ChangePasswordProps) => {
  return <CheckBox value={value} onChange={onChange} label='Задать новый пароль' />
}
