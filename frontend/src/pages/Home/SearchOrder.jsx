import styles from './Home.module.scss'
import Layouts from '../../components/Layouts'
export default function SearchOrder({setIsSearch}) {
  return (
    <div className={styles.overlay}>
      <div className={styles.searchBlock}>
        <button type="button" className={styles.cancle} onClick={() => setIsSearch(false)}>
          <img src="/icon_cancel.svg" alt="" />
        </button>
        <p className={styles.title}>找尋您的訂位或訂餐紀錄</p>
        <div className={styles.inputBlock}>
          <p className={styles.inputLabel}>請輸入訂位/訂餐人手機號碼</p>
          <div className={styles.inputBar}>
            <input type="text" />
            <button type="submit" className={styles.submit}>送出</button>
          </div>
        </div>
        
      </div>
    </div>
  )
}