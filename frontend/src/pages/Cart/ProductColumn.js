import React, { useState } from 'react'
import styles from './Cart.module.scss'
import Image from 'next/image'

const ProductColumn = ({ productChosen }) => {
  const [number, setNumber] = useState(1)

  const ProductNumber = () => {
    const handlePlusClick = () => {
      setNumber(number + 1)
    }

    const handleMinusClick = () => {
      if (number > 1) {
        setNumber(number - 1)
      }
    }
    return (
      <div className={styles.productNumber}>
        {number === 1 ? (
          <Image src='/minusDisabled.png' width={36} height={34} />
        ) : (
          <Image
            src='/minus.png'
            width={36}
            height={34}
            onClick={handleMinusClick}
          />
        )}
        <div className={styles.productNumberButton}>{number}</div>
        <Image
          src='/plus.png'
          width={36}
          height={34}
          onClick={handlePlusClick}
        />
      </div>
    )
  }
  const totalPrice = productChosen.price * number

  return (
    <div className={styles.productCol}>
      <div>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
          <Image src='/義大利麵.png' width={42} height={42} />
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '5px'
            }}
          >
            <div className={styles.productName}>{productChosen.name}</div>
            <div className={styles.productPrice}>NT${productChosen.price}</div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          marginTop: '5px',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <ProductNumber />
        <div className={styles.productPrice}>NT${totalPrice}</div>
      </div>
    </div>
  )
}

export default ProductColumn
