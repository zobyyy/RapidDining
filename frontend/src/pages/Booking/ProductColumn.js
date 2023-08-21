import React, { useState, useEffect } from 'react'
import styles from './Booking.module.scss'
import Image from 'next/image'
import Cookies from 'js-cookie'

const ProductColumn = ({ dish }) => {
  const [isChosen, setIsChosen] = useState(true)
  const [chosenQuantity, setChosenQuantity] = useState(0)

  if (dish === undefined) {
    return
  }
  const handleProductClick = () => {
    Cookies.set('dishId', dish.id)
    window.location.href = `/Product/${dish.id}`
  }
  useEffect(() => {
    if (Cookies.get('allProductChosen')) {
      const allProductChosen = JSON.parse(Cookies.get('allProductChosen'))
      const chosenItem = allProductChosen.find(
        (item) => item.dish_id === dish.id
      )
      if (chosenItem) {
        setIsChosen(true)
        setChosenQuantity(chosenItem.quantity)
      } else {
        setIsChosen(false)
        setChosenQuantity(0)
      }
    }
  }, [dish.id])
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
          <Image
            src={dish.picture || '/義大利麵.png'}
            width={83}
            height={83}
            style={{ objectFit: 'cover' }}
            alt='product'
          />
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
          {dish.spicy && (
            <Image src='/辣.png' width={36} height={22} alt='辣' />
          )}
          {dish.vegan && (
            <Image src='/素食.png' width={45} height={22} alt='素食' />
          )}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '20px'
          }}
        >
          <div className={styles.productPrice}>NT${dish.price}</div>
          {chosenQuantity !== 0 && (
            <div className={styles.productChosenQuantity}>{chosenQuantity}</div>
          )}

          <Image
            alt='AddProduct'
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
