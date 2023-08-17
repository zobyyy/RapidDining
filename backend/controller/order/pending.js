import { getPendingOrders } from '../../model/getorderModel.js';

export async function orderPending(req, res) {
  const { phone } = req.body;
  if (!phone||!phone.startsWith('09')) {
    return res.status(400).json({ error: 'Invalid phone format.' });
  }

  const phoneNum = parseInt(phone, 10); 
  console.log(`phoneNume:${phoneNum}`);

  try {
    const orders = await getPendingOrders(phoneNum);

    const data = {
      order: orders,
    };

    return res.status(200).json({ data });
  } catch (error) {
    console.error('Error in orderPending:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
}
