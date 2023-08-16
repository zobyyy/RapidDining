import { useState } from 'react'
import styles from './Home.module.scss'

export default function Restaurant( {type,isBooking} ) {
    // type 1 restaurant list
    // type 2 order
    return (
        <>
            {type === 1 ? <RestaurantInfo isBooking={isBooking}/> : <OrderHistory isBooking={isBooking} /> }
        </>
    )
}

function RestaurantInfo ( { isBooking } ) {
    return (
       <div className={styles.Restaurant}>
            <div className={styles.picture}>
                <img src="" alt="" />
                {
                    isBooking
                    &&
                    <Tag tag={"已訂位"} />
                }
                
            </div>
            <div className={isBooking ? styles.info_isBooking : styles.info}>
                <p className={styles.restaurantName}>AppWork咖啡廳</p>
                {/* mockData 現在用訂位狀況判斷 */}
                <div className={styles.tag}>{isBooking ? "無空位" : "有空位"}</div>
                <div className={styles.waitTime}>
                    <p className={styles.text}>平均等待時間</p>
                    <p className={styles.time}>10</p>
                    <p className={styles.text}>分鐘</p>
                </div>
            </div>
        </div> 
    )
}

function OrderHistory ( { isBooking } ) {
    return (
       <div className={styles.order}>
            <div className={styles.picture}>
                <img src="" alt="" />
                {
                    isBooking
                    &&
                    <Tag tag={"已訂位"} />
                }
                {
                    isBooking
                    &&
                    <Tag tag={"已訂餐"} />
                }
            </div>
            <div className={styles.info}>
                <p className={styles.restaurantName}>AppWork咖啡廳</p>
                {/* mockData 現在用訂位狀況判斷 */}
                <div className={styles.orderInfo}>
                    <p className={styles.text}>請於10分鐘內抵達</p>
                    <p className={styles.text}>訂餐編號：1234</p>
                </div>
            </div>
        </div> 
    )
}

function Tag ( { tag } ) {
    return (
        <div className={styles.bookingTag}>
            <div className={styles.tick}>
                <img src="/icon_tick.svg" alt="" />
            </div>
            <p className={styles.text}>{tag}</p>
        </div>
    )
}
