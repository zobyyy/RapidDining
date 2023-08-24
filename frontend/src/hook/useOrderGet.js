import { useState, useEffect } from 'react'

const useOrderGet = (orderId) => {
  const [detail, setDetail] = useState([])

  function fetchOrderDetail() {
    fetch(`https://107.22.142.48/api/1.0/orders/detail?orderId=${orderId}`)
        .then(response => {
        if (!response.ok) {
            setDetail('error');
            throw new Error('Network response was not ok');
        }
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('Unexpected response status: ' + response.status);
        }
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
