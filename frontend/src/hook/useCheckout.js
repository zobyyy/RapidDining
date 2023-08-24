import CheckoutProvider,{ useCheckoutContext } from '@/pages/Checkout/CheckoutContext'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

const useCheckout = () => {
  const {selectedOrderId, setSelectedOrderId} = useCheckoutContext();
  const [checkoutResponse, setCheckoutResponse] = useState();
  const [audio, setAudio] = useState(null)

  useEffect(() => {
    setAudio(new Audio('/cash.mp3'))
  }, [])

  const handleCheckout = async (orderId,setIsAlert,setCheckoutStatus) => {
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
        setCheckoutStatus(200)
        setSelectedOrderId()
        setIsAlert(true)
      } else {
        setCheckoutStatus(403)
        setIsAlert(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return { checkoutResponse, handleCheckout }
}

export default useCheckout