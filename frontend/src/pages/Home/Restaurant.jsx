import styles from './Home.module.scss'

export default function Restaurant() {
  return (
    <div className={styles.Restaurant}>
        <div className={styles.picture}>
            <img src="" alt="" />
        </div>
        <div className={styles.info}>
            <p className={styles.restaurantName}>AppWork咖啡廳</p>
            <div className={styles.tag}>有空位</div>
            <div className={styles.waitTime}>
                <p className={styles.text}>平均等待時間</p>
                <p className={styles.time}>10</p>
                <p className={styles.text}>分鐘</p>
            </div>
        </div>
    </div>
  )
}