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
        `https://107.22.142.48/api/1.0/reservations/reserve`,
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

        if (data.data.tableId !== null) {
          setReservationType('check')
          Cookies.set('tableId', data.data.tableId)
          Cookies.set('reservationId', null)
          Cookies.set('userName', requestBody.name)
          Cookies.set('userGender', requestBody.gender)
          Cookies.set('phone', requestBody.phone)
        } else if (data.data.tableId === null) {
          setReservationType('waiting')
          Cookies.set('tableId', null)
          Cookies.set('reservationId', data.data.reservationCount)
          Cookies.set('userName', requestBody.name)
          Cookies.set('userGender', requestBody.gender)
          Cookies.set('phone', requestBody.phone)
        }
      } else {
        setReservationError(data.error)
        if (reservationError === 'You already have an reservation.') {
          setIsAlert(true)
        }
      }
    } catch (error) {
      console.error(error)
      setIsAlert(true)
    }
  }
  return {
    reservationInfo,
    makeReservation,
    isAlert,
    setIsAlert,
    reservationType
  }
}

export default useReservation
