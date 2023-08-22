import { useState, useEffect } from 'react'

const useOrderGet = (orderId) => {
  const [detail, setDetail] = useState([])

  function fetchOrderDetail() {
    fetch(`https://107.22.142.48/api/1.0/orders/detail?orderId=16`)
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(data => {
            setDetail(data.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    useEffect(() => {
        fetchOrderDetail();
    },[orderId])

  return { detail }
}

export default useOrderGet
