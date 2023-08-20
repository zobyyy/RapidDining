import React, { useRef, useEffect, useState } from 'react'
import styles from './Booking.module.scss'
import Layouts from '@/components/Layouts'
import Image from 'next/image'
import Cookies from 'js-cookie'
import OrderPosition from './OrderPosition'
import OrderFood from './OrderFood'
import { useRouter } from 'next/router'
import useReservation from '@/hook/useReservation'
import Alert from '@/components/Alert'
import useMenu from '@/hook/useMenu'
import useRestaurantProfile from '@/hook/useRestaurantProfile'

export default function Booking() {
  const router = useRouter()
  const { id } = router.query
  const [chooseOrderPosition, setChooseOrderPosition] = useState(true)
  const { makeReservation, isAlert, reservationType } = useReservation()
  const { menuInfo } = useMenu(id)
  const { profileData } = useRestaurantProfile(id)
  console.log(profileData)

  useEffect(() => {
    const isChooseOrderPosition = Cookies.get('chooseOrderPosition')
    if (isChooseOrderPosition === 'false') {
      setChooseOrderPosition(false)
    }
  }, [])
  const handleChooseButtonOnclick = () => {
    setChooseOrderPosition(!chooseOrderPosition)
  }
  return (
    <Layouts>
      <div style={{ width: '100%', position: 'relative' }}>
        <Image
          src='/back.png'
          width={51}
          height={51}
          style={{
            zIndex: '2',
            position: 'absolute',
            margin: '3%',
            cursor: ' pointer'
          }}
          onClick={() => router.push('/')}
        />
        {isAlert && <Alert />}
        <Image
          src={profileData?.data?.picture || '/餐廳照片.png'}
          width={390}
          height={220}
          alt='餐廳照片'
        />
        <div className={styles.storeInfo}>
          <div className={styles.storeName}>
            {profileData?.data?.name || '餐廳名稱'}
          </div>
          <div className={styles.storeAddress}>
            {profileData?.data?.address || '餐廳地址'}
          </div>
          <div className={styles.storePhone}>
            {profileData?.data?.phone || '餐廳電話'}
          </div>
        </div>
        <div className={styles.orderChoose}>
          <button
            style={{
              borderBottom: !chooseOrderPosition && '8px solid #F5F5F5'
            }}
            onClick={handleChooseButtonOnclick}
          >
            我要訂位
          </button>
          <button
            style={{
              borderBottom: chooseOrderPosition && '8px solid #F5F5F5'
            }}
            onClick={handleChooseButtonOnclick}
          >
            我要訂餐
          </button>
        </div>
        {chooseOrderPosition ? (
          <OrderPosition
            handleChooseButtonOnclick={handleChooseButtonOnclick}
            reservationType={reservationType}
            makeReservation={makeReservation}
            setChooseOrderPosition={setChooseOrderPosition}
          />
        ) : (
          <div>
            <OrderFood menuInfo={menuInfo} />
          </div>
        )}
      </div>
    </Layouts>
  )
}
