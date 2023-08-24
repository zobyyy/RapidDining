import React, { useState, useEffect } from 'react'
import CheckoutProvider from '@/pages/Checkout/CheckoutContext'
import styles from './Layouts.module.scss'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

export default function Layouts({
  children,
  chooseOrderPosition,
  setChooseOrderPosition
}) {
  const [productChosen, setProductChosen] = useState({})
  // const [chooseOrderPosition, setChooseOrderPosition] = useState(true)
  const [cartQuantity, setCartQuantity] = useState(0)
  const [cartTotalPrice, setCartTotalPrice] = useState(0)
  const router = useRouter()
  const isBookingPage = router.pathname.includes('/Booking/')
  useEffect(() => {
    // const isChooseOrderPosition = Cookies.get('chooseOrderPosition')
    // if (isChooseOrderPosition === 'false') {
    //   //判斷訂位了嗎
    //   setChooseOrderPosition(false)
    // }
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
    <CheckoutProvider>
      <div className={styles.layouts}>
        {children}
        {chooseOrderPosition === false &&
          isBookingPage &&
          Object.keys(productChosen).length > 0 &&
          cartTotalPrice > 0 && (
            <button
              className={styles.cartButton}
              onClick={() => router.push('/Cart')}
            >
              <div className={styles.cartButtonText}>{cartQuantity}</div>
              購物車
              <div className={styles.cartButtonPrice}>NT${cartTotalPrice}</div>
            </button>
          )}
      </div>
    </CheckoutProvider>
  )
}
