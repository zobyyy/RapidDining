import Layouts from '../../components/Layouts'
import SearchOrder from './SearchOrder'
import Restaurant from './Restaurant'
import PeopleSelect from './PeopleSelect'
import styles from './Home.module.scss'
import Link from 'next/link'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import { NativeSelect } from '@mui/material'
import { useState, useEffect } from 'react'
import useRestaurants from '../../hook/useRestaurants'

export default function Home() {
  const [isHidden, setIsHidden] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isRefresh, setIsRefresh] = useState(true);
  const [headCount, setHeadCount] = useState(0);
  const {restaurants} = useRestaurants(headCount,null,isRefresh);
  const bookingInfo = [false, true, false, true, false, true]; // 餐廳假資料

  function handleSelect (selectPeople) {
    setHeadCount(selectPeople);
  }

  return (
    <main>
        <Layouts scrollBarHidden={isHidden}>
            {isSearch && <SearchOrder setIsSearch={setIsSearch} setIsHidden={setIsHidden} />}
            <div className={styles.header}>
              <div className={styles.Logo}>
                  <div className={styles.first}>食</div>
                  <div className={styles.others}>時好</div>
              </div>
              <div className={styles.selectBlock}>
                  <div className={styles.selectPeople}>
                    <p className={styles.text}>您有幾位</p>
                    <PeopleSelect handleSelect={handleSelect} />
                  </div>
                  <div className={styles.historyOrder} onClick={() => {setIsSearch(!isSearch); setIsHidden(true)}}>
                      <div className={styles.iconOrder}>
                          <img className={styles.icon2} src="/icon_order2.svg" alt="" />
                      </div>
                      <p className={styles.text}>查看紀錄</p>
                  </div>
              </div>
              <div className={styles.devide}></div>
            </div>
            <div className={styles.displayBar}>
              <div className={styles.distance}>顯示500公尺內餐廳</div>
              <div className={styles.refresh} onClick={() => {setIsRefresh(true); setTimeout(() => {setIsRefresh(false)},2000)}}>
                <img src="/icon_refresh.svg" alt="" />
                <p className={styles.text}>刷新</p>
              </div>
            </div>
            {
              isRefresh 
                ?
                  <div style={{position: 'relative', display: 'flex', width: '100%', height: '100%',justifyContent: 'center', alignItems: 'center'}}>
                    <div className={styles.ldsfacebook}><div></div><div></div><div></div></div>
                  </div>
                :
                  restaurants.map((restaurant) =>(
                    <Restaurant type={1} restaurant={restaurant}/>
                  ))
            }
        </Layouts>
    </main>
  )
}