import { getPendingOrders } from '../../model/getorderModel.js';

async function decodeCursor(encodedPhone) {
  if (!encodedPhone) {
    return null;
  }

  try {
    const decodedPhone = parseInt(atob(encodedPhone), 10);
    return decodedPhone;
  } catch (error) {
    console.error('Error decoding cursor:', error);
    return null;
  }
}

export async function orderPending(req, res) {
  let phoneNum = null;
  const { phone } = req.query;
  console.log('encodedphone',phone);
  if (!phone) {
    console.log('no phone provided ');
    return res.status(400).json({ error: 'No phone provided.' }); 
    }

  
    if (!atob(phone)||!atob(phone).startsWith('09')) {
      return res.status(400).json({ error: 'Invalid phone format.' });
    }

    phoneNum = await decodeCursor(phone);

    if(phoneNum < 900000000 || phoneNum > 999999999) {
      return res.status(400).send({ "error": "invalid phone" });
    }

  console.log('phone to search is',phoneNum);
  
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
