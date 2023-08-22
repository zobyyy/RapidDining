
import { getOrderSummary } from '../../model/orderSummaryModel.js';

// function ReqIsNumber(s) {
//     return parseFloat(s).toString() !== "NaN"; 
//   }

export async function OrderSummary(req, res) {
  try {
    // const { restaurantId } = req.body;
    const { restaurantId} = req.query;
    
    // if ((ReqIsNumber(tableId) && ReqIsNumber(reservationId))|| (!tableId && !reservationId)) {
    //   return res.status(400).json({ error: 'Please Provide either tableId or reservationId.' });
    // }

    if (!restaurantId) {
        return res.status(400).json({ error: 'Please Provide restaurantId.' });
      }

    const orderSummary = await getOrderSummary(restaurantId);
    return res.status(200).json({ data:orderSummary});
  } catch (error) {
    console.error('Error in getOrderSummary:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
