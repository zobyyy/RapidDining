import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styles from './Booking.module.scss'
import Link from 'next/link'
import { Field, ErrorMessage } from 'formik'
import Image from 'next/image'
import Menu from './Menu'

// 假資料
const storeIntro =
  '歡迎來到「AppWorks」！\n我們是一家充滿綠意的小森林咖啡廳，提供有機、精選食材的義大利麵、三明治、沙拉等美味簡餐。\n在繁忙的城市中，我們是您的綠洲，讓您感受大自然的美好與品味。'
const OrderFood = () => {
  const [isEatHere, setIsEatHere] = useState(true)

  return (
    <div className={styles.order}>
      <div className={styles.storeIntro}>{storeIntro}</div>

      <div className={styles.orderFoodEatWhere}>
        {isEatHere ? '內用餐點' : '外帶自取'}
        {/* 如果沒有訂位，則是外帶自取。怎麼判斷沒有訂位呢? */}
      </div>

      <Menu />
    </div>
  )
}

export default OrderFood
