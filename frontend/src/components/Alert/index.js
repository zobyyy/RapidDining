import React from 'react'
import styles from './Alert.module.scss'
import Image from 'next/image'

export default function Alert({
  setIsAlert,
  title,
  context,
  status,
  yes,
  no,
  onClickHandle
}) {
  const handleClose = () => {
    setIsAlert(false)
    // window.location.reload()
  }
  return (
    <div className={styles.overlay}>
      <div className={styles.layouts}>
        <Image
          src={status === 'ok' ? '/failed.png' : '/notice.png'}
          width={67}
          height={67}
        />

        <div className={styles.title}>{title}</div>
        <div className={styles.context}>{context}</div>
        {status === 'ok' && (
          <button className={styles.OKbutton} onClick={handleClose}>
            OK
          </button>
        )}
        {status === 'option' && (
          <div className={styles.buttonGroup}>
            <button
              className={styles.buttonNo}
              onClick={onClickHandle}
              style={{ border: '1px solid #BDBDBD' }}
            >
              {no}
            </button>
            <button
              className={styles.buttonYes}
              onClick={handleClose}
              style={{ border: '1px solid #f58873', color: '#f58873' }}
            >
              {yes}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
