import React from 'react'
import { useRouter } from 'next/router'
import styles from './Booking.module.scss'
import Link from 'next/link'
import { Field, ErrorMessage } from 'formik'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import { styled } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'

const BookingInfoInput = () => {
  const router = useRouter()

  const RowRadioButtonsGroup = () => {
    return (
      <FormControl>
        <RadioGroup
          row
          aria-labelledby='demo-row-radio-buttons-group-label'
          name='row-radio-buttons-group'
        >
          <FormControlLabel value='female' control={<Radio />} label='小姐' />
          <FormControlLabel value='male' control={<Radio />} label='先生' />
          <FormControlLabel value='other' control={<Radio />} label='其他' />
        </RadioGroup>
      </FormControl>
    )
  }
  const InputField = ({ title }) => (
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
      <div>
        <InputField title='訂位人姓名' />
        <RowRadioButtonsGroup />
      </div>
      <InputField title='訂位人手機號碼' />
    </>
  )
}

export default BookingInfoInput
