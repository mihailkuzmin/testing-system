import React from 'react'
import { useStore } from 'effector-react'
import Accordion from '@material-ui/core/ExpansionPanel'
import AccordionSummary from '@material-ui/core/ExpansionPanelSummary'
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Circular } from '@components/Loaders'
import { report } from '@pages/Report/model'
import { Work, WorkId } from '@common/typings/work'
import styles from './styles.module.css'
import { UserListItem } from '@pages/Report/User'

type WorkListItemProps = Work & {
  onExpand?: () => void
}

export const WorkListItem = (props: WorkListItemProps) => {
  const users = useStore(report.users.$users)
  const isLoading = useStore(report.users.$isLoading)
  const selectedWorkId = useStore(report.$selectedWork)

  const onChange = (work: WorkId) => (_: React.ChangeEvent<{}>, isExpanded: boolean) => {
    report.users.cancelLoadUsers()

    if (isExpanded) {
      report.users.loadUsers(work)
    }
  }

  return (
    <Accordion
      expanded={selectedWorkId === props.id}
      TransitionProps={{ unmountOnExit: true }}
      onChange={onChange(props.id)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>{props.name}</AccordionSummary>
      <AccordionDetails>
        {isLoading ? (
          <div className={styles.loader}>
            <Circular />
          </div>
        ) : (
          <div className={styles.panelContent}>
            {users.map((u) => (
              <UserListItem key={u.id} {...u} />
            ))}
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  )
}
