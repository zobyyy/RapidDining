import Layouts from '../../components/Layouts'
import styles from './Home.module.scss'

export default function Page() {
  return (
    <main>
        <Layouts>
            <div className={styles.Logo}>
                <div>食</div>
                <div>時好</div>
            </div>
        </Layouts>
    </main>
  )
}
