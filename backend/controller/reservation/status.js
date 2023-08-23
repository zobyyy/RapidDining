

import { getReservationByRestId } from '../../model/orderSummaryModel.js';


function formatPhoneNumber(phone) {
  const formattedPhone = `0${phone}`;
  return formattedPhone;
}


export async function reservationStatus(req, res) {
  const { restaurantId } = req.query;

  if (!restaurantId ) {
    return res.status(400).json({ error: 'Missing request query restaurantId.' });
  }

  console.log(restaurantId) ;
  
  try {
    const reservations = await getReservationByRestId(restaurantId); 
    const formattedReservations = reservations.map(reservation => ({
      id: reservation.id,
      phone: formatPhoneNumber(reservation.phone),
      headcount: reservation.headcount
    }));

    res.status(200).json({ data: formattedReservations });
 
  } catch (error) {
    console.error('Error in reservationStatus:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
