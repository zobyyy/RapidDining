
import {searchTable ,updateTable } from '../../model/reserveCancelModel.js';

function ReqIsNumber(s) {
  return parseFloat(s).toString() !== "NaN"; 
}

export async function tableCancel(req, res) {
  try {
    const { restaurantId, phone } = req.body;

    if (!restaurantId||!phone||!phone.startsWith('09')|| !ReqIsNumber(restaurantId)) {
      return res.status(400).json({ error: 'Wrong format in request body.' });
    }
    const phoneNum = parseInt(phone, 10); 

    const searchTableRes = await searchTable (phoneNum,restaurantId)

    if(searchTableRes !== null){
      await updateTable(searchTableRes);
      return res.status(200).json({
        data: {
          tableId: searchTableRes,
        }
      });
    }  
    return res.status(404).json({
        error: 'Phone not found in tableList.',
      });
  } catch (error) {
    console.error('Error in tableCancel:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
