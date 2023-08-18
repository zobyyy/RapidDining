import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from './Booking.module.scss'
import Link from 'next/link'
import { Field, ErrorMessage } from 'formik'
import Image from 'next/image'
import Menu from './Menu'
import Cookies from 'js-cookie'

// 假資料
const storeIntro =
  '歡迎來到「AppWorks」！\n我們是一家充滿綠意的小森林咖啡廳，提供有機、精選食材的義大利麵、三明治、沙拉等美味簡餐。\n在繁忙的城市中，我們是您的綠洲，讓您感受大自然的美好與品味。'
const OrderFood = ({ menuInfo }) => {
  const router = useRouter()
  const { id } = router.query
  const [chooseOrderPosition, setChooseOrderPosition] = useState(true)
  const [productChosen, setProductChosen] = useState({})
  const [isEatHere, setIsEatHere] = useState(false)
  if (Cookies.get('isReserved')) {
    if (Cookies.get('isReserved').includes(id)) {
      setIsEatHere(true)
    } else {
      setIsEatHere(false)
    }
  }
  useEffect(() => {
    const isChooseOrderPosition = Cookies.get('chooseOrderPosition')
    if (isChooseOrderPosition === 'false') {
      setChooseOrderPosition(false)
    }
    const productChosenCookie = Cookies.get('productChosen')
    if (productChosenCookie) {
      const parsedProductChosen = JSON.parse(productChosenCookie)
      setProductChosen(parsedProductChosen)
    }
  }, [])
  return (
    <div className={styles.order}>
      <div className={styles.storeIntro}>{storeIntro}</div>

      <div className={styles.orderFoodEatWhere}>
        {isEatHere ? '內用餐點' : '外帶自取'}
        {/* 如果沒有訂位，則是外帶自取。怎麼判斷沒有訂位呢? */}
      </div>

      <Menu menuInfo={menuInfo} />
      {Object.keys(productChosen).length > 0 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center'
          }}
        >
          <button
            className={styles.cartButton}
            onClick={() => router.push('/Cart')}
          >
            <div className={styles.cartButtonText}>1</div>
            購物車
            <div className={styles.cartButtonPrice}>NT$100</div>
          </button>
        </div>
      )}
    </div>
  )
}

export default OrderFood
