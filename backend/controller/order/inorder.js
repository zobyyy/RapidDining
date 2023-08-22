
import { getInOrderSummary } from '../../model/orderSummaryModel.js';

// function ReqIsNumber(s) {
//     return parseFloat(s).toString() !== "NaN"; 
//   }

export async function inOrderSummary(req, res) {
  try {
    // const { restaurantId } = req.body;
    const { restaurantId,cursor } = req.query;
    console.log('cursor in controller is',cursor);
  
    // if ((ReqIsNumber(tableId) && ReqIsNumber(reservationId))|| (!tableId && !reservationId)) {
    //   return res.status(400).json({ error: 'Please Provide either tableId or reservationId.' });
    // }

    if (!restaurantId) {
        return res.status(400).json({ error: 'Please Provide restaurantId.' });
      }

    const orderSummary = await getInOrderSummary(restaurantId,cursor);
    return res.status(200).json({ data:orderSummary.data });
  } catch (error) {
    console.error('Error in getOrderSummary:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
