import { useState, useEffect } from 'react'

const useOrderSummary = () => {
  const [order, setOrder] = useState([])

  function fetchOrderSummary() {
    fetch(`https://107.22.142.48/api/1.0/orders/order?restaurantId=1`)
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(data => {
            setOrder(data.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    useEffect(() => {
        fetchOrderSummary();
    },[])

  return { order }
}

export default useOrderSummary
