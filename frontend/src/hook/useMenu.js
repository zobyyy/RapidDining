import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

const useMenu = (id) => {
  const [menuInfo, setMenuInfo] = useState(null)

  async function fetchMenu() {
    try {
      const response = await fetch(
        `https://107.22.142.48/api/1.0/menus/search?restaurantId=${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.ok) {
        const data = await response.json()
        setMenuInfo(data)
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchMenu()
  }, [id])
  return {
    fetchMenu,
    menuInfo
  }
}

export default useMenu
