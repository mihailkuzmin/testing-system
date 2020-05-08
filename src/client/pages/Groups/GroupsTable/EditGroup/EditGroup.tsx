import React from 'react'
import { useStore } from 'effector-react'
import { PrimaryButton as Save, SecondaryButton as Cancel } from '@components/Buttons'
import { MappedInput } from '@components/Inputs'
import { Linear, Circular } from '@components/Loaders'
import { EditForm } from '../../model/editForm/typings'
import { editForm, editModal } from '../../model'
import { Status } from '@typings'
import styles from './EditGroup.module.css'

export const EditGroup = () => {
  const editGroupStatus = useStore(editForm.$editGroupStatus)
  const getGroupStatus = useStore(editForm.$getGroupStatus)

  const editIsPending = editGroupStatus === Status.Pending
  const loadIsPending = getGroupStatus === Status.Pending

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    editForm.editGroup()
  }

  return (
    <div className={styles.editGroup}>
      <form onSubmit={onSubmit} noValidate autoComplete='off'>
        <h3 className={styles.title}>Редактировать группу</h3>
        <div className={styles.fields}>
          {loadIsPending && (
            <div className={styles.loadingOverlay}>
              <Circular />
              <span>Загружаем данные</span>
            </div>
          )}
          <MappedInput<EditForm>
            name='name'
            label='Название'
            store={editForm.$editForm}
            onChange={editForm.fieldValueChange}
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
