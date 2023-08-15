import React, { useRef, useEffect, useState } from 'react'
import * as Yup from 'yup'
import styles from './Booking.module.scss'
import Layouts from '@/components/Layouts'
import { Field, ErrorMessage } from 'formik'
import Image from 'next/image'
import Cookies from 'js-cookie'
import OrderPosition from './OrderPosition'
import OrderFood from './OrderFood'

export default function Booking() {
  // const myObject = { 1: 2, 2: 2, 3: 2 }
  // Cookies.set('tableId', JSON.stringify(myObject))
  // console.log('hi', Cookies.get('tableId'))
  const [chooseOrderPosition, setChooseOrderPosition] = useState(true)

  const handleChooseButtonOnclick = () => {
    setChooseOrderPosition(!chooseOrderPosition)
  }
  return (
    <Layouts>
      <div style={{ width: '100%' }}>
        <Image src='/餐廳照片.png' width={390} height={220}></Image>
        <div className={styles.storeInfo}>
          <div className={styles.storeName}>AppWorks咖啡廳</div>
          <div className={styles.storeAddress}>
            中正區仁愛路二段99號9樓, Taipei, Taiwan
          </div>
          <div className={styles.storePhone}>02 1234 5678 </div>
        </div>
        <div className={styles.orderChoose}>
          <button
            style={{
              borderBottom: !chooseOrderPosition && '8px solid #F5F5F5'
            }}
            onClick={handleChooseButtonOnclick}
          >
            我要訂位
          </button>
          <button
            style={{
              borderBottom: chooseOrderPosition && '8px solid #F5F5F5'
            }}
            onClick={handleChooseButtonOnclick}
          >
            我要訂餐
          </button>
        </div>
        {chooseOrderPosition ? (
          <OrderPosition
            handleChooseButtonOnclick={handleChooseButtonOnclick}
          />
        ) : (
          <OrderFood />
        )}
      </div>
    </Layouts>
  )
}
