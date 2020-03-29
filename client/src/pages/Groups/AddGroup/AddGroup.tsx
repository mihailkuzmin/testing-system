import React from 'react'
import { PrimaryButton, SecondaryButton } from '../../../components/Buttons'
import { Input } from './Input'
import { closeAddModal } from '../model'
import styles from './AddGroup.module.css'

export const AddGroup = () => {
  return (
    <div className={styles.addGroup}>
      <h3>Добавить группу</h3>
      <form noValidate autoComplete='off'>
        <div className={styles.fields}>
          <Input name='name' label='Название' />
        </div>
      </form>
      <div className={styles.actions}>
        <PrimaryButton onClick={closeAddModal}>Добавить</PrimaryButton>
        <SecondaryButton onClick={closeAddModal}>Отменить</SecondaryButton>
      </div>
    </div>
  )
}
