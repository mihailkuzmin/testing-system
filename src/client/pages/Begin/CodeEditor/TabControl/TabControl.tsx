import React from 'react'
import { useStore } from 'effector-react'
import { Tabs, Tab } from '@components/Tabs'
import { workspace } from '../../model'

type TabControlProps = { disabled?: boolean }

export const TabControl = ({ disabled }: TabControlProps) => {
  const { tab } = useStore(workspace.$codeEditor)

  return (
    <div>
      <Tabs
        value={tab}
        indicatorColor='primary'
        textColor='primary'
        onChange={(e: React.ChangeEvent<{}>, newValue: number) => workspace.tabChanged(newValue)}
      >
        <Tab disabled={disabled} label='Редактор' />
        <Tab disabled={disabled} label='Консоль' />
      </Tabs>
    </div>
  )
}
