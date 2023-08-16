import { useState } from 'react'
import styles from './Home.module.scss'

export default function Restaurant( {isBooking} ) {

  return (
    <div className={styles.Restaurant}>
        <div className={styles.picture}>
            <img src="" alt="" />
            {
                isBooking
                &&
                <div className={styles.bookingTag}>
                    <div className={styles.tick}>
                        <img src="/icon_tick.svg" alt="" />
                    </div>
                    <p className={styles.text}>已訂位</p>
                </div>
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

// function RestaurantInfo ( { isBooking } ) {
//     return (
        
//     )
// }