import React, { useRef, useEffect, useState } from 'react'
import styles from './Cart.module.scss'
import Layouts from '@/components/Layouts'
import Image from 'next/image'
import Cookies from 'js-cookie'
import ProductColumn from './ProductColumn'
import { useRouter } from 'next/router'

const productChosen = JSON.parse(Cookies.get('productChosen'))
console.log(productChosen.name)

export default function Cart() {
  Cookies.set('chooseOrderPosition', false)
  const router = useRouter()
  const [selectedOptions, setSelectedOptions] = useState({})
  const [number, setNumber] = useState(1)
  const ProductNumber = () => {
    const handlePlusClick = () => {
      setNumber(number + 1)
    }

    const handleMinusClick = () => {
      if (number > 1) {
        setNumber(number - 1)
      }
    }
    return (
      <div className={styles.productNumber}>
        {number === 1 ? (
          <Image src='/minusDisabled.png' width={64} height={50} />
        ) : (
          <Image
            src='/minus.png'
            width={64}
            height={50}
            onClick={handleMinusClick}
          />
        )}
        <div className={styles.productNumberButton}>{number}</div>
        <Image
          src='/plus.png'
          width={64}
          height={50}
          onClick={handlePlusClick}
        />
      </div>
    )
  }

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
