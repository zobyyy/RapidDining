import { useCheckoutContext } from './CheckoutContext'
import useOrderGet from '@/hook/useOrderGet';
import styles from './Checkout.module.scss'

export default function OrderDetail( {detail11} ) {
    const {selectedOrderId, setSelectedOrderId} = useCheckoutContext();
    const {detail} = useOrderGet(selectedOrderId);
    return (
        <div className={styles.orderDetail}>
            <div className={styles.yellowBox}>
                <p>編號：{detail?.orderId}</p>
            </div>
            <p style={{alignSelf:'flex-start', margin:'2.5rem 1rem 1.5rem'}}>訂單內容：</p>
            <div className={styles.separator} />
            <div className={styles.detailList}>
                {detail?.items?.map((item)=>(
                    <DetailItem item = {item} />
                ))}
            </div>
            <div className={styles.yellowBox} style={{marginTop:'auto',justifyContent:'space-between'}}>
                <p>總金額</p>
                <p>NT${detail?.total}</p>
            </div>
            <button>結帳</button>
        </div>
    )
}

function DetailItem ({item}) {
    const customized = () => {
        let customizedList = []
        item.customized.map((flavor)=>(
            customizedList.push(flavor.dishoption)
        ))
        return customizedList; 
    }
    return(
        <div className={styles.detailItem}>
            <img src="/義大利麵.png" alt="" />
            <div>
                <p style={{fontSize:'16px',fontWeight:'400',margin:'0'}}>{item.dishName}</p>
                <p style={{fontSize:'16px',fontWeight:'400',color:'#959595',margin:'0.5rem 0px'}}>{customized()}</p>
            </div>
            
            <p style={{fontSize:'40px',fontWeight:'700', color:'#F58873', marginLeft:'auto', marginTop:'0',marginRight:'1.5rem'}}>{item.quantity}</p>
        </div>
    )
}