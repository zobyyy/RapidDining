import { createOrder } from '../../model/orderRequestModel.js';

function ReqIsNumber(s) {
  return parseFloat(s).toString() !== "NaN"; 
}

export async function orderRequest(req, res) {
  const requestData = req.body;
  if (
    !requestData.restaurantId ||
    !requestData.phone ||
    !requestData.phone.startsWith('09')
  ) {
    return res.status(400).json({ error: 'Missing or invalid request body fields.' });
  }
  
  if (!ReqIsNumber(requestData.restaurantId)||!ReqIsNumber(requestData.total)) {
    return res.status(400).json({ error: 'Invalid restaurantId and total format.' });
  }

  if (ReqIsNumber(requestData.reservationId) && ReqIsNumber(requestData.tableId)) {
    return res.status(400).json({ error: 'Invalid reservation/table.' });
  }
 
  try {
    const orderId = await createOrder(requestData);
    return res.status(200).json({
      data: {
        orders: {
          id: orderId, 
        }
      }
    });
    
    
    
  } catch (error) {
    console.error('Error in orderRequest:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}





