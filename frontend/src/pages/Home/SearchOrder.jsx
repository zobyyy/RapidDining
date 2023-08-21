import styles from './Home.module.scss'
import Restaurant from './Restaurant'
import useOrderPending from '@/hook/useOrderPending';
import { useState } from 'react'

export default function SearchOrder({setIsSearch,setIsHidden}) {
  const [phone, setPhone] = useState('');
  const [errorState, setErrorState] = useState(false);
  const {order, fetchOrderPending} = useOrderPending();

  function validatePhone(phone) {
    if (phone.trim() !== '' && phone.length === 10) {
      setErrorState(false);
      fetchOrderPending(phone);
    } else {
      setErrorState(true);
    }
  }

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
            <button type="button" className={styles.submit} onClick={() => validatePhone(phone)}>送出</button>
          </div>
          {errorState 
            && 
            <p className={styles.inputLabel} style={{color:'red',margin:'3px 0px 0px'}}>手機格式錯誤，請重新確認</p>
          }
        </div>
        <Restaurant type={2} isBooking={true}/>
        <Restaurant type={2} isBooking={true}/>
        <Restaurant type={2} isBooking={true}/>
      </div>
    </div>
  )
}