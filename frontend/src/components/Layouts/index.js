import React from 'react'
import styles from './Layouts.module.scss'

export default function Layouts({ children }) {
  return <div className={styles.layouts}>{children}</div>
}
