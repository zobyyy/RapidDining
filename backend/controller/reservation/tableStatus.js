import { getTablesByRestId } from '../../model/orderSummaryModel.js';


function formatPhoneNumber(phone) {
    const formattedPhone = `0${phone}`;
    return formattedPhone;
  }
  

export async function tableStatus(req, res) {
  const { restaurantId } = req.query;

  if (!restaurantId ) {
    return res.status(400).json({ error: 'Missing request query restaurantId.' });
  }
  
  console.log(restaurantId) ;
  try {
    const tables = await getTablesByRestId(restaurantId); 
    const formattedTables = tables.map(table => ({
      id: table.id,
      headcount: table.headcount,
      vacancy: table.vacancy,
      phone: formatPhoneNumber(table.phone)
    }));

    res.status(200).json({ data: formattedTables });
 
  } catch (error) {
    console.error('Error in getTablesByRestaurantId:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
