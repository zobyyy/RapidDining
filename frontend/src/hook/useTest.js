import React, { useState, useEffect } from 'react'

function useTest() {
  const [data, setData] = useState(null)

  useEffect(() => {
    // 定義一個 async 函數來執行 GET 請求
    async function fetchData() {
      try {
        const response = await fetch(
          'http://ec2-3-84-189-230.compute-1.amazonaws.com'
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        // const responseData = await response.text()
        setData(response)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    // 呼叫 fetchData 函數來執行 GET 請求
    fetchData()
  }, [])

  return data
}
export default useTest
