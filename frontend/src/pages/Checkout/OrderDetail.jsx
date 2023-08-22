import styles from './Checkout.module.scss'

export default function OrderDetail() {
    return (
        <div className={styles.orderDetail}>
            <div className={styles.yellowBox}>
                <p>編號：1234</p>
            </div>
            <p style={{alignSelf:'flex-start', margin:'2.5rem 1rem 1.5rem'}}>訂單內容：</p>
            <div className={styles.separator} />
            <div className={styles.detailList}>
                <DetailItem />
                <DetailItem />
            </div>
            <div className={styles.yellowBox} style={{marginTop:'auto',justifyContent:'space-between'}}>
                <p>總金額</p>
                <p>NT$295</p>
            </div>
            <button>結帳</button>
        </div>
    )
}

function DetailItem () {
    return(
        <div className={styles.detailItem}>
            <img src="/義大利麵.png" alt="" />
            <p style={{fontSize:'16px',fontWeight:'400',margin:'0'}}>經典番茄義大利麵</p>
            <p style={{fontSize:'40px',fontWeight:'700', color:'#F58873', marginLeft:'auto', marginTop:'0',marginRight:'1.5rem'}}>1</p>
        </div>
    )
}