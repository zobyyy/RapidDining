import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

const useOrderStatus = () => {
  const [reservationInfo, setReservationInfo] = useState(null)

  const OrderChange = async (requestBody) => {
    try {
      const response = await fetch(
        `https://107.22.142.48/api/1.0/reservations/orderstatus`,
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
      }
    } catch (error) {
      console.error(error)
    }
  }
  return {
    reservationInfo,
    OrderChange
  }
}

export default useOrderStatus
