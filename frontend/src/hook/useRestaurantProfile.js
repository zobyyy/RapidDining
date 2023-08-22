import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

const useRestaurantProfile = (id) => {
  const [profileData, setProfileData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  async function fetchRestaurantProfile() {
    setIsLoading(true)
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
        setIsLoading(false)
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
    profileData,
    isLoading
  }
}

export default useRestaurantProfile
