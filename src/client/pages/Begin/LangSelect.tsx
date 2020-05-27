import React from 'react'
import { useStore } from 'effector-react'
import { Select, Item } from '@components/Inputs/Select'
import { PLangId } from '@common/typings/task'
import { workspace } from './model'

export const LangSelect = () => {
  const { langs, selected } = useStore(workspace.$langs)

  return (
    <Select
      value={selected ?? ''}
      onChange={(e) => workspace.langChanged(e.target.value as PLangId)}
      label='Язык'
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
