import React from 'react'
import {
  PrimaryButton as Add,
  SecondaryButton as Cancel,
} from '../../../../components/Buttons'
import { MappedInput } from '../../../../components/Inputs'
import { addForm, addModal } from '../../model'
import { AddForm } from '../../model/typings'
import styles from './AddGroup.module.css'

export const AddGroup = () => {
  return (
    <div className={styles.addGroup}>
      <h3>Добавить группу</h3>
      <form noValidate autoComplete='off'>
        <div className={styles.fields}>
          <MappedInput<AddForm>
            name='name'
            label='Название'
            store={addForm.$addForm}
            onChange={addForm.fieldValueChange}
          />
        </div>
      </form>
      <div className={styles.actions}>
        <Add onClick={addModal.closeAddModal}>Добавить</Add>
        <Cancel onClick={addModal.closeAddModal}>Отменить</Cancel>
      </div>
    </div>
  )
}
