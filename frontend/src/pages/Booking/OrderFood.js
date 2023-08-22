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
  const [cartQuantity, setCartQuantity] = useState(0)
  const [cartTotalPrice, setCartTotalPrice] = useState(0)

  useEffect(() => {
    const isChooseOrderPosition = Cookies.get('chooseOrderPosition')
    if (isChooseOrderPosition === 'false') {
      //判斷訂位了嗎
      setChooseOrderPosition(false)
    }
    const productChosenCookie = Cookies.get('allProductChosen')
    if (productChosenCookie && !Object.keys(productChosen).length) {
      const parsedProductChosen = JSON.parse(productChosenCookie)
      setProductChosen(parsedProductChosen)
      calculateCartInfo(parsedProductChosen)
    }
  }, [chooseOrderPosition, productChosen])

  const calculateCartInfo = (chosenProducts) => {
    let quantity = 0
    let totalPrice = 0

    chosenProducts.forEach((product) => {
      quantity += product.quantity
      totalPrice += product.price * product.quantity
    })

    setCartQuantity(quantity)
    setCartTotalPrice(totalPrice)
  }

  return (
    <div className={styles.order}>
      <div className={styles.storeIntro}>{profileData?.data?.description}</div>

      <div className={styles.orderFoodEatWhere}>
        {isEatHere ? '內用餐點' : '外帶自取'}
      </div>

      <Menu menuInfo={menuInfo} profileData={profileData} />
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
            <div className={styles.cartButtonText}>{cartQuantity}</div>
            購物車
            <div className={styles.cartButtonPrice}>NT${cartTotalPrice}</div>
          </button>
        </div>
      )}
    </div>
  )
}

export default OrderFood
