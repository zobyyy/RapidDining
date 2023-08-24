import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

const useCheckout = () => {
  const [message, setMessage] = useState('');
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
        console.log('checkout!')
      } else {
        const data = await response.json()
        setMessage(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return { message, handleCheckout }
}

export default useCheckout
