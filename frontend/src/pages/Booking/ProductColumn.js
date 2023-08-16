import React, { useState } from 'react'
import styles from './Booking.module.scss'
import Image from 'next/image'
import Cookies from 'js-cookie'

const ProductColumn = ({ productChosen }) => {
  const [isChosen, setIsChosen] = useState(true)
  if (productChosen === undefined) {
    return
  }
  const handleProductClick = () => {
    Cookies.set('productId', productChosen.id)
    window.location.href = `/Product/${productChosen.id}`
  }
  return (
    <div className={styles.productCol}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '70%' }}>
          <div className={styles.productName}>{productChosen.name}</div>
          <div className={styles.productIntro}>{productChosen.description}</div>
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
          {productChosen.spicy && (
            <Image src='/辣.png' width={36} height={22} />
          )}
          {productChosen.vegan && (
            <Image src='/素食.png' width={45} height={22} />
          )}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '20px'
          }}
        >
          <div className={styles.productPrice}>NT${productChosen.price}</div>
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
