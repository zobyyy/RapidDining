import { useState, useEffect } from 'react'

const useOrderPending = () => {
  const [order, setOrder] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function fetchOrderPending(encryptedPhone) {
    setIsLoading(true)

    try {
      const response = await fetch(
        `https://107.22.142.48/api/1.0/orders/pending?phone=${encryptedPhone}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      if (response.ok) {
        const data = await response.json()
        setOrder(data.data.order)

        setIsLoading(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return { order, fetchOrderPending, isLoading }
}

export default useOrderPending
