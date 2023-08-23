import Link from 'next/link'
import { useState } from 'react'
import styles from './Home.module.scss'
import Image from 'next/image'
import useCancel from '@/hook/useCancel'
import Alert from '@/components/Alert'

function getOrderContent(order) {
  if (
    order.tableId !== null &&
    order.reservationId === null &&
    order.status === null &&
    order.orderId === null
  ) {
    return (
      //只有訂位 沒訂餐
      <div className={styles.orderInfo}>
        <div className={styles.text}>請於10分鐘內抵達</div>
      </div>
    )
  } else if (
    order.tableId !== null &&
    order.orderId !== null &&
    order.status === null &&
    order.reservationId === null
  ) {
    return (
      //訂位+訂餐
      <div className={styles.orderInfo}>
        <div className={styles.text}>請於10分鐘內抵達</div>
        <div className={styles.text}>訂餐編號：{order.orderId}</div>
      </div>
    )
  } else if (
    order.tableId === null &&
    order.orderId !== null &&
    order.status !== null &&
    order.reservationId !== null
  ) {
    return (
      //候位有訂餐
      <div className={styles.orderInfo}>
        <div className={styles.text}>候位第{order.status}組</div>
        <div className={styles.text}>訂餐編號：{order.orderId}</div>
      </div>
    )
  } else if (
    order.tableId === null &&
    order.orderId === null &&
    order.reservationId !== null &&
    order.status !== null
  ) {
    return (
      //只有候位沒訂餐
      <div className={styles.orderInfo}>
        <div className={styles.text}>候位第{order.status}組</div>
      </div>
    )
  } else if (
    order.tableId === null &&
    order.reservationId === null &&
    order.status === null &&
    order.orderId !== null
  ) {
    //外帶
    return (
      <div className={styles.orderInfo}>
        <div className={styles.text}>訂餐編號：{order.orderId}</div>
      </div>
    )
  }
}
function getTags(order) {
  if (
    (order.tableId !== null || order.reservationId !== null) &&
    order.orderId === null
  ) {
    return <Tag tag={'已訂位'} />
  } else if (
    (order.tableId !== null || order.reservationId !== null) &&
    order.orderId !== null
  ) {
    return (
      <>
        <Tag tag={'已訂位'} />
        <Tag tag={'已訂餐'} />
      </>
    )
  } else if (
    order.tableId === null &&
    order.reservationId === null &&
    order.status === null &&
    order.orderId !== null
  ) {
    return <Tag tag={'已訂餐'} />
  }
}

export default function Restaurant({ type, restaurant, order, phone }) {
  const { cancleReservation, cancleBooking } = useCancel({
    phone,
    restaurantId: order?.restaurantId
  })
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
        order && (
          <OrderHistory
            order={order}
            phone={phone}
            cancleReservation={cancleReservation}
            cancleBooking={cancleBooking}
          />
        )
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

function OrderHistory({ order, cancleReservation, cancleBooking }) {
  const [isCancelAlert, setIsCancelAlert] = useState(false)
  const handleCancel = () => {
    if (
      order.tableId !== null &&
      order.reservationId === null &&
      order.status === null
    ) {
      // 訂位
      cancleBooking()
    } else if (
      order.tableId === null &&
      order.reservationId !== null &&
      order.status !== null
    ) {
      // 候位
      cancleReservation()
    }
  }

  const pictureURL = 'https://107.22.142.48/pic/' + order.restaurantPic
  return (
    <div className={styles.order}>
      {isCancelAlert && (
        <Alert
          setIsAlert={setIsCancelAlert}
          title='確定取消？'
          context='真的要取消？'
          status='option'
          yes='保留'
          no='取消訂位'
          onClickHandle={handleCancel}
        />
      )}
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
      <div
        className={styles.info}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-around'
        }}
      >
        <p className={styles.restaurantName}>{order.restaurantName}</p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%'
          }}
        >
          {getOrderContent(order)}
          <button
            className={styles.orderHistoryButton}
            onClick={() => setIsCancelAlert(true)}
          >
            取消
          </button>
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
