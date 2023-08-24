import React from 'react'
import styles from './Alert.module.scss'
import Image from 'next/image'
import useOrderSummary from '@/hook/useOrderSummary';
import { useCheckoutContext } from '@/pages/Checkout/CheckoutContext';
export default function Alert({
  setIsAlert,
  title,
  context,
  status,
  yes,
  no,
  onClickHandle
}) {
  const handleClose = () => {
    setIsAlert(false)
  }
  const handleYesClick = onClickHandle || handleClose // 如果传入了 onClickHandle，就使用它，否则使用 handleClose

  return (
    <div className={styles.overlay}>
      <div className={styles.layouts}>
        <Image
          src={status === 'ok' ? '/failed.png' : '/notice.png'}
          width={67}
          height={67}
          className={styles.alertImg}
        />

        <div className={styles.title}>{title}</div>
        <div className={styles.context}>{context}</div>
        {status === 'ok' && (
          <button className={styles.OKbutton} onClick={handleClose}>
            OK
          </button>
        )}
        {status === 'option' && (
          <div className={styles.buttonGroup}>
            <button
              className={styles.buttonNo}
              onClick={onClickHandle}
              style={{ border: '1px solid #BDBDBD' }}
            >
              {no}
            </button>
            <button
              className={styles.buttonYes}
              onClick={handleClose}
              style={{ border: '1px solid #f58873', color: '#f58873' }}
            >
              {yes}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export function CheckoutAlert({
  setIsAlert,
  title,
  context,
  checkoutStatus,
  yes,
  no,
  onClickHandle
}) {
  // checkoutStatus = 1 結帳成功
  // checkoutStatus = 2 候位結帳失敗
  const {setSelectedOrderId} = useCheckoutContext();
  const {fetchOrderSummary} = useOrderSummary();
  const handleClose = () => {
    setIsAlert(false);
    // fetchOrderSummary();
  }
  return (
    <div className={styles.overlay}>
      <div className={styles.layouts} style={{width:'30rem'}}>
        <Image
          src={checkoutStatus === 200 ? "/收到確認.png" : '/failed.png'}
          width={67}
          height={67}
        />
        {
          checkoutStatus === 200
            ?
              <div className={styles.title} style={{marginTop: '0.5rem'}}>訂單已結帳</div>
            :
              <div className={styles.title} style={{marginTop: '0.5rem'}}>候位中，無法結帳！</div>
        }
        <button className={styles.OKbutton} onClick={handleClose}>
            OK
        </button>
      </div>
    </div>
  )
}