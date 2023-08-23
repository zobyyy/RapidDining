import React, { useState, useEffect } from 'react'
import styles from './Cart.module.scss'
import Image from 'next/image'
import Cookies from 'js-cookie'

const ProductColumn = ({ productChosen, total, setTotal, setIsAdd }) => {
  const [number, setNumber] = useState(productChosen?.quantity)
  useEffect(() => {
    const allProductChosenToBackend = JSON.parse(
      Cookies.get('allProductChosenToBackend')
    )
    const allProductChosen = JSON.parse(Cookies.get('allProductChosen'))

    const updatedProductChosen = allProductChosen.map((item) => {
      if (item.dish_id === productChosen.dish_id) {
        return { ...item, quantity: number }
      }
      return item
    })

    const updatedProductChosenToBackend = allProductChosenToBackend.map(
      (item) => {
        if (item.dishId === productChosen.dish_id) {
          return { ...item, quantity: number }
        }
        return item
      }
    )

    Cookies.set('allProductChosen', JSON.stringify(updatedProductChosen))
    Cookies.set(
      'allProductChosenToBackend',
      JSON.stringify(updatedProductChosenToBackend)
    )
  }, [number])
  const ProductNumber = () => {
    const handlePlusClick = () => {
      const newNumber = number + 1
      setNumber(newNumber)
      const newTotalPrice = productChosen?.price * newNumber
      setTotal(newTotalPrice)
    }

    const handleMinusClick = () => {
      if (number > 1) {
        const newNumber = number - 1
        setNumber(newNumber)
        const newTotalPrice = productChosen?.price * newNumber
        setTotal(newTotalPrice)
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
    console.log('productChosen', productChosen)
    const allProductChosenToBackend = JSON.parse(
      Cookies.get('allProductChosenToBackend')
    )
    const allProductChosen = JSON.parse(Cookies.get('allProductChosen'))

    const updatedProductChosen = allProductChosen.filter(
      (item) => item.dish_id !== productChosen.dish_id
    )
    Cookies.set('allProductChosen', JSON.stringify(updatedProductChosen))

    const updatedProductChosenToBackend = allProductChosenToBackend.filter(
      (item) => item.dishId !== productChosen.dish_id
    )

    Cookies.set(
      'allProductChosenToBackend',
      JSON.stringify(updatedProductChosenToBackend)
    )

    if (updatedProductChosen.length === 0) {
      // 移除 Cookies
      Cookies.remove('allProductChosenToBackend')
      Cookies.remove('allProductChosen')
      setIsAdd(false)
    }
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }

  const totalPrice = productChosen?.price * number

  return (
    <div className={styles.productCol}>
      <div>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
          <Image
            src={productChosen?.picture || '/義大利麵.png'}
            width={42}
            height={42}
            style={{ objectFit: 'cover' }}
          />
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '5px'
            }}
          >
            <div className={styles.productName}>{productChosen?.name}</div>
            <div className={styles.productPrice}>NT${productChosen?.price}</div>
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end'
              }}
            >
              <div>
                {productChosen?.customization &&
                  productChosen?.customization.map((item, index) => (
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
            alt='delete'
            src='/delete.png'
            width={24}
            height={24}
            onClick={() => handleDeleteClick(productChosen?.dish_id)}
            style={{
              cursor: 'pointer'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductColumn
