import { useState, useEffect } from 'react'

// isRefresh 監測是否需要重打API
// isBottom = true 到底部抓next cursor
// isBottom = false 抓完設為false，以利下次bottom判斷
const useRestaurants = (
  headCount,
  isLoading,
  setIsLoading,
  isBottom,
  setIsBottom
) => {
  const [restaurants, setRestaurants] = useState([])
  const [cursor, setCursor] = useState(null)

  async function fetchRestaurants() {
    setIsLoading(true)
    try {
      const response = await fetch(
        `https://107.22.142.48/api/1.0/restaurants/?headcount=${headCount}`
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json() // 將回應轉換為 JSON 格式
      setRestaurants(data.data.restaurants)
      setCursor(data.data.next_cursor)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  // async function fetchNextCursorRestaurants() {
  //   try {
  //     const response = await fetch(
  //       `https://107.22.142.48/api/1.0/restaurants/?headcount=${headcount}${
  //         cursor ? '&cursor=' + cursor : ''
  //       }`
  //     )
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok')
  //     }
  //     const data = await response.json() // 將回應轉換為 JSON 格式
  //     setRestaurants([...restaurants, data.data.restaurants])
  //     setCursor(data.data.next_cursor)
  //     setIsBottom(false)
  //   } catch (error) {
  //     console.error('Error fetching data:', error)
  //   }
  // }

  // 初始get
  useEffect(() => {
    fetchRestaurants()
  }, [])

  // Refresh
  useEffect(() => {
    if (isLoading) {
      fetchRestaurants()
    }
  }, [isLoading, headCount])

  // // Cursor
  // useEffect(() => {
  //   if (isBottom === true && cursor !== null) {
  //     fetchNextCursorRestaurants()
  //   }
  // }, [isBottom])

  return { restaurants, fetchRestaurants }
}

export default useRestaurants
