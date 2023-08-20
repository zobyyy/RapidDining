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
  const restaurantId = Cookies.get('restaurantId')
  const { id } = router.query
  const { dishData } = useDishDetail(id)
  const [productChosen, setProductChosen] = useState([])
  let customized = []

  let dish_id = ''
  let name = ''
  let price = 0
  let picture = ''

  if (dishData) {
    customized = dishData.data.customized
    dish_id = dishData.data.dish_id
    name = dishData.data.name
    price = dishData.data.price
    picture = dishData.data.picture
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

  //   要給後端的requestbody：
  //   tableId (有位置才有/null)
  //   reservationId (候位/null)
  //   items:
  // "dishId": 1,
  // "customized": [{"dishoptionId": 1}, {"dishoptionId": 3}]
  //   created_at
  // total(總價格)
  // name(外帶/內用null)
  // phone(外帶/內用null)
  const selectedIds = Object.values(selectedOptions) //這是要傳給後端的客製化id
  const selectedNames = selectedIds.map((id) => {
    const option = customized
      .flatMap((opt) => opt.option)
      .find((subOption) => subOption.id === id)
    return option ? option.taste : ''
  })
  //前端呈現在購物車的

  const newProductChosen = {
    dish_id: dish_id,
    name: name,
    price: price,
    customization: selectedNames,
    quantity: number,
    picture: picture
  }
  console.log('newProductChosen', newProductChosen)
  //傳給後端的是商品的「dishId+客製化選項+餐點數量」三個
  const productChosenToBackend = {
    dish_id: dishData?.data.dish_id,
    customization: selectedIds,
    quantity: number
  }
  const handleAddToCart = () => {
    const updatedProductChosen = [...productChosen, newProductChosen]
    setProductChosen(updatedProductChosen)
    Cookies.set('allProductChosen', JSON.stringify(updatedProductChosen))
    router.push(`/Booking/${restaurantId}`)
  }
  useEffect(() => {
    const allProductChosen = Cookies.get('allProductChosen')
    const isProductChosen = allProductChosen !== undefined

    if (isProductChosen) {
      console.log('選過')
      const productChosenJSON = JSON.parse(allProductChosen)
      setProductChosen(productChosenJSON)
    } else {
      console.log('還沒選過')
    }
  }, [])
  // const allProductChosen = Cookies.get('allProductChosen')
  // const isProductChosen = allProductChosen !== undefined

  // useEffect(() => {
  //   if (isProductChosen) {
  //     //true就是已經選過了
  //     console.log('選過')
  //     const productChosenJSON = [JSON.parse(allProductChosen)]
  //     console.log('productChosenJSON', productChosenJSON)
  //     const updatedAllProductChosen = [...productChosenJSON, newProductChosen]
  //     console.log('updatedAllProductChosen', updatedAllProductChosen)
  //     setProductChosen(JSON.stringify(updatedAllProductChosen))
  //   } else {
  //     console.log('還沒選過')
  //     setProductChosen(JSON.stringify(newProductChosen))
  //   }
  // }, [setProductChosen])
  // const handleAddToCart = () => {
  //   Cookies.set('allProductChosen', productChosen)
  //   router.push(`/Booking/${restaurantId}`)
  // }
  // console.log('productChosen', productChosen)
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
          onClick={() => router.push(`/Booking/${restaurantId}`)}
        />
        <Image
          src={dishData?.data.picture || '/product_義大利麵.png'}
          width={390}
          height={220}
          style={{ zIndex: '1', position: 'absolute', objectFit: 'cover' }}
        />
        <div className={styles.product}>
          <div className={styles.storeInfo}>
            <div className={styles.storeName}>{dishData?.data.name}</div>
            <div className={styles.storeName}>NT${dishData?.data.price}</div>
            <div className={styles.storeAddress}>
              {dishData?.data.description}
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
