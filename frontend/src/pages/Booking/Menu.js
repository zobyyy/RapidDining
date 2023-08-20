import React, { useRef, useState, useEffect } from 'react'
import styles from './Booking.module.scss'
import Image from 'next/image'
import ProductColumn from './ProductColumn'

const Menu = ({ menuInfo }) => {
  const [activeKindIndex, setActiveKindIndex] = useState(0)
  const handleKindClick = (index) => {
    setActiveKindIndex(index)

    const kindId = `kind-${index}`

    const kindElement = document.getElementById(kindId)
    if (kindElement) {
      kindElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const Kinds = () => {
    return (
      <div className={styles.kindsContainer}>
        {menuInfo?.data?.menu.map((type, index) => (
          <div
            key={index}
            className={`${styles.kindsItem} ${
              activeKindIndex === index ? styles.activeKinds : ''
            }`}
            onClick={() => handleKindClick(index)}
          >
            {type.type}
          </div>
        ))}
      </div>
    )
  }
  const KindsArea = () => {
    return (
      <>
        {menuInfo?.data?.menu.map((type, index) => (
          <>
            <div
              key={index}
              // ref={kindsRefs[index]}
              className={styles.kindsTitle}
              id={`kind-${index}`}
            >
              {type.type}{' '}
            </div>
            {type.dishes.map((dish, index) => (
              <ProductColumn dish={dish} key={index} />
            ))}
          </>
        ))}
      </>
    )
  }

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
