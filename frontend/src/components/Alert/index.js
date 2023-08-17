import React from 'react'
import styles from './Alert.module.scss'
import Image from 'next/image'

export default function Alert() {
  return (
    <div className={styles.overlay}>
      <div className={styles.layouts}>
        <Image src='/failed.png' width={67} height={67} />
        <div className={styles.title}>訂位失敗</div>
        <div className={styles.context}>您已預訂過此餐廳</div>
      </div>
    </div>
  )
}
