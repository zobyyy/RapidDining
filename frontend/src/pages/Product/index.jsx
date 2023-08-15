import React, { useRef, useEffect, useState } from 'react'
import styles from './Product.module.scss'
import Layouts from '@/components/Layouts'
import Image from 'next/image'
import Cookies from 'js-cookie'
const mockData = {
  data: {
    dish_id: '1',
    name: '經典番茄義大利麵',
    price: '295',
    picture: 'pasta.jpg',
    description: '新鮮番茄醬與香料搭配，經典美味',
    options: [
      {
        type: '辣度調整',
        options: [
          {
            id: 1,
            name: '微辣'
          },
          {
            id: 3,
            name: '中辣'
          }
        ]
      },
      {
        type: '配菜調整',
        options: [
          {
            id: 5,
            name: '不要番茄'
          }
        ]
      }
    ]
  }
}

const { options } = mockData.data
const ProductNumber = () => {
  const [number, setNumber] = useState(1)
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
        <Image src='/minusDisabled.png' width={64} height={50} />
      ) : (
        <Image
          src='/minus.png'
          width={64}
          height={50}
          onClick={handleMinusClick}
        />
      )}
      <div className={styles.productNumberButton}>{number}</div>
      <Image src='/plus.png' width={64} height={50} onClick={handlePlusClick} />
    </div>
  )
}

export default function Product() {
  const [selectedOptions, setSelectedOptions] = useState({})
  const Customization = ({ options }) => {
    const handleOptionClick = (type, optionId) => {
      setSelectedOptions((prevSelectedOptions) => ({
        ...prevSelectedOptions,
        [type]: optionId
      }))
    }

    return (
      <div>
        <div
          style={{
            padding: '2% 10%',
            fontSize: '16px',
            borderBottom: '1px solid #F5F5F5'
          }}
        >
          依你喜好
        </div>
        {options.map((option, index) => (
          <div key={index} className={styles.type}>
            {option.type}
            <div className={styles.options}>
              {option.options.map((subOption, subIndex) => (
                <div
                  key={subIndex}
                  className={`${styles.optionsName} ${
                    selectedOptions[option.type] === subOption.id
                      ? styles.selectedOption
                      : ''
                  }`}
                  onClick={() => handleOptionClick(option.type, subOption.id)}
                >
                  {subOption.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }
  const handleAddToCart = () => {
    const selectedIds = Object.values(selectedOptions)
    const selectedNames = selectedIds.map(
      (id) =>
        options
          .flatMap((opt) => opt.options)
          .find((subOption) => subOption.id === id).name
    )
    Cookies.set('CustomizationId', JSON.stringify(selectedIds))
    Cookies.set('CustomizationName', JSON.stringify(selectedNames))
    console.log('Selected Options:', JSON.stringify(selectedIds))
    console.log('Selected Options:', JSON.stringify(selectedNames))
  }
  return (
    <Layouts>
      <div style={{ width: '100%' }}>
        <Image
          src='/back.png'
          width={51}
          height={51}
          style={{ zIndex: '2', position: 'absolute', margin: '3%' }}
        />
        <Image
          src='/product_義大利麵.png'
          width={390}
          height={220}
          style={{ zIndex: '1', position: 'absolute' }}
        />
        <div className={styles.product}>
          <div className={styles.storeInfo}>
            <div className={styles.storeName}>經典番茄義大利麵</div>
            <div className={styles.storeName}>NT$295</div>
            <div className={styles.storeAddress}>
              新鮮番茄醬與香料搭配，經典美味{' '}
            </div>
          </div>
        </div>
        <Customization options={options} />
        <div className={styles.buttonFixed}>
          <ProductNumber />
          <button className={styles.addCarButton} onClick={handleAddToCart}>
            加入購物車
          </button>
        </div>
      </div>
    </Layouts>
  )
}
