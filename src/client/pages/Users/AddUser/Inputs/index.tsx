import React from 'react'
import { useStore } from 'effector-react'
import { addForm } from '@pages/Users/model/addUser'
import { Input } from '@components/Inputs'
import { Item, Select } from '@components/Inputs/Select'
import { GroupId } from '@common/typings/group'
import { RoleId } from '@common/typings/student'

export const FirstName = () => {
  const value = useStore(addForm.$firstName)

  return (
    <Input label='Имя' value={value} onChange={(e) => addForm.firstNameChanged(e.target.value)} />
  )
}

export const LastName = () => {
  const value = useStore(addForm.$lastName)

  return (
    <Input
      label='Фамилия'
      value={value}
      onChange={(e) => addForm.lastNameChanged(e.target.value)}
    />
  )
}

export const Patronymic = () => {
  const value = useStore(addForm.$patronymic)

  return (
    <Input
      label='Отчество'
      value={value}
      onChange={(e) => addForm.patronymicChanged(e.target.value)}
    />
  )
}

export const Group = () => {
  const value = useStore(addForm.$selectedGroup)
  const groups = useStore(addForm.$groups)

  return (
    <Select
      label='Группа'
      value={value ?? ''}
      onChange={(e) => addForm.groupChanged(e.target.value as GroupId)}
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
  const value = useStore(addForm.$login)

  return (
    <Input label='Логин' value={value} onChange={(e) => addForm.loginChanged(e.target.value)} />
  )
}

export const Password = () => {
  const value = useStore(addForm.$password)

  return (
    <Input
      label='Пароль'
      value={value}
      type='password'
      onChange={(e) => addForm.passwordChanged(e.target.value)}
    />
  )
}

export const BookNumber = () => {
  const value = useStore(addForm.$bookNumber)

  return (
    <Input
      label='Номер зачетной книжки'
      value={value}
      onChange={(e) => addForm.bookNumberChanged(e.target.value)}
    />
  )
}

export const Role = () => {
  const value = useStore(addForm.$selectedRole)
  const roles = useStore(addForm.$roles)

  return (
    <Select
      label='Роль'
      value={value ?? ''}
      onChange={(e) => addForm.roleChanged(e.target.value as RoleId)}
    >
      {roles.map((role) => (
        <Item key={role.id} value={role.id}>
          {role.name}
        </Item>
      ))}
    </Select>
  )
}
