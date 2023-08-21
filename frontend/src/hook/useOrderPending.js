import { useState, useEffect } from 'react'

const useOrderPending = () => {
    const [order, setOrder] = useState([]);

  async function fetchOrderPending(phone) {
    try {
        console.log(phone);
      const response = await fetch(
        `https://107.22.142.48/api/1.0/orders/pending?phone=${phone}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      if (response.ok) {
        console.log("order: "+response)
        setOrder(response.json().data);
      }
    } catch (error) {
      console.error(error)
    }
  }

  return {order,fetchOrderPending};
}

export default useOrderPending
