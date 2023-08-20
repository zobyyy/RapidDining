
import {searchReservation , cancelReservation  } from '../../model/reserveCancelModel.js';

function ReqIsNumber(s) {
  return parseFloat(s).toString() !== "NaN"; 
}

export async function reservationCancel(req, res) {
  try {
    const { restaurantId, phone } = req.body;

    if (!restaurantId||!phone||!phone.startsWith('09')|| !ReqIsNumber(restaurantId)) {
      return res.status(400).json({ error: 'Wrong format in request body.' });
    }

  
    const phoneNum = parseInt(phone, 10); 

    const searchReservationRes = await searchReservation (phoneNum,restaurantId)

    if(searchReservationRes !== null){
      await cancelReservation(searchReservationRes);
      return res.status(200).json({
        data: {
          reservationId: searchReservationRes,
        }
      });
    }  
    return res.status(404).json({
        error: 'Phone not found in Reservation.',
      });
  } catch (error) {
    console.error('Error in reservationCancel:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
