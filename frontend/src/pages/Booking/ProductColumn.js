import React, { useState } from 'react'
import styles from './Booking.module.scss'
import Image from 'next/image'
import Cookies from 'js-cookie'

const ProductColumn = ({ dish }) => {
  const [isChosen, setIsChosen] = useState(true)
  if (dish === undefined) {
    return
  }
  const handleProductClick = () => {
    Cookies.set('dishId', dish.id)
    window.location.href = `/Product/${dish.id}`
  }

  return (
    <div className={styles.productCol}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '70%' }}>
          <div className={styles.productName}>{dish.name}</div>
          <div className={styles.productIntro}>{dish.description}</div>
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
          <Image src={dish.picture || '/義大利麵.png'} width={83} height={83} />
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
          {dish.spicy && <Image src='/辣.png' width={36} height={22} />}
          {dish.vegan && <Image src='/素食.png' width={45} height={22} />}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '20px'
          }}
        >
          <div className={styles.productPrice}>NT${dish.price}</div>
          {isChosen && <div className={styles.productChosenQuantity}>1</div>}

          <Image
            src='/AddProduct.png'
            width={27}
            height={27}
            className={styles.productAdd}
            onClick={handleProductClick}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductColumn
