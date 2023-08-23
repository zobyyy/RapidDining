import Cookies from 'js-cookie'

const useCancel = ({ phone, restaurantId, orderId }) => {
  // const restaurantId = parseInt(Cookies.get('restaurantsId'))
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
        }, 50)
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
          headers: {
            'Content-Type': 'application/json'
          },
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
        }, 50)
      }
      console.log('取消訂位 response: ', response.json())
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  async function cancleToGo() {
    //外帶
    try {
      const response = await fetch(
        `https://107.22.142.48/api/1.0/orders/${orderId}/cancel`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            phone: btoa(phone)
          })
        }
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      if (response.ok) {
        // Cookies.remove('reservationId')
        // Cookies.remove('isReserved')
        // Cookies.remove('isEatHere')
        // Cookies.remove('userGender')
        // Cookies.remove('userName')
        // Cookies.remove('phone')
        // Cookies.remove('tableId')
        setTimeout(() => {
          window.location.reload()
        }, 50)
      }
      console.log('取消外帶 response: ', response.json())
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  return { cancleReservation, cancleBooking, cancleToGo }
}

export default useCancel
