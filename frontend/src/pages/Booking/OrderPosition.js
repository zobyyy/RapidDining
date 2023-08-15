import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styles from './Booking.module.scss'
import Link from 'next/link'
import { Field, ErrorMessage } from 'formik'
import BookingInfoInput from '@/pages/Booking/BookingInfoInput'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Image from 'next/image'

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
      <div>黃小姐您好</div>
      <div>我們將會為您保留座位</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row'
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
          // onClick={handleOrderButtonClick}
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
      <div>黃小姐您好</div>
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
            flexDirection: 'row'
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
            3
          </div>
          組
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
          // onClick={handleOrderButtonClick}
        >
          前往訂餐
        </button>
      </>
    </div>
  )
}
const BasicSelect = () => {
  const [peopleNum, setPeopleNum] = React.useState('')

  const handleChange = (event) => {
    setPeopleNum(event.target.value)
  }
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={peopleNum}
          label=''
          onChange={handleChange}
          sx={{ borderRadius: '10px', height: '45px' }}
        >
          <MenuItem value={1}>1位</MenuItem>
          <MenuItem value={2}>2位</MenuItem>
          <MenuItem value={3}>3位</MenuItem>
          <MenuItem value={4}>4位</MenuItem>
          <MenuItem value={5}>5位</MenuItem>
          <MenuItem value={6}>6位</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
const OrderPosition = ({ handleChooseButtonOnclick }) => {
  const [isOrderPosition, setIsOrderPosition] = useState(false)

  const handleOrderButtonClick = () => {
    setIsOrderPosition(!isOrderPosition)
  }
  return (
    <div className={styles.order}>
      <div className={styles.orderInfo}>
        {isOrderPosition ? (
          <BookingCheck handleChooseButtonOnclick={handleChooseButtonOnclick} />
        ) : (
          <>
            <div className={styles.inputGroup}>
              <span>用餐人數</span>
              <BasicSelect />
              {/* <input className={styles.inputText} /> */}
            </div>
            <BookingInfoInput />
          </>
        )}
      </div>
      <>
        {!isOrderPosition && (
          <button
            className={
              isOrderPosition ? styles.orderButtonCancel : styles.orderButton
            }
            onClick={handleOrderButtonClick}
          >
            立即訂位
          </button>
        )}
        {!isOrderPosition && (
          <div className={styles.orderButtonRemind}>
            如有位置會為您保留10分鐘座位
          </div>
        )}
      </>
    </div>
  )
}

export default OrderPosition
