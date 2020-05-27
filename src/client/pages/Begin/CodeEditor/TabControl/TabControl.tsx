import React from 'react'
import { useStore } from 'effector-react'
import { Tabs, Tab } from '@material-ui/core'
import { workspace } from '../../model'

export const TabControl = () => {
  const { tab } = useStore(workspace.$codeEditor)

  return (
    <div>
      <Tabs
        value={tab}
        indicatorColor='primary'
        textColor='primary'
        onChange={(e: React.ChangeEvent<{}>, newValue: number) => workspace.tabChanged(newValue)}
      >
        <Tab label='Редактор' />
        <Tab label='Консоль' />
      </Tabs>
    </div>
  )
}
