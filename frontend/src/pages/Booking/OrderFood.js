import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from './Booking.module.scss'
import Menu from './Menu'
import Cookies from 'js-cookie'

const OrderFood = ({ menuInfo, profileData, isEatHere }) => {
  const router = useRouter()
  const { id } = router.query
  const [chooseOrderPosition, setChooseOrderPosition] = useState(true)
  const [productChosen, setProductChosen] = useState({})

  useEffect(() => {
    const isChooseOrderPosition = Cookies.get('chooseOrderPosition')
    if (isChooseOrderPosition === 'false') {
      //判斷訂位了嗎
      setChooseOrderPosition(false)
    }
    const productChosenCookie = Cookies.get('allProductChosen')
    if (productChosenCookie && !Object.keys(productChosen).length) {
      // const parsedProductChosen = JSON.parse(productChosenCookie)
      const parsedProductChosen = productChosenCookie
      setProductChosen(parsedProductChosen)
    }
  }, [chooseOrderPosition, productChosen])
  return (
    <div className={styles.order}>
      <div className={styles.storeIntro}>{profileData?.data?.name}</div>

      <div className={styles.orderFoodEatWhere}>
        {isEatHere ? '內用餐點' : '外帶自取'}
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
