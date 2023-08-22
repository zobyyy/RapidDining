import Layouts from '../../components/LayoutTablet'
import Order from './Order'
import OrderDetail from './OrderDetail'
import useOrderSummary from '@/hook/useOrderSummary'
import styles from './Checkout.module.scss'
import { useState } from 'react'

export default function CheckoutPage() {
    const {order} = useOrderSummary();
  return (
    <Layouts>
        <div className={styles.sideBar}>
            <div className={styles.Logo}>
                <div className={styles.first}>食</div>
                <div className={styles.others}>時好</div>
            </div>
            <div className={styles.item}>
                <p>查看訂單</p>
            </div>
        </div>
        <div className={styles.checkoutBlock}>
            <div className={styles.shopHeader}>
                <p style={{fontSize:'32px',fontWeight:'700'}}>AppWorks咖啡廳</p>
                <p style={{justifyContent:'flex-end'}}>下午11:57 <br/> 2023/08/11</p>
            </div>
            <div className={styles.orderView}>
                <div className={styles.orderList}>
                    <Order type={1} />
                    <Order type={2} />
                </div>
                <OrderDetail />
            </div>
        </div>
    </Layouts>
  )
}
