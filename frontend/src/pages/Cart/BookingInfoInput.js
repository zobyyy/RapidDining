import React, { useState, useEffect } from 'react'
import styles from './Cart.module.scss'
import { Field, ErrorMessage, Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

const BookingInfoInput = ({ restaurantId, total, orderRequest }) => {
  const router = useRouter()
  const { id } = router.query
  const initialValues = {
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
  const allProductChosenToBackend = Cookies.get('allProductChosenToBackend')
  const [audio, setAudio] = useState(null)

  useEffect(() => {
    setAudio(new Audio('/cash.mp3'))
  }, [])

  const handleSubmit = async (values) => {
    audio.play()
    const requestBody = {
      restaurantId: 1,
      tableId: null,
      reservationId: null,
      items: JSON.parse(allProductChosenToBackend),
      total: total,
      phone: values.phoneNumber
    }
    await orderRequest(requestBody)
  }
  const RadioGroup = () => {
    return (
      <div role='group' aria-labelledby='my-radio-group'>
        <label>
          <Field
            type='radio'
            name='gender'
            value='小姐'
            style={{ color: '#333' }}
          />
          小姐
        </label>
        <label>
          <Field type='radio' name='gender' value='先生' />
          先生
        </label>
        <label>
          <Field type='radio' name='gender' value='其他' />
          其他
        </label>
      </div>
    )
  }
  const InputField = ({ title, name, type }) => (
    <div className={styles.inputGroup}>
      <div style={{ flexDirection: 'row', display: 'flex' }}>
        <div className={styles.inputTitle}>{title}</div>
        <ErrorMessage
          name={name}
          component='div'
          className={styles.errorMessage}
        />
      </div>
      <Field className={styles.inputText} type={type} name={name} />
    </div>
  )
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.inputSquare}>
        <div>
          <InputField title='訂位人姓名' name='name' type='text' />
          <RadioGroup />
        </div>
        <div>
          <InputField title='訂位人手機號碼' name='phoneNumber' type='text' />
        </div>
        <div className={styles.buttonGruop}>
          <button
            className={styles.orderContinueButton}
            onClick={() => router.push(`/Booking/${restaurantId}`)}
          >
            繼續點餐
          </button>
          <button className={styles.submitButton} type='submit'>
            提交訂單
          </button>
        </div>
      </Form>
    </Formik>
  )
}

export default BookingInfoInput
