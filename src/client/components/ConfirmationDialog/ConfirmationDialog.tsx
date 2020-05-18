import React from 'react'
import { PrimaryButton as Confirm, SecondaryButton as Cancel } from '../Buttons'
import { Modal } from '../Modal'
import styles from './ConfirmationDialog.module.css'

type ConfirmationDialogProps = {
  open: boolean
  onConfirm?: () => void
  onCancel: () => void
  title: string
  cancelIsNotNegative?: boolean
  confirmText?: string
  cancelText?: string
  children?: React.ReactNode
}

export const ConfirmationDialog = (props: ConfirmationDialogProps) => (
  <Modal open={props.open} onClose={props.onCancel}>
    <div className={styles.dialog}>
      <h3>{props.title}</h3>
      <div className={styles.content}>{props.children}</div>
      <div className={styles.actions}>
        {props.onConfirm && (
          <Confirm onClick={props.onConfirm}>{props.confirmText ?? 'Подтвердить'}</Confirm>
        )}
        {props.cancelIsNotNegative ? (
          <Confirm onClick={props.onCancel}>{props.cancelText ?? 'Отмена'}</Confirm>
        ) : (
          <Cancel onClick={props.onCancel}>{props.cancelText ?? 'Отмена'}</Cancel>
        )}
      </div>
    </div>
  </Modal>
)
