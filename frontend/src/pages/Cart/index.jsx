import React, { useRef, useEffect, useState } from 'react'
import styles from './Cart.module.scss'
import Layouts from '@/components/Layouts'
import Image from 'next/image'
import Cookies from 'js-cookie'
import ProductColumn from './ProductColumn'
import { useRouter } from 'next/router'

const productChosenString = Cookies.get('productChosen')
const productChosen = productChosenString
  ? JSON.parse(productChosenString)
  : null

export default function Cart() {
  Cookies.set('chooseOrderPosition', false)
  const router = useRouter()
  const [number, setNumber] = useState(1)
  const [productChosen, setProductChosen] = useState(null)

  useEffect(() => {
    const productChosenString = Cookies.get('productChosen')
    if (productChosenString) {
      const parsedProductChosen = JSON.parse(productChosenString)
      setProductChosen(parsedProductChosen)
    }
  }, [])

  return (
    <Layouts>
      <div style={{ width: '100%' }}>
        <div className={styles.cartTitle}>
          您的訂單
          <div
            style={{
              width: '100%',
              height: '8px',
              background: '#FFD778',
              borderRadius: '10px'
            }}
          ></div>
        </div>

        <ProductColumn productChosen={productChosen} />

        <div className={styles.buttonFixed}>
          <div className={styles.cartTotalSquare}>
            <div>總金額</div>
            <div>NT$</div>
          </div>
          <div className={styles.buttonGruop}>
            <button
              className={styles.orderContinueButton}
              onClick={() => router.push('/Booking')}
            >
              繼續點餐
            </button>
            <button className={styles.submitButton}>提交訂單</button>
          </div>
        </div>
      </div>
    </Layouts>
  )
}
