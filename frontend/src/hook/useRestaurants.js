import { useState, useEffect } from 'react'

//isRefresh 監測是否需要重打API
const useRestaurants = (headcount, isLoading, isScroll) => {
  const [restaurants, setRestaurants] = useState([])
  const [cursor, setCursor] = useState(null)

  async function fetchRestaurants() {
    try {
      const response = await fetch(
        `https://107.22.142.48/api/1.0/restaurants/?headcount=${headcount}${
          cursor ? '&cursor=' + cursor : ''
        }`
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json() // 將回應轉換為 JSON 格式
      setRestaurants(data.data.restaurants)
      setCursor(data.data.next_cursor)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchRestaurants()
  }, [])

  useEffect(() => {
    if (isLoading) {
      fetchRestaurants()
    }
  }, [isLoading, headcount])

  return { restaurants }
}

export default useRestaurants
