import React from 'react'
import { useStore } from 'effector-react'
import { Select, Item } from '@components/Inputs/Select'
import { PLangId } from '@common/typings/task'
import { workspace } from '../../model'
import styles from './LangSelect.module.css'

type LangSelectProps = { disabled?: boolean }

export const LangSelect = ({ disabled }: LangSelectProps) => {
  const { langs, selected } = useStore(workspace.$langs)

  return (
    <Select
      autoWidth
      disabled={disabled}
      className={styles.select}
      value={selected ?? ''}
      onChange={(e) => workspace.langChanged(e.target.value as PLangId)}
      variant='standard'
    >
      {langs.map((lang) => (
        <Item key={lang.id} value={lang.id}>
          {lang.name}
        </Item>
      ))}
    </Select>
  )
}
