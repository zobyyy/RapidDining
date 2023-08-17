/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * */



import { createOrder } from '../../model/orderRequestModel.js';

export async function orderRequest(req, res) {
  const requestData = req.body;

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





