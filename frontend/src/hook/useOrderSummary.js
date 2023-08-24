import { useState, useEffect } from 'react'
import {useCheckoutContext} from '@/pages/Checkout/CheckoutContext';

const useOrderSummary = () => {
  const [order, setOrder] = useState([])
  const {setSelectedOrderId} = useCheckoutContext();

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
        const intervalId = setInterval(() => {
            fetchOrderSummary();
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(()=>{
        if (order.length === 0) {
            setSelectedOrderId();
        } else {
            setSelectedOrderId(order[0].orderId);
        }
    },[order])

  return { order, fetchOrderSummary }
}

export default useOrderSummary
