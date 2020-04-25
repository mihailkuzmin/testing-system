import React from 'react'
import { PageProps } from '../../typings'
import styles from './Layout.module.css'

export const Layout = ({ children }: PageProps) => <div className={styles.layout}>{children}</div>
