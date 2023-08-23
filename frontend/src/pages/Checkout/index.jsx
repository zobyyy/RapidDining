import Layouts from '../../components/LayoutTablet'
import Order from './Order'
import OrderDetail from './OrderDetail'
import useOrderSummary from '@/hook/useOrderSummary'
import useOrderGet from '@/hook/useOrderGet'
import styles from './Checkout.module.scss'
import CheckoutProvider from './CheckoutContext'
import { useEffect, useState } from 'react'

export default function CheckoutPage() {
    const {order} = useOrderSummary();
  return (
    <CheckoutProvider>
        <Layouts>
            <div className={styles.sideBar}>
                <div className={styles.Logo}>
                    <div className={styles.first}>食</div>
                    <div className={styles.others}>時好</div>
                </div>
                <div className={styles.item}>
                    <img style={{margin:'0.5rem 0 0px'}} src="/icon_order.svg" alt="" />
                    <p style={{margin:'0.5rem 0px'}}>查看訂單</p>
                </div>
            </div>
            <div className={styles.checkoutBlock}>
                <div className={styles.shopHeader}>
                    <p style={{fontSize:'32px',fontWeight:'700'}}>AppWorks咖啡廳</p>
                    <p style={{justifyContent:'flex-end'}}>下午11:57 <br/> 2023/08/11</p>
                </div>
                <div className={styles.orderView}>
                    <div className={styles.orderList}>
                        {order.length !== 0
                            ?
                                (order.map((order, index)=> (
                                    (order && <Order order={order} index={index} />)
                                )))
                            :
                                <p>目前尚無訂單</p>
                        }
                    </div>
                    <OrderDetail />
                </div>
            </div>
        </Layouts>
    </CheckoutProvider>
  )
}
