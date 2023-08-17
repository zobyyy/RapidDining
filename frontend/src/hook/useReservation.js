import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

const useReservation = () => {
  const [reservationInfo, setReservationInfo] = useState(null)
  const [reservationError, setReservationError] = useState(null)
  const [isAlert, setIsAlert] = useState(false)
  const [reservationType, setReservationType] = useState(null)

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

      if (response.ok) {
        const data = await response.json()
        setReservationInfo(data)
        setReservationError(null)
        console.log(requestBody.name)
        if (data.data.tableId !== null) {
          setReservationType('check')
          Cookies.set('tableId', data.data.tableId)
        } else if (data.data.tableId === null) {
          setReservationType('waiting')
          Cookies.set('reservationCount', data.data.reservationCount)
          Cookies.set('userName', requestBody.name)
          Cookies.set('userGender', requestBody.gender)
        }
      } else {
        setReservationError(data.error)
        if (reservationError === 'You already have an reservation.') {
          setIsAlert(true)
        }
      }
    } catch (error) {
      console.error(error)
      // setIsAlert(true)
    }
  }
  useEffect(() => {
    if (isAlert) {
      setTimeout(() => {
        setIsAlert(false)
        window.location.reload()
      }, 3000)
    }
  }, [isAlert])
  return {
    reservationInfo,
    makeReservation,
    isAlert,
    reservationType
  }
}

export default useReservation
