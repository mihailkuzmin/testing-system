import React from 'react'
import { useStore } from 'effector-react'
import { Card } from '@components'
import { $selectedTask } from '@pages/Begin/model'

export const SelectedTask = () => {
  const selected = useStore($selectedTask)

  return (
    <Card>
      <div dangerouslySetInnerHTML={{ __html: selected?.description ?? '' }} />
    </Card>
  )
}
