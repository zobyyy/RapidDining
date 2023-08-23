import styles from './Home.module.scss'
import Restaurant from './Restaurant'
import useOrderPending from '@/hook/useOrderPending'
import { useEffect, useState } from 'react'

export default function SearchOrder({ setIsSearch, setIsHidden }) {
  const [phone, setPhone] = useState('')
  const [buttonClick, setButtonClick] = useState(false)

  const [errorState, setErrorState] = useState(false)
  const [orderIsLoading, setOrderIsLoading] = useState(false) // 判斷Loading動畫和抓取資料
  const { order, fetchOrderPending, isLoading } = useOrderPending()

  function validatePhone(phone) {
    if (phone.trim() !== '' && phone.length === 10) {
      const phoneString = phone.toString()
      const encryptedPhone = btoa(phoneString)
      setOrderIsLoading(true)
      setErrorState(false)
      fetchOrderPending(encryptedPhone)
    } else {
      setErrorState(true)
    }
  }

  // order更新後會把orderIsLoading設成true
  useEffect(() => {
    console.log('order: ', order)
    setOrderIsLoading(false)
  }, [order])

  return (
    <div className={styles.overlay}>
      <div className={styles.searchBlock}>
        <button
          type='button'
          className={styles.cancle}
          onClick={() => {
            setIsSearch(false)
            setIsHidden(false)

            setButtonClick(false)
          }}
        >
          <img src='/icon_cancel.svg' alt='' />
        </button>
        <h2 className={styles.title}>找尋您的訂位或訂餐紀錄</h2>
        <div className={styles.inputBlock}>
          <p className={styles.inputLabel}>請輸入訂位/訂餐人手機號碼</p>
          <div
            className={
              phone.trim() !== '' ? styles.inputBar_red : styles.inputBar
            }
          >
            <input
              type='tel'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              type='button'
              className={styles.submit}
              onClick={() => {
                setButtonClick(true)

                validatePhone(phone)
              }}
            >
              送出
            </button>
          </div>
          {errorState && (
            <p
              className={styles.inputLabel}
              style={{ color: 'red', margin: '3px 0px 0px' }}
            >
              手機格式錯誤，請重新確認
            </p>
          )}
        </div>

        {isLoading ? (
          <div
            style={{
              position: 'relative',
              display: 'flex',
              width: '100px',
              height: '100px',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div className={styles.ldsfacebook}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : order.length > 0 ? (
          order.map((orderItem, index) => (
            <Restaurant key={index} type={2} order={orderItem} phone={phone} />
          ))
        ) : buttonClick && phone.trim() !== '' ? (
          <div className={styles.noOrder}>此手機號碼沒有訂單紀錄</div>
        ) : null}
      </div>
    </div>
  )
}
