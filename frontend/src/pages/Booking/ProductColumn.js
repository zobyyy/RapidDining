import React, { useState } from 'react'
import styles from './Booking.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router'

const ProductColumn = () => {
  const router = useRouter()
  const [isChosen, setIsChosen] = useState(false)

  return (
    <div className={styles.productCol}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '70%' }}>
          <div className={styles.productName}>經典番茄義大利麵</div>
          <div className={styles.productIntro}>
            新鮮番茄醬與香料搭配，經典美味
          </div>
        </div>
        <div
          style={{
            width: '30%',
            display: 'flex',
            flexDirection: 'row',

            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <Image src='/義大利麵.png' width={83} height={83} />
        </div>
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          marginTop: '12px',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '5px'
          }}
        >
          {/* 判斷API取得的資料 vegan和spicy為true or false */}
          <Image src='/辣.png' width={36} height={22} />
          <Image src='/素食.png' width={45} height={22} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '20px'
          }}
        >
          <div className={styles.productPrice}>NT$295</div>
          {isChosen && <div className={styles.productChosenQuantity}>1</div>}

          <Image
            src='/AddProduct.png'
            width={27}
            height={27}
            className={styles.productAdd}
            onClick={() => router.push('/Product')}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductColumn
