import React from 'react'
import { useStore } from 'effector-react'
import { PrimaryButton as Add, SecondaryButton as Cancel } from '@components/Buttons'
import { MappedInput } from '@components/Inputs'
import { Linear } from '@components/Loaders'
import { Status } from '@typings'
import { addForm, addModal } from '../../model'
import { AddForm } from '../../model/typings'
import styles from './AddGroup.module.css'

export const AddGroup = () => {
  const createGroupStatus = useStore(addForm.$createGroupStatus)
  const isPending = createGroupStatus === Status.Pending

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addForm.createGroup()
  }

  return (
    <div className={styles.addGroup}>
      <form onSubmit={onSubmit} noValidate autoComplete='off'>
        <h3 className={styles.title}>Добавить группу</h3>
        <div className={styles.fields}>
          <MappedInput<AddForm>
            name='name'
            label='Название'
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
            <Add type='submit' onClick={() => addForm.createGroup()}>
              Добавить
            </Add>
            <Cancel onClick={() => addModal.closeAddModal()}>Отменить</Cancel>
          </div>
        )}
      </form>
    </div>
  )
}
