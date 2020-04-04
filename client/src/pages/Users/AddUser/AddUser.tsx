import React from 'react'
import { useStore } from 'effector-react'
import { PrimaryButton, SecondaryButton } from '../../../components/Buttons'
import { MappedSelect, Item } from '../../../components/MappedSelect'
import { MappedInput } from '../../../components'
import { Linear } from '../../../components/Loaders'
import { AddForm } from '../model/addForm/typings'
import { addForm, addModal } from '../model'
import { Status } from '../../../typings'
import { SelectLabel as SLabel } from './typings'
import styles from './AddUser.module.css'

export const AddUser = () => {
  const groups = useStore(addForm.$groups)
  const createUserStatus = useStore(addForm.$createUserStatus)
  const selectStatus = useStore(addForm.$getAllGroupsStatus)

  const actionsAreHidden = createUserStatus === Status.Pending
  const selectDisabled = [Status.Pending, Status.Fail].includes(selectStatus)
  const addButtonDisabled = selectDisabled
  const selectLabel = [SLabel.Done, SLabel.Fail, SLabel.Pending][selectStatus]

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
            label={selectLabel}
            store={addForm.$addForm}
            onChange={addForm.fieldValueChange}
            disabled={selectDisabled}
          >
            {groups.map(({ id, name }) => (
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
            name='bookNumber'
            label='Номер зачетной книжки'
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
        </div>
        {actionsAreHidden ? (
          <div className={styles.loader}>
            <Linear />
          </div>
        ) : (
          <div className={styles.actions}>
            <PrimaryButton type='submit' disabled={addButtonDisabled}>
              Добавить
            </PrimaryButton>
            <SecondaryButton onClick={addModal.closeAddModal}>
              Отменить
            </SecondaryButton>
          </div>
        )}
      </form>
    </div>
  )
}
