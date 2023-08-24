import CheckoutProvider,{ useCheckoutContext } from './CheckoutContext'
import useOrderGet from '@/hook/useOrderGet';
import useCheckout from '../../hook/useCheckout';
import styles from './Checkout.module.scss'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// 
export default function OrderDetail({setIsAlert, setCheckoutStatus}) {
    const {selectedOrderId, setSelectedOrderId} = useCheckoutContext();
    const {detail} = useOrderGet(selectedOrderId);
    const {checkoutResponse, handleCheckout} = useCheckout();

    useEffect(()=>{
        console.log("detail: ",detail)
    },[detail])
    
    return (
        <div className={styles.orderDetail}>
            <div className={styles.yellowBox}>
                <p>編號：{detail?.orderId}</p>
            </div>
            <p style={{alignSelf:'flex-start', margin:'2.5rem 1rem 1.5rem'}}>訂單內容：</p>
            <div className={styles.separator} />
            <div className={styles.detailList}>
                {detail?.items !== undefined
                    ?
                        detail?.items?.map((item)=>(
                            <DetailItem item = {item} />
                        ))
                    :
                        <p style={{fontSize:'20px'}}>目前訂單沒有點餐項目</p>
                }
            </div>
            <div className={styles.yellowBox} style={{marginTop:'auto',justifyContent:'space-between'}}>
                <p>總金額</p>
                <p>NT${detail?.total}</p>
            </div>
            <button type='submit' disabled={detail==='error'} onClick={()=>(handleCheckout(detail.orderId,setIsAlert,setCheckoutStatus),setCheckoutStatus(checkoutResponse))}>結帳</button>
        </div>
    )
}

function DetailItem ({item}) {
    return(
        <div className={styles.detailItem}>
            <img src={item.picture} alt="" />
            <div>
                <p style={{fontSize:'16px',fontWeight:'400',margin:'0'}}>{item.dishName}</p>
                <div style={{
                    display:'flex',
                    gap:'0.3rem'
                }}>
                    {
                        item.customized.map((flavor)=>(
                            <div className={styles.tag}>{flavor.dishoption}</div>
                        ))
                    }
                </div>
            </div>
            <p style={{fontSize:'40px',fontWeight:'700', color:'#F58873', marginLeft:'auto', marginTop:'0',marginRight:'1.5rem'}}>{item.quantity}</p>
        </div>
    )
}