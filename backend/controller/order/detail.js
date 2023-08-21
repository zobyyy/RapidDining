import { getOrderDetails } from '../../model/orderDetailModel.js';
import { searchOrderId } from '../../model/orderDetailModel.js';

export async function orderDetail(req, res) {
  try {

    // const { orderId } = req.body;

    const { orderId } = req.query;
    console.log('typeof orderId:', typeof orderId);
    const orderIdNum = parseInt(orderId);
    console.log(orderIdNum);

    //記得先搜尋該筆orderId是否存在OrderList

    if (!orderIdNum) {
      return res.status(400).json({ error: 'Missing tableId in request body.' });
    }

    const isOrderId = await searchOrderId (orderIdNum)
    if(!isOrderId){
      return res.status(404).json({ error: 'cannot find the order ' });
    }

    const orderDetails = await getOrderDetails(orderIdNum);
    
    if (!orderDetails) {
      return res.status(404).json({ error: 'Order details not found.' });
    }

    return res.status(200).json({ data: orderDetails });
  } catch (error) {
    console.error('Error in getOrderDetailsController:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
