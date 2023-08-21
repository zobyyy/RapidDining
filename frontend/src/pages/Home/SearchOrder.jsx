import styles from './Home.module.scss'
import Restaurant from './Restaurant'
import useOrderPending from '@/hook/useOrderPending';
import { useState } from 'react'

export default function SearchOrder({setIsSearch,setIsHidden}) {
  const [phone, setPhone] = useState('');
  const {order, fetchOrderPending} = useOrderPending();
  return (
    <div className={styles.overlay}>
      <div className={styles.searchBlock}>
        <button type="button" className={styles.cancle} onClick={() => {setIsSearch(false);setIsHidden(false); setPhone([])}}>
          <img src="/icon_cancel.svg" alt="" />
        </button>
        <p className={styles.title}>找尋您的訂位或訂餐紀錄</p>
        <div className={styles.inputBlock}>
          <p className={styles.inputLabel}>請輸入訂位/訂餐人手機號碼</p>
          <div className={phone.trim() !== '' ? styles.inputBar_red : styles.inputBar}>
            <input type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value) } />
            <button type="button" className={styles.submit} onClick={() => {fetchOrderPending(phone.toString()); setPhone('')}}>送出</button>
          </div>
        </div>
        <Restaurant type={2} isBooking={true}/>
        <Restaurant type={2} isBooking={true}/>
        <Restaurant type={2} isBooking={true}/>
      </div>
    </div>
  )
}