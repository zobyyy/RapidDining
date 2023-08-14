import React from 'react'
import { useRouter } from 'next/router'
import styles from './Booking.module.scss'
import Link from 'next/link'
import { Field, ErrorMessage } from 'formik'

const BookingInfo = ({ nameRef, emailRef, passwordRef }) => {
  const router = useRouter()

  const InputField = ({ title, placeholder, name, type, innerRef }) => (
    <div className={styles.inputGroup}>
      <div style={{ flexDirection: 'row', display: 'flex' }}>
        <div className={styles.inputTitle}>{title}</div>
        {/* <ErrorMessage
          name={name}
          component='div'
          className={styles.errorMessage}
        /> */}
      </div>
      <input className={styles.inputText} />
      {/* <Field
        className={styles.inputText}
        type={type}
        name={name}
        placeholder={placeholder}
        innerRef={innerRef}
      /> */}
    </div>
  )
  return (
    <>
      {/* <InputField
        title='電子郵件'
        placeholder='例: shirney@appworks.tw'
        name='email'
        type='email'
        innerRef={emailRef}
      /> */}
      <InputField title='訂位人姓名' />
      <InputField title='訂位人手機號碼' />
    </>
  )
}

export default BookingInfo
