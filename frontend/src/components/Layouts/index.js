import React from 'react'
import styles from './Layouts.module.scss'

export default function Layouts({ children, scrollBarHidden }) {
    return <div className={scrollBarHidden ? styles.layoutsHidden : styles.layouts}>{children}</div>
}
