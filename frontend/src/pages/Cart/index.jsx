import React, { useRef, useEffect, useState } from 'react'
import styles from './Cart.module.scss'
import Layouts from '@/components/Layouts'
import Cookies from 'js-cookie'
import ProductColumn from './ProductColumn'
import { useRouter } from 'next/router'
import BookingInfoInput from './BookingInfoInput'
import useOrderRequest from '@/hook/useOrderReqest'

export default function Cart() {
  Cookies.set('chooseOrderPosition', false)
  const router = useRouter()
  const [productChosen, setProductChosen] = useState(null)
  const [total, setTotal] = useState(0)
  const [isAdd, setIsAdd] = useState(false)
  const restaurantId = Cookies.get('restaurantsId')
  const isEatHere = Cookies.get('isEatHere')
  const { orderRequest } = useOrderRequest()
  useEffect(() => {
    const allProductChosen = Cookies.get('allProductChosen')
    if (allProductChosen) {
      const productChosenJSON = [JSON.parse(allProductChosen)]
      setProductChosen(productChosenJSON)
      if (allProductChosen) {
        setIsAdd(true)
      } else {
        setIsAdd(false)
      }

      if (productChosenJSON && productChosenJSON[0]) {
        const totalPrice = productChosenJSON[0].reduce((total, item) => {
          return total + item.price * item.quantity
        }, 0)
        setTotal(totalPrice)
      } else {
        setProductChosen([])
        setIsAdd(false)
        setTotal(0)
      }
    }
  }, [total])

  const phone = Cookies.get('phone')

  let tableId = 0
  if (Cookies.get('tableId') !== 'null') {
    tableId = Cookies.get('tableId')
  } else {
    tableId = null
  }
  let reservationId = 0
  if (Cookies.get('reservationId') !== 'null') {
    reservationId = parseInt(Cookies.get('reservationId'))
  } else {
    reservationId = null
  }
  const allProductChosenToBackend = Cookies.get('allProductChosenToBackend')
  const handleSubmit = async () => {
    const requestBody = {
      restaurantId: parseInt(restaurantId),
      tableId: tableId,
      reservationId: reservationId,
      items: JSON.parse(allProductChosenToBackend),
      total: total,
      phone: phone
    }
    await orderRequest(requestBody)
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
        <div
          className={
            isEatHere ? styles.productContainerNoInput : styles.productContainer
          }
        >
          {isAdd && productChosen ? (
            productChosen[0].map((item, index) => (
              <ProductColumn
                key={index}
                productChosen={item}
                setProductChosen={setProductChosen}
                total={total}
                setTotal={setTotal}
                setIsAdd={setIsAdd}
              />
            ))
          ) : (
            <div className={styles.productCol}>
              <div className={styles.productName}>尚未有商品加入</div>
            </div>
          )}
        </div>
        {isEatHere ? (
          <div className={styles.buttonFixed}>
            <div className={styles.cartTotalSquare}>
              <div>總金額</div>
              <div>NT${total}</div>
            </div>
            <div className={styles.buttonGruop}>
              <button
                className={styles.orderContinueButton}
                onClick={() => router.push(`/Booking/${restaurantId}`)}
              >
                繼續點餐
              </button>
              <button className={styles.submitButton} onClick={handleSubmit}>
                提交訂單
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.buttonFixed}>
            <div className={styles.cartTotalSquare}>
              <div>總金額</div>
              <div>NT${total}</div>
            </div>
            <BookingInfoInput
              restaurantId={restaurantId}
              total={total}
              orderRequest={orderRequest}
            />
          </div>
        )}
      </div>
    </Layouts>
  )
}
