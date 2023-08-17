import { useState } from 'react'

const useReservation = () => {
  const [reservationInfo, setReservationInfo] = useState(null)
  const [reserved, setReserved] = useState(false)
  const makeReservation = async (requestBody) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/reservations/reserve`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        }
      )

      const data = await response.json()
      if (response.ok) {
        setReservationInfo(data)
      }
    } catch (error) {
      console.error('Error making reservation:', error)
    }
  }

  return {
    reservationInfo,
    makeReservation
  }
}

export default useReservation
