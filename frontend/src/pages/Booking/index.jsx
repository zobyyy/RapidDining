import React, { useRef, useEffect, useState } from 'react'
import * as Yup from 'yup'
import styles from './Booking.module.scss'
import Layouts from '@/components/Layouts'
import { Field, ErrorMessage } from 'formik'
import BookingInfo from '@/pages/Booking/BookingInfo'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function Booking() {
  return (
    <main className={inter.className}>
      <Layouts>
        <div className={styles.storeInfo}>
          <div className={styles.storeName}>AppWorks咖啡廳</div>
          <div className={styles.storeAddress}>
            中正區仁愛路二段99號9樓, Taipei, Taiwan
          </div>
          <div className={styles.storePhone}>02 1234 5678 </div>
        </div>
        <div className={styles.orderChoose}>
          <button>我要訂位</button>
          <button>我要訂餐</button>
        </div>
        <div className={styles.orderInfo}>
          <BookingInfo />
        </div>
      </Layouts>
    </main>
  )
}
