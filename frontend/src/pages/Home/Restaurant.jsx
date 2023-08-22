import Link from 'next/link'
import { useState } from 'react'
import styles from './Home.module.scss'

export default function Restaurant( {type, restaurant, order} ) {
    // type 1 restaurant list
    // type 2 order
    console.log("res order: ", order?.restaurantName);
    return (
        <div style={type === 1 ? {position: 'relative', width: '100%',height:'9.5rem'} : {width: '100%'}}>
            {type === 1
                ?
                    <>
                        <Link href={`/Booking/${restaurant.id}`}>
                            <div style={{position:'absolute', left: '29px', top:'0', width: '85%', height: '8rem'}}></div>
                        </Link>
                        <RestaurantInfo restaurant={restaurant} />
                    </>
                :
                    <OrderHistory order={order} />
            }
        </div>
    )
}

function RestaurantInfo ( { restaurant } ) {
    return (
       <div className={styles.Restaurant}>
            <div className={styles.picture}>
                <img src={restaurant.picture} alt="" />
                {
                    restaurant.availability
                    &&
                    <Tag tag={"已訂位"} />
                }
                
            </div>
            <div className={restaurant.availability ? styles.info_isBooking : styles.info}>
                <p className={styles.restaurantName}>{restaurant.name}</p>
                {/* mockData 現在用訂位狀況判斷 */}
                <div className={styles.tag}>{restaurant.availability ? "無空位" : "有空位"}</div>
                <div className={styles.waitTime}>
                    <p className={styles.text}>平均等待時間</p>
                    <p className={styles.time}>{restaurant.waitTime}</p>
                    <p className={styles.text}>分鐘</p>
                </div>
            </div>
        </div> 
    )
}

function OrderHistory ( { order } ) {
    let isBooking = true;
    const pictureURL = "https://107.22.142.48/pic/" + order.restaurantPic;
    return (
        <div className={styles.order}>
            <div className={styles.picture}>
                <img src={pictureURL} alt="" />
                <Tag tag={"已訂位"} />
            </div>
            <div className={styles.info}>
                <p className={styles.restaurantName}>{order.restaurantName}</p>
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
            <img className={styles.tick} src="/icon_tick.svg" alt="" />
            <p className={styles.text}>{tag}</p>
        </div>
    )
}
