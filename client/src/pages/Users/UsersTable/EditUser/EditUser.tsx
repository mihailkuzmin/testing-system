import React from 'react'
import { useStore, useStoreMap } from 'effector-react'
import { PrimaryButton as Save, SecondaryButton as Cancel } from '../../../../components/Buttons'
import { MappedSelect, Item } from '../../../../components/Inputs/MappedSelect'
import { MappedInput, CheckBox } from '../../../../components/Inputs'
import { Linear, Circular } from '../../../../components/Loaders'
import { EditForm, Group } from '../../model/editForm/typings'
import { editForm, editModal } from '../../model'
import { Status } from '../../../../typings'
import styles from './EditUser.module.css'

interface IEditUserProps {
  groups?: Group[]
}

export const EditUser = ({ groups }: IEditUserProps) => {
  const editUserStatus = useStore(editForm.$editUserStatus)
  const getUserStatus = useStore(editForm.$getUserStatus)

  const editIsPending = editUserStatus === Status.Pending
  const loadIsPending = getUserStatus === Status.Pending

  const changePassword = useStoreMap({
    store: editForm.$editForm,
    keys: ['changePassword'],
    fn: (values) => values['changePassword'],
  })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    editForm.editUser()
  }

  return (
    <div className={styles.editUser}>
      <form onSubmit={onSubmit} noValidate autoComplete='off'>
        <h3 className={styles.title}>Редактировать пользователя</h3>
        <div className={styles.fields}>
          {loadIsPending && (
            <div className={styles.loadingOverlay}>
              <Circular />
              <span>Загружаем данные</span>
            </div>
          )}
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
            disabled={!changePassword}
          />
          <MappedInput<EditForm>
            name='bookNumber'
            label='Номер зачетной книжки'
            store={editForm.$editForm}
            onChange={editForm.fieldValueChange}
          />
          <CheckBox
            name='changePassword'
            label='Задать новый пароль'
            onChange={editForm.fieldValueChange}
            value={changePassword}
          />
        </div>
        {editIsPending ? (
          <div className={styles.loader}>
            <Linear />
          </div>
        ) : (
          <div className={styles.actions}>
            <Save disabled={loadIsPending} type='submit'>
              Сохранить
            </Save>
            <Cancel onClick={editModal.closeEditModal}>Отмена</Cancel>
          </div>
        )}
      </form>
    </div>
  )
}
