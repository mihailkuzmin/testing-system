import React from 'react'
import { PrimaryButton, SecondaryButton } from '../../../components/Buttons'
import { MappedInput } from '../../../components/Inputs'
import { $addForm, closeAddModal, fieldValueChange } from '../model'
import { AddForm } from '../model/typings'
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
            store={$addForm}
            onChange={fieldValueChange}
          />
        </div>
      </form>
      <div className={styles.actions}>
        <PrimaryButton onClick={closeAddModal}>Добавить</PrimaryButton>
        <SecondaryButton onClick={closeAddModal}>Отменить</SecondaryButton>
      </div>
    </div>
  )
}
