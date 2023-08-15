import React from 'react'
import styles from './Booking.module.scss'
import Image from 'next/image'

const ProductColumn = () => {
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
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        <div className={styles.productPrice}>NT$295</div>
        <Image
          src='/AddProduct.png'
          width={27}
          height={27}
          className={styles.productAdd}
        />
      </div>
    </div>
  )
}

export default ProductColumn
