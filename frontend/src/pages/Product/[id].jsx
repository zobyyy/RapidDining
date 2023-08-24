import React, { useRef, useEffect, useState } from 'react'
import styles from './Product.module.scss'
import Layouts from '@/components/Layouts'
import Image from 'next/image'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import useDishDetail from '@/hook/useDishDetail'
import { isEmptyArray } from 'formik'

export default function Product() {
  Cookies.set('chooseOrderPosition', false)
  const router = useRouter()
  const restaurantId = Cookies.get('restaurantsId')
  const { id } = router.query
  const { dishData, isLoading } = useDishDetail(id)
  const [productChosen, setProductChosen] = useState([])
  const [productChosenToBackend, setProductChosenToBackend] = useState([])
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

  const [audio, setAudio] = useState(null)

  useEffect(() => {
    setAudio(new Audio('/duck.mp3'))
  }, [])
  const ProductNumber = () => {
    const handlePlusClick = () => {
      audio.play()
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
  const CustomizationOption = ({ selected, onClick, taste }) => {
    return (
      <div
        className={`${styles.optionsName} ${
          selected ? styles.selectedOption : ''
        }`}
        onClick={onClick}
      >
        {taste}
      </div>
    )
  }
  const handleOptionClick = (type, optionId) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = { ...prevSelectedOptions }

      // 找到該客製化類型
      const customizationType = customized.find((opt) => opt.type === type)

      if (customizationType) {
        // 檢查客製化類型是否為 "配菜調整" 且允許多選
        const isMultiSelect = customizationType.type === '配菜調整'

        // 檢查該選項是否已經被選中
        const isSelected = newSelectedOptions[type]?.includes(optionId)

        if (isMultiSelect) {
          if (isSelected) {
            // 取消選擇該選項
            newSelectedOptions[type] = newSelectedOptions[type].filter(
              (id) => id !== optionId
            )
          } else {
            // 選擇該選項
            newSelectedOptions[type] = [
              ...(newSelectedOptions[type] || []),
              optionId
            ]
          }
        } else {
          // 單選，只選取一個選項
          newSelectedOptions[type] = isSelected ? [] : [optionId]
        }
      }

      return newSelectedOptions
    })
  }
  const Customization = ({
    customized,
    selectedOptions,
    handleOptionClick
  }) => {
    return (
      <div className={styles.customization}>
        {customized[0]?.type !== null && (
          <>
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
                  {option.option.map((subOption, subIndex) => {
                    const isSelected =
                      selectedOptions[option.type]?.includes(subOption.id) ??
                      false
                    return (
                      <CustomizationOption
                        key={subIndex}
                        selected={isSelected}
                        onClick={() =>
                          handleOptionClick(option.type, subOption.id)
                        }
                        taste={subOption.taste}
                      />
                    )
                  })}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    )
  }

  const selectedIds = Object.values(selectedOptions)
  //這是要傳給後端的客製化id
  const selectedIdsArray = selectedIds.reduce((result, subArray) => {
    // 排除空的子陣列
    if (subArray.length > 0) {
      // 合併子陣列的元素到結果陣列中
      result.push(...subArray)
    }
    return result
  }, [])
  console.log(selectedIdsArray)
  const selectedNames = selectedIdsArray.map((id) => {
    const option = customized
      .flatMap((opt) => opt.option)
      .find((subOption) => subOption.id === id)
    return option ? option.taste : ''
  })
  console.log('selectedNames', selectedNames)
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
  const newProductChosenToBackend = {
    dishId: dishData?.data.dish_id,
    customized: selectedIdsArray,
    quantity: number
  }
  const handleAddToCart = () => {
    const updatedProductChosen = [...productChosen, newProductChosen]
    const updatedProductChosenToBackend = [
      ...productChosenToBackend,
      newProductChosenToBackend
    ]
    setProductChosen(updatedProductChosen)
    setProductChosenToBackend(updatedProductChosenToBackend)
    Cookies.set('allProductChosen', JSON.stringify(updatedProductChosen))
    Cookies.set(
      'allProductChosenToBackend',
      JSON.stringify(updatedProductChosenToBackend)
    )
    router.push(`/Booking/${restaurantId}`)
  }
  useEffect(() => {
    const allProductChosen = Cookies.get('allProductChosen')
    const allProductChosenToBackend = Cookies.get('allProductChosenToBackend')
    const isProductChosen = allProductChosen !== undefined

    if (isProductChosen) {
      console.log('選過')
      const productChosenJSON = JSON.parse(allProductChosen)
      const productChosenJSONToBackend = JSON.parse(allProductChosenToBackend)
      setProductChosen(productChosenJSON)
      setProductChosenToBackend(productChosenJSONToBackend)
    } else {
      console.log('還沒選過')
    }
  }, [])
  return (
    <Layouts>
      {isLoading ? (
        <div
          style={{
            position: 'relative',
            display: 'flex',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div className={styles.ldsfacebook}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div style={{ width: '100%' }} className={styles.productLayout}>
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
          <Customization
            customized={customized}
            handleOptionClick={handleOptionClick}
            selectedOptions={selectedOptions}
          />
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
      )}
    </Layouts>
  )
}
