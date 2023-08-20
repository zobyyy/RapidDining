import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

const useDishDetail = (id) => {
  const [dishData, setDishData] = useState(null)

  async function fetchDishDetail() {
    try {
      const response = await fetch(
        `https://107.22.142.48/api/1.0/menus/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.ok) {
        const data = await response.json()
        setDishData(data)
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchDishDetail()
  }, [id])
  return {
    fetchDishDetail,
    dishData
  }
}

export default useDishDetail
