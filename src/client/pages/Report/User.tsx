import React from 'react'
import { useStore } from 'effector-react'
import Accordion from '@material-ui/core/ExpansionPanel'
import AccordionSummary from '@material-ui/core/ExpansionPanelSummary'
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Circular } from '@components/Loaders'
import { report } from '@pages/Report/model'
import { User } from '@common/typings/user'
import styles from './styles.module.css'

type UserListItemProps = User

export const UserListItem = (props: UserListItemProps) => {
  const isLoading = false
  // const onChange = (work: WorkId) => (_: React.ChangeEvent<{}>, isExpanded: boolean) => {
  //   report.users.cancelLoadUsers()
  //
  //   if (isExpanded) {
  //     report.users.loadUsers(work)
  //   }
  // }

  return (
    <Accordion TransitionProps={{ unmountOnExit: true }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>{props.firstName}</AccordionSummary>
      <AccordionDetails>
        {isLoading ? (
          <div className={styles.loader}>
            <Circular />
          </div>
        ) : (
          <div>Кек</div>
        )}
      </AccordionDetails>
    </Accordion>
  )
}
