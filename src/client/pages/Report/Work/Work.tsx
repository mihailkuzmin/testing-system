import React from 'react'
import { useStore } from 'effector-react'
import { Card, Divider } from '@components'
import { Circular } from '@components/Loaders'
import { IconButton } from '@material-ui/core'
import { ExpandMore, ExpandLess } from '@material-ui/icons'
import { report } from '@pages/Report/model'
import { Group } from './Group'
import styles from './styles.module.css'

type WorkProps = {
  number: number
  name: string
  selected: boolean
  onOpen: () => void
  onClose: () => void
}

export const Work = (props: WorkProps) => {
  const { groups, selectedGroupId, isLoading } = useStore(report.groups.$groups)

  return (
    <Card className={styles.work}>
      <div className={styles.header}>
        <div>{props.number}.</div>
        <div>{props.name}</div>
        {props.selected ? (
          <IconButton onClick={props.onClose}>
            <ExpandLess />
          </IconButton>
        ) : (
          <IconButton onClick={props.onOpen}>
            <ExpandMore />
          </IconButton>
        )}
      </div>
      {props.selected && (
        <div className={styles.groupList}>
          <Divider />
          <div className={styles.groups}>
            <span>Выберите группу:</span>
            {isLoading ? (
              <div className={styles.loader}>
                <Circular />
              </div>
            ) : (
              <div className={styles.list}>
                {groups.map((g, index) => (
                  <Group
                    key={g.id}
                    number={index + 1}
                    name={g.name}
                    selected={g.id === selectedGroupId}
                    onOpen={() => report.groups.selectGroup(g.id)}
                    onClose={() => report.groups.unselectGroup()}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  )
}
