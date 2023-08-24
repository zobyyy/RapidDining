import { useEffect, useState } from 'react'
import CheckoutProvider,{useCheckoutContext} from './CheckoutContext'
import styles from './Checkout.module.scss'

export default function Order( {order, index} ) {
    const {selectedOrderId, setSelectedOrderId} = useCheckoutContext();
    useEffect(()=>{
        if (index === 0) {
            setSelectedOrderId(order.orderId);
        }
    },[])
    
    useEffect(()=>{
        console.log(selectedOrderId);
    },[selectedOrderId])
    
    return (
        <div>
            {order?.status === "內用"
                ?
                    ((order !== null && selectedOrderId !== null) && <DineIn order={order} selectedOrderId={selectedOrderId} setSelectedOrderId = {setSelectedOrderId} />)
                :
                    ((order !== null && selectedOrderId !== null) && <DineOut order={order} selectedOrderId={selectedOrderId} setSelectedOrderId = {setSelectedOrderId} />)
            }
        </div>
    )
}

function DineOut ( { order, selectedOrderId, setSelectedOrderId } ) {
    return (
       <div className={styles.order} style={order?.orderId === selectedOrderId ? {border:'5px solid #F58873'} : null} onClick={()=>setSelectedOrderId(order.orderId)}>
            <div className={styles.block} style={{width:'65%'}}>
                <Tag tag={order?.status} />
                <p style={{lineHeight:'0px', margin:'1.5rem 0px 0.5rem'}}>編號：{order?.orderId}</p>
            </div>
            <div className={styles.block}>
                <p>時間：{order?.created_at}</p>
                <p>金額：NT${order?.total}</p>
            </div>
        </div> 
    )
}

function DineIn ( { order, selectedOrderId, setSelectedOrderId } ) {
    return (
        <div className={styles.order} style={order?.orderId === selectedOrderId ? {border:'5px solid #F58873'} : null} onClick={()=>setSelectedOrderId(order.orderId)}>
            <div className={styles.block} style={{width:'65%'}}>
                <p>桌號</p>
                <p style={{fontSize:'36px',fontWeight:'700',color:'#F58873',margin:'1.3rem 0px'}}>{order?.tableId}</p>
            </div>
            <div className={styles.block}>
                <p>時間：{order?.created_at}</p>
                <p>金額：NT${order?.total}</p>
            </div>
        </div> 
    )
}

function Tag ( { tag } ) {
    return (
        <div className={tag === "外帶" ? styles.checkoutTagYellow : styles.checkoutTagGreen}>
            <p style={{fontSize:'16px'}}>{tag}</p>
        </div>
    )
}
