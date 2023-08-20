import React, { useRef, useEffect, useState } from 'react'
import styles from './Cart.module.scss'
import Layouts from '@/components/Layouts'
import Image from 'next/image'
import Cookies from 'js-cookie'
import ProductColumn from './ProductColumn'
import { useRouter } from 'next/router'
import Restaurant from '../Home/Restaurant'
console.log(Cookies.get('allProductChosen'))
export default function Cart() {
  Cookies.set('chooseOrderPosition', false)
  const router = useRouter()
  const [number, setNumber] = useState(1)
  const [productChosen, setProductChosen] = useState(null)
  const [total, setTotal] = useState(0)
  const [isAdd, setIsAdd] = useState(false)
  const restaurantId = Cookies.get('restaurantId')

  useEffect(() => {
    const allProductChosen = Cookies.get('allProductChosen')
    console.log('allProductChosen', allProductChosen)
    const productChosenJSON = [JSON.parse(allProductChosen)]
    setProductChosen(productChosenJSON)
    if (allProductChosen) {
      setIsAdd(true)
    } else {
      setIsAdd(false)
    }
  }, [])
  console.log(productChosen)
  // 在某處的程式碼中
  const totalPrice = productChosen[0].reduce((total, item) => {
    // 對每個項目進行價格和數量的乘法操作，然後將結果相加
    return total + item.price * item.quantity
  }, 0)

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
        {isAdd && productChosen ? (
          productChosen[0].map((item, index) => (
            <ProductColumn
              key={index}
              productChosen={item}
              setProductChosen={setProductChosen}
              total={total}
              setTotal={setTotal}
            />
          ))
        ) : (
          <div className={styles.productCol}>
            <div className={styles.productName}>尚未有商品加入</div>
          </div>
        )}

        <div className={styles.buttonFixed}>
          <div className={styles.cartTotalSquare}>
            <div>總金額</div>
            <div>NT${totalPrice}</div>
          </div>
          <div className={styles.buttonGruop}>
            <button
              className={styles.orderContinueButton}
              onClick={() => router.push(`/Booking/${restaurantId}`)}
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
