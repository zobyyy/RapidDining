import Link from 'next/link'
import { useState } from 'react'
import styles from './Home.module.scss'
import Image from 'next/image'

function getOrderContent(order) {
  if (
    order.tableId !== null &&
    order.reservationId === null &&
    order.status === null
  ) {
    return (
      <div className={styles.orderInfo}>
        <p className={styles.text}>請於10分鐘內抵達</p>
      </div>
    )
  } else if (order.tableId === null && order.orderId !== null) {
    return (
      <div className={styles.orderInfo}>
        <p className={styles.text}>候位第{order.status}組</p>
        <p className={styles.text}>訂餐編號：{order.orderId}</p>
      </div>
    )
  } else if (order.tableId === null && order.orderId === null) {
    return (
      <div className={styles.orderInfo}>
        <p className={styles.text}>候位第{order.status}組</p>
      </div>
    )
  } else if (
    order.tableId === null &&
    order.reservationId === null &&
    order.status === null
  ) {
    return (
      <div className={styles.orderInfo}>
        <p className={styles.text}>訂餐編號：{order.orderId}</p>
      </div>
    )
  }
}
function getTags(order) {
  if (
    order.tableId !== null &&
    order.reservationId === null &&
    order.status === null
  ) {
    return <Tag tag={'已訂位'} />
  } else if (order.tableId === null && order.orderId !== null) {
    return (
      <>
        <Tag tag={'已訂位'} />
        <Tag tag={'已訂餐'} />
      </>
    )
  } else if (order.tableId === null && order.orderId === null) {
    return <Tag tag={'已訂位'} />
  } else if (
    order.tableId === null &&
    order.reservationId === null &&
    order.status === null
  ) {
    return <Tag tag={'已訂餐'} />
  }
}

export default function Restaurant({ type, restaurant, order }) {
  return (
    <div
      style={
        type === 1
          ? { position: 'relative', width: '100%', height: '9.5rem' }
          : { width: '100%' }
      }
    >
      {type === 1 ? (
        <>
          <Link href={`/Booking/${restaurant.id}`}>
            <div
              style={{
                position: 'absolute',
                left: '29px',
                top: '0',
                width: '85%',
                height: '8rem'
              }}
            ></div>
          </Link>
          <RestaurantInfo restaurant={restaurant} />
        </>
      ) : (
        order && <OrderHistory order={order} />
      )}
    </div>
  )
}

function RestaurantInfo({ restaurant }) {
  return (
    <div className={styles.Restaurant}>
      <div className={styles.picture}>
        <Image width={128} height={123} src={restaurant.picture} alt='' />
      </div>
      <div className={styles.info}>
        <p className={styles.restaurantName}>{restaurant.name}</p>
        {/* mockData 現在用訂位狀況判斷 */}
        <div className={styles.tag}>
          {restaurant.availability ? '有空位' : '無空位'}
        </div>
        <div className={styles.waitTime}>
          <p className={styles.text}>平均等待時間</p>
          <p className={styles.time}>{restaurant.waitTime}</p>
          <p className={styles.text}>分鐘</p>
        </div>
      </div>
    </div>
  )
}

function OrderHistory({ order }) {
  const pictureURL = 'https://107.22.142.48/pic/' + order.restaurantPic
  return (
    <div className={styles.order}>
      <div className={styles.picture}>
        <Image
          width={75}
          height={78}
          src={pictureURL}
          className={styles.restaurantPicture}
          alt=''
        />
        {getTags(order)}
      </div>
      <div className={styles.info}>
        <p className={styles.restaurantName}>{order.restaurantName}</p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          {getOrderContent(order)}{' '}
          <button className={styles.orderHistoryButton}>取消</button>
        </div>
      </div>
    </div>
  )
}

function Tag({ tag }) {
  return (
    <div className={styles.bookingTag}>
      <img className={styles.tick} src='/icon_tick.svg' alt='' />
      <p className={styles.text}>{tag}</p>
    </div>
  )
}
