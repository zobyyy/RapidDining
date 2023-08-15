import Layouts from '../../components/Layouts'
import Restaurant from './Restaurant'
import styles from './Home.module.scss'

export default function Home() {
  const bookingInfo = [false, true];
  return (
    <main>
        <Layouts>
            <div className={styles.Logo}>
                <div className={styles.first}>食</div>
                <div className={styles.others}>時好</div>
            </div>
            <div className={styles.selectBlock}></div>
            <div className={styles.devide}></div>
            <div className={styles.distance}>顯示500公尺內餐廳</div>
            {bookingInfo.map((isBooking) =>(
              <Restaurant isBooking={isBooking}/>
            ))}
        </Layouts>
    </main>
  )
}
