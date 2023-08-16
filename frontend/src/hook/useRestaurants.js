import { useState, useEffect } from "react";

const useRestaurants = (headcount, cursor) => {
    const [restaurants, setRestaurants] = useState([]);

    async function fetchRestaurants() {
        try {
            const response = await fetch('http://ec2-3-84-189-230.compute-1.amazonaws.com/api/1.0/restaurants');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json(); // 將回應轉換為 JSON 格式
            setRestaurants(data.data.restaurants);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchRestaurants();
    },[])

    return {restaurants};
}

export default useRestaurants;