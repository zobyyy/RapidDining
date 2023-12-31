import React, { useEffect, useRef, useState } from 'react'
import styles from './Layouts.module.scss'

export default function Layouts({ children }) {
    return <div className={styles.layouts}>
        {children}
    </div>
}
