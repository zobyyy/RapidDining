import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

const useRestaurantProfile = (id) => {
  const [profileData, setProfileData] = useState(null)

  async function fetchRestaurantProfile() {
    try {
      const response = await fetch(
        `https://107.22.142.48/api/1.0/restaurants/${id}/profile`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.ok) {
        const data = await response.json()
        setProfileData(data)
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchRestaurantProfile()
  }, [id])
  return {
    fetchRestaurantProfile,
    profileData
  }
}

export default useRestaurantProfile
