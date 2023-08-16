import React, { useRef, useEffect, useState } from 'react'
import styles from './Cart.module.scss'
import Layouts from '@/components/Layouts'
import Image from 'next/image'
import Cookies from 'js-cookie'
import ProductColumn from './ProductColumn'
import { useRouter } from 'next/router'

export default function Cart() {
  Cookies.set('chooseOrderPosition', false)
  const router = useRouter()
  const [number, setNumber] = useState(1)
  const [productChosen, setProductChosen] = useState(null)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const productChosenString = Cookies.get('productChosen')
    if (productChosenString) {
      const parsedProductChosen = JSON.parse(productChosenString)

      setProductChosen(parsedProductChosen)
    }
  }, [])
  // const totalPrice = Cookies.get('totalPrice')
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

        <ProductColumn
          productChosen={productChosen}
          setProductChosen={setProductChosen}
          total={total}
          setTotal={setTotal}
        />

        <div className={styles.buttonFixed}>
          <div className={styles.cartTotalSquare}>
            <div>總金額</div>
            <div>NT${total}</div>
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
