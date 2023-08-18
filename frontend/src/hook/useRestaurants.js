import { useState, useEffect } from 'react'

const useRestaurants = (headcount, cursor, isRefresh) => {
  const [restaurants, setRestaurants] = useState([])

  async function fetchRestaurants() {
    try {
      const response = await fetch(
        `http://ec2-3-84-189-230.compute-1.amazonaws.com/api/1.0/restaurants/?headcount=${headcount}${
          cursor ? '&cursor=' + cursor : ''
        }`
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setRestaurants(data.data.restaurants)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchRestaurants()
  }, [])

  useEffect(() => {
    if (isRefresh) {
      fetchRestaurants()
    }
  }, [isRefresh])

  return { restaurants }
}

export default useRestaurants
