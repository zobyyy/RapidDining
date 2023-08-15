import Layouts from '../../components/Layouts'
import Restaurant from './Restaurant'
import Select from '@mui/material/Select'
import styles from './Home.module.scss'
import BasicSelect from '../Booking/OrderPosotion'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { NativeSelect } from '@mui/material'
import { useState } from 'react'

export default function Home() {
  const bookingInfo = [false, true, false, false];

  // 選擇人數
  const BasicSelect = () => {
    const [peopleNum, setPeopleNum] = useState('')

    const handleChange = (event) => {
      setPeopleNum(event.target.value)
    }
    return (
      <Box sx={{ minWidth: 40 }}>
        <FormControl fullWidth>
          <NativeSelect
            defaultValue={30}
            inputProps={{
              name: 'age',
              id: 'uncontrolled-native',
            }}
            sx={{color:'#959595'}}
          >
            <option value={1}>1位</option>
            <option value={2}>2位</option>
            <option value={3}>3位</option>
            <option value={4}>4位</option>
            <option value={5}>5位</option>
            <option value={6}>6位</option>
          </NativeSelect>
        </FormControl>
      </Box>
    )
  }
  

  return (
    <main>
        <Layouts>
            <div className={styles.Logo}>
                <div className={styles.first}>食</div>
                <div className={styles.others}>時好</div>
            </div>
            <div className={styles.selectBlock}>
                <div className={styles.selectPeople}>
                  <p className={styles.text}>您有幾位</p>
                  <BasicSelect/>
                </div>
                <div className={styles.historyOrder}>
                    <div className={styles.iconOrder}>
                        <img className={styles.icon2} src="/icon_order2.svg" alt="" />
                    </div>
                    <p className={styles.text}>查看紀錄</p>
                </div>
            </div>
            <div className={styles.devide}></div>
            <div className={styles.distance}>顯示500公尺內餐廳</div>
            {bookingInfo.map((isBooking) =>(
              <Restaurant isBooking={isBooking}/>
            ))}
        </Layouts>
    </main>
  )
}
