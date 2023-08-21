import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

const useOrderRequest = () => {
  const [orderId, setOrderId] = useState(null)
  const router = useRouter()

  const orderRequest = async (requestBody) => {
    try {
      const response = await fetch(
        `https://107.22.142.48/api/1.0/orders/request`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        }
      )

      if (response.ok) {
        const data = await response.json()
        // setOrderId(data.orders.id)
        console.log('hi', data.data.orders.id)
        Cookies.set('orderId', data.data.orders.id)

        Cookies.remove('allProductChosenToBackend')
        Cookies.remove('allProductChosen')
        Cookies.remove('userName')
        Cookies.remove('dishId')
        Cookies.remove('reservationId')
        Cookies.remove('userGender')
        Cookies.remove('isEatHere')
        Cookies.remove('tableId')
        Cookies.remove('phone')
        Cookies.remove('isReserved')
        Cookies.remove('totalPrice')
        Cookies.remove('chooseOrderPosition')
        router.push('/OrderSubmit')
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    orderRequest()
  }, [])

  return { orderRequest }
}

export default useOrderRequest
