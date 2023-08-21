import Layouts from '../../components/Layouts'
import styles from './OrderSubmit.module.scss'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import { NativeSelect } from '@mui/material'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

export default function OrderSubmit({ order }) {
  const orderId = Cookies.get('orderId')
  const router = useRouter()
  return (
    <main>
      <Layouts>
        <div className={styles.devide}></div>
        <div className={styles.info}>
          <div style={{ marginBottom: '12%' }}>
            <img src='/收到確認.png' alt='' />
          </div>
          <p className={styles.text}>已收到您的訂單</p>
          <div className={styles.orderNumber}>
            <p className={styles.text}>訂單編號：</p>
            <p style={{ color: '#F58873' }}>{orderId}</p>
          </div>
          <p style={{ color: '#959595', fontSize: '16px', fontWeight: '400' }}>
            到店時，請告知店員訂單編號
          </p>
        </div>
        <button
          type='button'
          className={styles.submit}
          onClick={() => router.push('/')}
        >
          完成
        </button>
      </Layouts>
    </main>
  )
}
