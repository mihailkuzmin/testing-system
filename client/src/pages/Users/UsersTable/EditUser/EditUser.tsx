import React from 'react'
import { useStore } from 'effector-react'
import {
  PrimaryButton as Save,
  SecondaryButton as Cancel,
} from '../../../../components/Buttons'
import { MappedSelect, Item } from '../../../../components/MappedSelect'
import { Linear } from '../../../../components/Loaders'
import { MappedInput } from '../../../../components'
import { EditForm, Group } from '../../model/editForm/typings'
import { editForm, editModal } from '../../model'
import { Status } from '../../../../typings'
import styles from './EditUser.module.css'

interface IEditUserProps {
  groups?: Group[]
}

export const EditUser = ({ groups }: IEditUserProps) => {
  const editUserStatus = useStore(editForm.$editUserStatus)
  const isPending = editUserStatus === Status.Pending

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('edit form submit')
  }

  return (
    <div className={styles.addUser}>
      <form onSubmit={onSubmit} noValidate autoComplete='off'>
        <h3 className={styles.title}>Редактировать пользователя</h3>
        <div className={styles.fields}>
          <MappedInput<EditForm>
            name='lastName'
            label='Фамилия'
            store={editForm.$editForm}
            onChange={editForm.fieldValueChange}
          />
          <MappedInput<EditForm>
            name='firstName'
            label='Имя'
            store={editForm.$editForm}
            onChange={editForm.fieldValueChange}
          />
          <MappedInput<EditForm>
            name='patronymic'
            label='Отчество'
            store={editForm.$editForm}
            onChange={editForm.fieldValueChange}
          />
          <MappedSelect<EditForm>
            name='group'
            label='Группа'
            store={editForm.$editForm}
            onChange={editForm.fieldValueChange}
          >
            {groups?.map(({ id, name }) => (
              <Item key={id} value={id}>
                {name}
              </Item>
            ))}
          </MappedSelect>
          <MappedInput<EditForm>
            name='login'
            label='Логин'
            store={editForm.$editForm}
            onChange={editForm.fieldValueChange}
          />
          <MappedInput<EditForm>
            name='password'
            label='Пароль'
            store={editForm.$editForm}
            onChange={editForm.fieldValueChange}
            type='password'
          />
          <MappedInput<EditForm>
            name='bookNumber'
            label='Номер зачетной книжки'
            store={editForm.$editForm}
            onChange={editForm.fieldValueChange}
          />
        </div>
        {isPending ? (
          <div className={styles.loader}>
            <Linear />
          </div>
        ) : (
          <div className={styles.actions}>
            <Save type='submit'>Сохранить</Save>
            <Cancel onClick={editModal.closeEditModal}>Отмена</Cancel>
          </div>
        )}
      </form>
    </div>
  )
}
