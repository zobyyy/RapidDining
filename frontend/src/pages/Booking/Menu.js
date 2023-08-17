import React, { useRef } from 'react'
import styles from './Booking.module.scss'
import Image from 'next/image'
import ProductColumn from './ProductColumn'
const mockData = {
  data: {
    menu: [
      {
        type: '主食',
        product: [
          {
            id: 1,
            name: '經典番茄義大利麵',
            description: '新鮮番茄醬與香料搭配，經典美味!',
            price: 295,
            picture: '<https://coffee.com/XXXXX>',
            spicy: true,
            vegan: false
          },
          {
            id: 2,
            name: '烤蔬菜三明治',
            price: 295,
            description: '多種時令蔬菜，搭配特製醬汁，口感豐富',
            picture: '<https://lattee.com/XXXXX>',
            type: '主食',
            spicy: true,
            vegan: true
          },
          {
            id: 3,
            name: '藍莓雞肉沙拉',
            description: '優雅的義大式風味，融合藍莓的清新酸甜',
            price: 300,
            picture: '<https://coffee.com/XXXXX>',
            type: '主食',
            spicy: false,
            vegan: false
          },
          {
            id: 4,
            name: '藍莓雞肉沙拉',
            description: '優雅的義大式風味，融合藍莓的清新酸甜',
            price: 300,
            picture: '<https://coffee.com/XXXXX>',
            type: '主食',
            spicy: false,
            vegan: false
          },
          {
            id: 5,
            name: '藍莓雞肉沙拉',
            description: '優雅的義大式風味，融合藍莓的清新酸甜',
            price: 300,
            picture: '<https://coffee.com/XXXXX>',
            type: '主食',
            spicy: false,
            vegan: false
          }
        ]
      },
      {
        type: '咖啡',
        product: [
          {
            id: 4,
            name: '拿鐵特調',
            price: 295,
            description: '濃郁咖啡香，與絲滑牛奶交織，絕佳口感',
            picture: '<https://lattee.com/XXXXX>',
            spicy: false,
            vegan: false
          }
        ]
      }
    ],

    next_cursor: 'KHEAX0GAFjlPyyqAqTcQOXTLKgIVvshji9AqRmuAGjCDESoLlUrrIn7P'
  }
}

const Menu = () => {
  const kindsRefs = mockData.data.menu.map(() => useRef(null))
  const scrollToKinds = (index) => {
    kindsRefs[index].current.scrollIntoView({
      behavior: 'smooth'
    })
  }
  const Kinds = () => {
    return (
      <div className={styles.scrollContainer}>
        {mockData.data.menu.map((type, index) => (
          <div
            key={index}
            className={styles.kindsItem}
            onClick={() => scrollToKinds(index)}
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
        {mockData.data.menu.map((type, index) => (
          <>
            <div
              key={index}
              ref={kindsRefs[index]}
              className={styles.kindsTitle}
            >
              {type.type}
            </div>
            {type.product.map((product, index) => (
              <ProductColumn product={product} key={index} />
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
