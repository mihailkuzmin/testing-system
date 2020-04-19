import React from 'react'
import styles from './Navigation.module.css'

interface ItemProps {
  children?: React.ReactNode
}

interface ListProps {
  children?: React.ReactNode
}

interface NavigationProps {
  children?: React.ReactNode
}

const Item = ({ children }: ItemProps) => (
  <li className={styles.item}>{children}</li>
)

const List = ({ children }: ListProps) => (
  <ul className={styles.list}>{children}</ul>
)

export const Navigation = ({ children }: NavigationProps) => (
  <List>
    {React.Children.map(children, (link) => (
      <Item>{link}</Item>
    ))}
  </List>
)
