import React, { useRef, useEffect, useState } from 'react'
import styles from './Product.module.scss'
import Layouts from '@/components/Layouts'
import Image from 'next/image'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import useDishDetail from '@/hook/useDishDetail'

export default function Product() {
  Cookies.set('chooseOrderPosition', false)
  const router = useRouter()
  const { id } = router.query
  const { dishData } = useDishDetail(id)
  let customized = []
  if (dishData) {
    customized = dishData.data.customized
  }

  const [selectedOptions, setSelectedOptions] = useState({})
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
          <Image src='/minusDisabled.png' width={64} height={50} />
        ) : (
          <Image
            src='/minus.png'
            width={64}
            height={50}
            onClick={handleMinusClick}
            style={{
              cursor: ' pointer'
            }}
          />
        )}
        <div className={styles.productNumberButton}>{number}</div>
        <Image
          src='/plus.png'
          width={64}
          height={50}
          onClick={handlePlusClick}
          style={{
            cursor: ' pointer'
          }}
        />
      </div>
    )
  }
  const Customization = ({ customized }) => {
    const handleOptionClick = (type, optionId) => {
      setSelectedOptions((prevSelectedOptions) => {
        const newSelectedOptions = { ...prevSelectedOptions }

        // 如果已經選中了該選項，則取消選擇
        if (newSelectedOptions[type] === optionId) {
          newSelectedOptions[type] = null
        } else {
          newSelectedOptions[type] = optionId
        }

        return newSelectedOptions
      })
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
        {customized.map((option, index) => (
          <div key={index} className={styles.type}>
            {option.type}
            <div className={styles.options}>
              {option.option.map((subOption, subIndex) => (
                <div
                  key={subIndex}
                  className={`${styles.optionsName} ${
                    selectedOptions[option.type] === subOption.id
                      ? styles.selectedOption
                      : ''
                  }`}
                  onClick={() => handleOptionClick(option.type, subOption.id)}
                >
                  {subOption.taste}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }
  const handleAddToCart = () => {
    //cookies要存是甚麼商品的客製化+數量
    const selectedIds = Object.values(selectedOptions)
    const selectedNames = selectedIds.map((id) => {
      // 尋找選項
      const option = customized
        .flatMap((opt) => opt.option)
        .find((subOption) => subOption.id === id)

      // 如果找到選項，返回其口味；否則返回空字串
      return option ? option.taste : ''
    })
    const productChosen = {
      dish_id: dishData.data.dish_id,
      name: dishData.data.name,
      price: dishData.data.price,
      customization: selectedNames,
      quantity: number
    }

    // Cookies.set('CustomizationId', JSON.stringify(selectedIds)) //CustomizationId是要回傳給後端的
    // Cookies.set('CustomizationName', JSON.stringify(selectedNames))
    Cookies.set('productChosen', JSON.stringify(productChosen))
    console.log('Product Chosen:', JSON.stringify(productChosen))
    Cookies.get('restaurantId')
    router.push(`/Booking/${restaurantId}`)
  }
  return (
    <Layouts>
      <div style={{ width: '100%' }}>
        <Image
          src='/back.png'
          width={51}
          height={51}
          style={{
            zIndex: '2',
            position: 'absolute',
            margin: '3%',
            cursor: ' pointer'
          }}
          onClick={() => router.push('/Booking')}
        />
        <Image
          src='/product_義大利麵.png'
          width={390}
          height={220}
          style={{ zIndex: '1', position: 'absolute' }}
        />
        <div className={styles.product}>
          <div className={styles.storeInfo}>
            <div className={styles.storeName}>{dishData?.data.name}</div>
            <div className={styles.storeName}>NT${dishData?.data.price}</div>
            <div className={styles.storeAddress}>
              新鮮番茄醬與香料搭配，經典美味{' '}
            </div>
          </div>
        </div>
        <Customization customized={customized} />
        <div className={styles.buttonFixed}>
          <ProductNumber />
          <button
            className={styles.addCartButton}
            onClick={() => {
              handleAddToCart()
            }}
          >
            加入購物車
          </button>
        </div>
      </div>
    </Layouts>
  )
}
