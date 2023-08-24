import Layouts from '../../components/LayoutTablet'
import Order from './Order'
import OrderDetail from './OrderDetail'
import useOrderSummary from '@/hook/useOrderSummary'
import Alert,{CheckoutAlert} from '@/components/Alert'
import styles from './Checkout.module.scss'
import CheckoutProvider from './CheckoutContext'
import { use, useEffect, useState } from 'react'

export default function CheckoutPage() {
    const {order} = useOrderSummary();
    const [isAlert, setIsAlert] = useState(false);
    const [checkoutStatus, setCheckoutStatus] = useState(1)
    const [currentTime, setCurrentTime] = useState(new Date());
    const [formattedTime, setFormattedTime] = useState();
    const [formattedDate, setFormattedDate] = useState();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
            setFormattedTime(currentTime.toLocaleTimeString());
            setFormattedDate(currentTime.toLocaleDateString());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [currentTime]);

  return (
    <CheckoutProvider>
        <Layouts>
            {isAlert && <CheckoutAlert setIsAlert={setIsAlert} checkoutStatus={checkoutStatus} />}
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
                    <p style={{justifyContent:'flex-end',width:'6rem'}}>
                        <span id="client-time"></span>{formattedTime}<br/>
                        {formattedDate}
                    </p>
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
                    <OrderDetail setIsAlert={setIsAlert} setCheckoutStatus={setCheckoutStatus} />
                </div>
            </div>
        </Layouts>
    </CheckoutProvider>
  )
}
