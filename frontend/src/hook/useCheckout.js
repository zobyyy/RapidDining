import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

const useCheckout = () => {
  const [updateOrderId, setUpdateOrderId] = useState(null)
  const router = useRouter()
  const [audio, setAudio] = useState(null)

  useEffect(() => {
    setAudio(new Audio('/cash.mp3'))
  }, [])

  const handleCheckout = async (orderId) => {
    audio.play()

    try {
      const response = await fetch(
        `https://107.22.142.48/api/1.0/orders/${orderId}/checkout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.ok) {
        const data = await response.json()
        console.log('hi', data.data.orders.id)
        setUpdateOrderId(data.data)
        setTimeout(() => {
          router.push('/OrderSubmit')
        }, 50)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return { handleCheckout }
}

export default useCheckout
