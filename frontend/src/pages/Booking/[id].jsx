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
import useCancel from '@/hook/useCancel'

export default function Booking() {
  const router = useRouter()
  const { id } = router.query
  Cookies.set('restaurantsId', id)
  const [chooseOrderPosition, setChooseOrderPosition] = useState(true) //訂位or訂餐
  const { makeReservation, isAlert, setIsAlert, reservationType } =
    useReservation()
  const { menuInfo } = useMenu(id)
  const { profileData, isLoading } = useRestaurantProfile(id)
  const [isEatHere, setIsEatHere] = useState(false)
  const [isCancelAlert, setIsCancelAlert] = useState(false)
  const [isWaitingCancelAlert, setIsWaitingCancelAlert] = useState(false)
  const [isChangeAlert, setIsChangeAlert] = useState(false)

  const phone = Cookies.get('phone')
  const restaurantId = parseInt(Cookies.get('restaurantsId'))
  const { cancleReservation, cancleBooking } = useCancel({
    phone,
    restaurantId
  })
  useEffect(() => {
    if (Cookies.get('isReserved')) {
      if (Cookies.get('isReserved').includes(id)) {
        setIsEatHere(true)
        Cookies.set('isEatHere', true)
      } else {
        setIsEatHere(false)
        Cookies.set('isEatHere', false)
      }
    }
  }, [chooseOrderPosition])
  useEffect(() => {
    const isChooseOrderPosition = Cookies.get('chooseOrderPosition')
    if (isChooseOrderPosition === 'false') {
      setChooseOrderPosition(false)
    }
  }, [])

  return (
    <Layouts>
      {isLoading ? (
        <div
          style={{
            position: 'relative',
            display: 'flex',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div className={styles.ldsfacebook}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
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
          {isAlert && (
            <Alert
              setIsAlert={setIsAlert}
              title='訂位失敗'
              context='該手機號碼已預訂過餐廳'
              status='ok'
            />
          )}
          {isChangeAlert && (
            <Alert
              setIsAlert={setIsChangeAlert}
              title='您目前有外帶訂單，要將該訂單改成內用嗎？'
              context=''
              status='option'
              yes='保持外帶'
              no='改成內用'
              // onClickHandle={cancleBooking}
            />
          )}
          {isCancelAlert && (
            <Alert
              setIsAlert={setIsCancelAlert}
              title='確定取消？'
              context='真的要取消？'
              status='option'
              yes='保留'
              no='取消訂位'
              onClickHandle={cancleBooking}
            />
          )}

          {isWaitingCancelAlert && (
            <Alert
              setIsAlert={setIsWaitingCancelAlert}
              title='確定取消？'
              context='真的要取消？'
              status='option'
              yes='保留'
              no='取消候位'
              onClickHandle={cancleReservation}
            />
          )}
          <Image
            src={profileData?.data?.picture || '/餐廳照片.png'}
            width={390}
            height={220}
            alt='餐廳照片'
            style={{ objectFit: 'cover' }}
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
              onClick={() => setChooseOrderPosition(true)}
            >
              我要訂位
            </button>
            <button
              style={{
                borderBottom: chooseOrderPosition && '8px solid #F5F5F5'
              }}
              onClick={() => setChooseOrderPosition(false)}
            >
              我要訂餐
            </button>
          </div>
          {chooseOrderPosition ? (
            <OrderPosition
              reservationType={reservationType}
              makeReservation={makeReservation}
              setChooseOrderPosition={setChooseOrderPosition}
              setIsWaitingCancelAlert={setIsWaitingCancelAlert}
              setIsCancelAlert={setIsCancelAlert}
              setIsChangeAlert={setIsChangeAlert}
            />
          ) : (
            <div>
              <OrderFood
                menuInfo={menuInfo}
                isEatHere={isEatHere}
                profileData={profileData}
              />
            </div>
          )}
        </div>
      )}
    </Layouts>
  )
}
