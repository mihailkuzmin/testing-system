import React from 'react'
import { Select, MenuItem } from '@material-ui/core'
import styles from './LinksGroup.module.css'

interface ILinksGroupProps {
  placeholder: string
  children?: React.ReactNode
}

export const LinksGroup = ({ placeholder, children }: ILinksGroupProps) => {
  return (
    <Select className={styles.select} value={placeholder}>
      <MenuItem value={placeholder} disabled>
        {placeholder}
      </MenuItem>
      {React.Children.map(children, (link) => (
        <MenuItem className={styles.menuItem}>{link}</MenuItem>
      ))}
    </Select>
  )
}
