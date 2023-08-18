import {checkExistingTable} from '../../model/reserveModel.js'; 
import {hasVacancy} from '../../model/reserveModel.js'; 
import {insertReservation} from '../../model/reserveModel.js'; 
import {updateTableVacancy} from '../../model/reserveModel.js'; 
import {checkExistingReservation} from '../../model/reserveModel.js'; 
import {getWaitCount} from '../../model/reserveModel.js'; 



export async function reservationReserve(req, res) {
  try {
    const { restaurantId, headcount, name, gender, phone } = req.body;

    // Check if request body is missing
    if (!restaurantId || !headcount || !name || !gender || !phone||!phone.startsWith('09')) {
      return res.status(400).json({ error: 'Missing request body fields.' });
    }

    const phoneNum = parseInt(phone, 10); 
  
    
    const isTable = await checkExistingTable(phoneNum);
    if (isTable) {
      console.log("you alreayd have a seat, you can't reserve again!");
      return res.status(400).json({ error: 'You already have an existing seat.' });
    }
    console.log("you don't have a seat!, I will check if you have a reservation");
    const isReserve = await checkExistingReservation(phoneNum);
    if (isReserve) {
    console.log("you already have a reservation in this restaurant");
    return res.status(400).json({ error: 'You already have an reservation.' });
  }
    console.log("you don't have a reservation in this restaurant");
    
    const isVacancy = await hasVacancy(restaurantId, headcount);
    console.log(`isVancy is ${isVacancy}`);
    console.log(`!isVancy is ${!isVacancy}`);
    if (isVacancy) {
      console.log("there is vancancy")
      const updateTableId = await updateTableVacancy(phoneNum,headcount);
      console.log("Good, you already have a seat");
  
      return res.status(200).json({data:{
        "tableId": updateTableId,
        "reservationCount": null,
      }});
     
    }
    console.log("there is no vancancy")

    
    await insertReservation(phone, headcount, restaurantId);
    const reserveCount = await getWaitCount(restaurantId);
      console.log(`Sorry, you need to wait a while...${reserveCount}`);
      return res.status(200).json({data:{
        "tableId": null,
        "reservationCount": reserveCount,
      }});

  } catch (error) {
    console.error('Error in reservationReserve:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
}


