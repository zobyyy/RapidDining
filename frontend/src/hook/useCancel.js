import Cookies from 'js-cookie'

const useCancel = ({ phone }) => {
  const restaurantId = parseInt(Cookies.get('restaurantsId'))
  // const phone = Cookies.get('phone')

  const requestBody = JSON.stringify({
    restaurantId: restaurantId,
    phone: phone
  })

  async function cancleReservation() {
    try {
      const response = await fetch(
        `https://107.22.142.48/api/1.0/reservations/cancel`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: requestBody
        }
      )
      if (response.ok) {
        Cookies.remove('reservationId')
        Cookies.remove('isReserved')
        Cookies.remove('isEatHere')
        Cookies.remove('userGender')
        Cookies.remove('userName')
        Cookies.remove('phone')
        Cookies.remove('tableId')
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      console.log('取消候位 response: ', response.json())
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  async function cancleBooking() {
    try {
      const response = await fetch(
        `https://107.22.142.48/api/1.0/tables/cancel`,
        {
          method: 'DELETE',
          body: requestBody
        }
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      if (response.ok) {
        Cookies.remove('reservationId')
        Cookies.remove('isReserved')
        Cookies.remove('isEatHere')
        Cookies.remove('userGender')
        Cookies.remove('userName')
        Cookies.remove('phone')
        Cookies.remove('tableId')
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
      console.log('取消訂位 response: ', response.json())
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return { cancleReservation, cancleBooking }
}

export default useCancel
