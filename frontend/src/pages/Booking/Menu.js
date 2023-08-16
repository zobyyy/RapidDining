import React from 'react'
import styles from './Booking.module.scss'
import Image from 'next/image'
import ProductColumn from './ProductColumn'

const Kinds = () => {
  const mockData = ['主食', '咖啡', '其他飲品', '甜點']
  return (
    <div className={styles.scrollContainer}>
      {mockData.map((text, index) => (
        <div key={index} className={styles.kindsItem}>
          {text}
        </div>
      ))}
    </div>
  )
}
const KindsArea = () => {
  return (
    <>
      <div className={styles.kindsTitle}>主食</div>
      <ProductColumn
      // productQuantities={productQuantities}
      // productChosen={productChosen}
      />
    </>
  )
}

const Menu = () => {
  return (
    <>
      <div>
        <Image src='/banner.png' alt='banner' width={340} height={177} />
      </div>
      <Kinds />
      <KindsArea />
    </>
  )
}

export default Menu
