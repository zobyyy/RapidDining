import React from 'react'
import styles from './Booking.module.scss'
import { Field, ErrorMessage, Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

const BookingInfoInput = ({
  isOrderPosition,
  makeReservation,
  setIsChangeAlert
}) => {
  const router = useRouter()
  const { id } = router.query
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
    // setTimeout(() => {
    //   setIsChangeAlert(true)
    // }, 1000)

    const requestBody = {
      restaurantId: parseInt(id),
      headcount: parseInt(values.headcount),
      name: values.name,
      gender: values.gender,
      phone: values.phoneNumber
    }

    await makeReservation(requestBody)
    if (Cookies.get('isReserved')) {
      const isReserved = Cookies.get('isReserved')
      isReserved.append(id)
      Cookies.set('isReserved', isReserved)
    } else {
      const isReserved = [id]
      Cookies.set('isReserved', isReserved)
    }
    // setPhone(values.phoneNumber)
  }
  const SelectGroup = () => {
    return (
      <div className={styles.inputGroup}>
        <span className={styles.inputTitle}>用餐人數</span>
        <Field as='select' name='headcount' className={styles.inputText}>
          <option value={1}>1位</option>
          <option value={2}>2位</option>
          <option value={3}>3位</option>
          <option value={4}>4位</option>
          <option value={5}>5位</option>
          <option value={6}>6位</option>
        </Field>
      </div>
    )
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
        <SelectGroup />
        <div>
          <InputField title='訂位人姓名' name='name' type='text' />
          <RadioGroup />
        </div>
        <InputField title='訂位人手機號碼' name='phoneNumber' type='text' />
        <button
          className={
            isOrderPosition ? styles.orderButtonCancel : styles.orderButton
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
  )
}

export default BookingInfoInput
