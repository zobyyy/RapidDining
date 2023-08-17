import React from 'react'
import { useRouter } from 'next/router'
import styles from './Booking.module.scss'
import { Field, ErrorMessage } from 'formik'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'

const BookingInfoInput = () => {
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
          <Field type='radio' name='gender' value='小姐' />
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

      // <FormControl>
      //   <RadioGroup
      //     row
      //     aria-labelledby='demo-row-radio-buttons-group-label'
      //     name='row-radio-buttons-group'
      //     defaultValue='female'
      //   >
      //     <FormControlLabel value='female' control={<Radio />} label='小姐' />
      //     <FormControlLabel value='male' control={<Radio />} label='先生' />
      //     <FormControlLabel value='other' control={<Radio />} label='其他' />
      //   </RadioGroup>
      // </FormControl>
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
    <>
      <SelectGroup />
      <div>
        <InputField title='訂位人姓名' name='name' />
        <RadioGroup />
      </div>
      <InputField title='訂位人手機號碼' name='phoneNumber' />
    </>
  )
}

export default BookingInfoInput
