import React from 'react'
import { useStore } from 'effector-react'
import {
  PrimaryButton as Add,
  SecondaryButton as Cancel,
} from '../../../../components/Buttons'
import { MappedSelect, Item } from '../../../../components/Inputs/MappedSelect'
import { MappedInput } from '../../../../components/Inputs'
import { Linear } from '../../../../components/Loaders'
import { AddForm, Group } from '../../model/addForm/typings'
import { addForm, addModal } from '../../model'
import { Status } from '../../../../typings'
import styles from './AddUser.module.css'

type AddUserProps = {
  groups?: Group[]
}

export const AddUser = ({ groups }: AddUserProps) => {
  const createUserStatus = useStore(addForm.$createUserStatus)
  const isPending = createUserStatus === Status.Pending

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addForm.createUser()
  }

  return (
    <div className={styles.addUser}>
      <form onSubmit={onSubmit} noValidate autoComplete='off'>
        <h3 className={styles.title}>Добавить пользователя</h3>
        <div className={styles.fields}>
          <MappedInput<AddForm>
            name='lastName'
            label='Фамилия'
            store={addForm.$addForm}
            onChange={addForm.fieldValueChange}
          />
          <MappedInput<AddForm>
            name='firstName'
            label='Имя'
            store={addForm.$addForm}
            onChange={addForm.fieldValueChange}
          />
          <MappedInput<AddForm>
            name='patronymic'
            label='Отчество'
            store={addForm.$addForm}
            onChange={addForm.fieldValueChange}
          />
          <MappedSelect<AddForm>
            name='group'
            label='Группа'
            store={addForm.$addForm}
            onChange={addForm.fieldValueChange}
          >
            {groups?.map(({ id, name }) => (
              <Item key={id} value={id}>
                {name}
              </Item>
            ))}
          </MappedSelect>
          <MappedInput<AddForm>
            name='login'
            label='Логин'
            store={addForm.$addForm}
            onChange={addForm.fieldValueChange}
          />
          <MappedInput<AddForm>
            name='password'
            label='Пароль'
            store={addForm.$addForm}
            onChange={addForm.fieldValueChange}
            type='password'
          />
          <MappedInput<AddForm>
            name='bookNumber'
            label='Номер зачетной книжки'
            store={addForm.$addForm}
            onChange={addForm.fieldValueChange}
          />
        </div>
        {isPending ? (
          <div className={styles.loader}>
            <Linear />
          </div>
        ) : (
          <div className={styles.actions}>
            <Add type='submit'>Добавить</Add>
            <Cancel onClick={addModal.closeAddModal}>Отмена</Cancel>
          </div>
        )}
      </form>
    </div>
  )
}
