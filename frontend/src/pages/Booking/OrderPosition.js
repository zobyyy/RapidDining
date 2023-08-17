import React, { useState } from 'react'
import styles from './Booking.module.scss'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import BookingInfoInput from '@/pages/Booking/BookingInfoInput'
import Image from 'next/image'
import Cookies from 'js-cookie'

const OrderPosition = ({
  handleChooseButtonOnclick,
  makeReservation,
  reservationType,
  setChooseOrderPosition
}) => {
  const [isOrderPosition, setIsOrderPosition] = useState(false)
  let tableId = 0
  let reservationId = 0
  if (reservationType === 'check') {
    tableId = Cookies.get('tableId')
  }
  if (reservationType === 'waiting') {
    reservationCount = Cookies.get('reservationCount')
  }

  const userName = Cookies.get('userName')
  const userGender = Cookies.get('userGender')
  const BookingCheck = ({ handleChooseButtonOnclick }) => {
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          padding: '10% 0'
        }}
      >
        <Image src='/收到確認.png' width={67} height={67} />
        <div>
          {userName}
          {userGender}您好
        </div>
        <div>我們將會為您保留座位</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          請盡速於
          <div
            style={{
              fontSize: '32px',
              color: '#F58873',
              fontWeight: '700',
              margin: '10px',
              marginTop: '0'
            }}
          >
            10
          </div>
          分鐘內抵達，謝謝！
        </div>
        <>
          <button
            className={styles.orderButtonCancel}
            onClick={handleOrderButtonClick}
          >
            取消訂位
          </button>
          <button
            className={styles.orderButton}
            onClick={handleChooseButtonOnclick}
          >
            前往訂餐
          </button>
        </>
      </div>
    )
  }
  const BookingWaiting = () => {
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          padding: '10% 0'
        }}
      >
        <Image src='/收到確認.png' width={67} height={67} />
        <div>
          {userName}
          {userGender}您好
        </div>
        <div>目前尚未有空位，先為您登記候位</div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            width: '100%',
            border: '1px solid #D9D9D9',
            borderRadius: '20px',
            height: '131px'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            您是候位第
            <div
              style={{
                fontSize: '32px',
                color: '#F58873',
                fontWeight: '700',
                margin: '10px',
                marginTop: '0'
              }}
            >
              {reservationId}
            </div>
          </div>
          <div>如有位置會立即連絡您，謝謝！</div>
        </div>
        <>
          <button
            className={styles.orderButtonCancel}
            // onClick={handleOrderButtonClick}
          >
            取消候位
          </button>
          <button
            className={styles.orderButton}
            onClick={handleOrderButtonClick}
          >
            前往訂餐
          </button>
        </>
      </div>
    )
  }

  const initialValues = {
    headcount: 1,
    name: '',
    gender: '小姐',
    phoneNumber: ''
  }
  const validationSchema = Yup.object({
    name: Yup.string().required('必填欄位'),
    phoneNumber: Yup.string()
      .required('必填欄位')
      .matches(/^(09)\d{8}$/, '手機格式不正確')
  })
  const handleSubmit = async (values) => {
    const requestBody = {
      restaurantId: 1,
      headcount: parseInt(values.headcount),
      name: values.name,
      gender: values.gender,
      phone: values.phoneNumber
    }
    await makeReservation(requestBody)
  }

  const handleOrderButtonClick = () => {
    setIsOrderPosition(!isOrderPosition)
    setChooseOrderPosition(false)
  }
  return (
    <div className={styles.order}>
      <div className={styles.orderInfo}>
        {reservationType === 'check' ? (
          <BookingCheck handleChooseButtonOnclick={handleChooseButtonOnclick} />
        ) : reservationType === 'waiting' ? (
          <BookingWaiting />
        ) : (
          <>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className={styles.inputSquare}>
                <BookingInfoInput />
                <button
                  className={
                    isOrderPosition
                      ? styles.orderButtonCancel
                      : styles.orderButton
                  }
                  type='submit'
                >
                  立即訂位
                </button>
                <>
                  {!isOrderPosition && (
                    <div className={styles.orderButtonRemind}>
                      如有位置會為您保留10分鐘座位
                    </div>
                  )}
                </>
              </Form>
            </Formik>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderPosition
