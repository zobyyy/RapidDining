import { useState } from 'react'
import styles from './Checkout.module.scss'

export default function Order( {type, order} ) {
    // type 1 外帶 or 候位
    // type 2 內用顯示桌號
    return (
        <div>
            {type === 1
                ?
                    <DineOut />
                //    (order && <DineOut order={order} />)
                :
                    <DineIn />
                    
            }
        </div>
    )
}

function DineOut ( { order } ) {
    return (
       <div className={styles.order}>
            <div className={styles.block} style={{width:'65%'}}>
                <Tag tag={"外帶"} />
                <p style={{lineHeight:'0px', margin:'1.5rem 0px 0.5rem'}}>編號：1234</p>
            </div>
            <div className={styles.block}>
                <p>時間：11:50</p>
                <p>金額：NT$295</p>
            </div>
        </div> 
    )
}

function DineIn ( { order } ) {
    return (
        <div className={styles.order}>
            <div className={styles.block} style={{width:'65%'}}>
                <p>桌號</p>
                <p style={{fontSize:'36px',fontWeight:'700',color:'#F58873',margin:'1.3rem 0px'}}>8</p>
            </div>
            <div className={styles.block}>
                <p>時間：11:50</p>
                <p>金額：NT$295</p>
            </div>
        </div> 
    )
}

function Tag ( { tag } ) {
    return (
        <div className={styles.checkoutTag}>
            <p style={{fontSize:'16px'}}>{tag}</p>
        </div>
    )
}
