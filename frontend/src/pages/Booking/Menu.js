import React from 'react'
import styles from './Booking.module.scss'
import Image from 'next/image'
import ProductColumn from './ProductColumn'
const mockData = {
  data: {
    menu: [
      {
        id: 1,
        name: '經典番茄義大利麵',
        description: '新鮮番茄醬與香料搭配，經典美味!',
        price: 295,
        picture: '<https://coffee.com/XXXXX>',
        type: '主食',
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
        price: 295,
        picture: '<https://coffee.com/XXXXX>',
        type: '主食',
        spicy: false,
        vegan: false
      },
      {
        id: 4,
        name: '拿鐵特調',
        price: 295,
        description: '濃郁咖啡香，與絲滑牛奶交織，絕佳口感',
        picture: '<https://lattee.com/XXXXX>',
        type: '咖啡',
        spicy: false,
        vegan: false
      }
    ],

    next_cursor: 'KHEAX0GAFjlPyyqAqTcQOXTLKgIVvshji9AqRmuAGjCDESoLlUrrIn7P'
  }
}
// 整理總共有甚麼type值
const typeSet = new Set()
mockData.data.menu.forEach((item) => {
  typeSet.add(item.type)
})
const uniqueTypes = Array.from(typeSet)
console.log(uniqueTypes) // 輸出所有不同的 type 值

const Menu = () => {
  const Kinds = () => {
    return (
      <div className={styles.scrollContainer}>
        {uniqueTypes.map((text, index) => (
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
        {uniqueTypes.map((text, index) => (
          <div key={index} className={styles.kindsTitle}>
            {text}
          </div>
        ))}

        {mockData.data.menu.map((productChosen, index) => (
          <ProductColumn productChosen={productChosen} />
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
