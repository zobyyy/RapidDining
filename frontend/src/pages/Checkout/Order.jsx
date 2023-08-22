import { useState } from 'react'
import styles from './Checkout.module.scss'

export default function Order( {order} ) {
    return (
        <div>
            {order.status === "內用"
                ?
                   (order && <DineIn order={order} />)
                :
                    (order && <DineOut order={order} />)
            }
        </div>
    )
}

function DineOut ( { order } ) {
    return (
       <div className={styles.order}>
            <div className={styles.block} style={{width:'65%'}}>
                <Tag tag={order.status} />
                <p style={{lineHeight:'0px', margin:'1.5rem 0px 0.5rem'}}>編號：{order.orderId}</p>
            </div>
            <div className={styles.block}>
                <p>時間：{order.created_at}</p>
                <p>金額：NT${order.total}</p>
            </div>
        </div> 
    )
}

function DineIn ( { order } ) {
    return (
        <div className={styles.order}>
            <div className={styles.block} style={{width:'65%'}}>
                <p>桌號</p>
                <p style={{fontSize:'36px',fontWeight:'700',color:'#F58873',margin:'1.3rem 0px'}}>{order.tableId}</p>
            </div>
            <div className={styles.block}>
                <p>時間：{order.created_at}</p>
                <p>金額：NT${order.total}</p>
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
