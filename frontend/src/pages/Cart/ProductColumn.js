import React, { useState, useEffect } from 'react'
import styles from './Cart.module.scss'
import Image from 'next/image'
import Cookies from 'js-cookie'

const ProductColumn = ({ productChosen, total, setTotal }) => {
  const [number, setNumber] = useState(1)
  // useEffect(() => {
  //   if (productChosen) {
  //     setNumber(productChosen.quantity)
  //   }
  // }, [productChosen])
  // useEffect(() => {
  //   if (productChosen) {
  //     const updatedProductChosen = { ...productChosen, quantity: number }
  //     Cookies.set('productChosen', JSON.stringify(updatedProductChosen))
  //     console.log(productChosen)
  //   }
  // }, [number, productChosen])
  useEffect(() => {
    if (productChosen) {
      setNumber(productChosen.quantity)
      const updatedProductChosen = { ...productChosen, quantity: number }
      Cookies.set('productChosen', JSON.stringify(updatedProductChosen))
      const totalPrice = productChosen.price * number
      Cookies.set(
        'totalPrice',
        parseInt(Cookies.get('totalPrice')) + totalPrice
      )
      setTotal(total + totalPrice)
    }
  }, [number, productChosen, setTotal])
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
            style={{
              cursor: ' pointer'
            }}
          />
        )}
        <div className={styles.productNumberButton}>{number}</div>
        <Image
          src='/plus.png'
          width={36}
          height={34}
          onClick={handlePlusClick}
          style={{
            cursor: ' pointer'
          }}
        />
      </div>
    )
  }

  const handleDeleteClick = () => {
    Cookies.remove('productChosen')
    window.location.reload()
  }

  if (!productChosen) {
    return (
      <div className={styles.productCol}>
        <div className={styles.productName}>尚未有商品加入</div>
      </div>
    )
  }

  const totalPrice = productChosen.price * number

  Cookies.set('totalPrice', parseInt(Cookies.get('totalPrice')) + totalPrice)

  // useEffect(() => {
  //   setTotal(total + totalPrice)
  // }, [totalPrice])
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
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end'
              }}
            >
              <div>
                {productChosen.customization.map((item, index) => (
                  <div key={index} className={styles.customizationItem}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <div className={styles.productPrice}>NT${totalPrice}</div>
          <Image
            src='/delete.png'
            width={24}
            height={24}
            onClick={handleDeleteClick}
            style={{
              cursor: ' pointer'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductColumn
