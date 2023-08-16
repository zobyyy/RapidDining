/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * */

// export function reservationReserve(req, res, next) {
//   throw new Error("not implemented");
// }

//funciton:  reserve a table, make reservation, waiting time
// 我會從request body 得到的資料：
// restaurantId	
// headcount	
// name	
// gender	Enum<小姐 | 先生 | 其他>
// phone	String	Phone number
// 目前要做的功能：
// 1.在該間餐廳該個人是否已存在候位或訂位資料(查詢Reservation中是否存在和輸入一樣的phone number || tableList 中是否存在和輸入一樣的phone number)
// makeReservation
// 2.如果該間餐廳是否有對應人數的空位(query tableList,在對應的restaurantId以及headcount>= headcount是否有vancancy=true存在，如果有的話就回傳true  )
// 3.如果該間餐廳有對應人數的空位，則更新tableList (restaurantId, headcount, vacancy, phone) = (不變,不變,false,phone)
// 4.如果該間餐廳沒有對應人數的空位，則將資料插入Reservation (phone, headcount, restaurantId) = (11111111, 2, 1)
// 5.getWaitCount：候位第幾組：在Reservation 中對應的restaurantId 有幾個
// 6.最後回傳的格式
// data:{
//   "tableId":
//   "reservationId":
//   "name":   
//  }

console.log("this is for reservation");

import {checkExistingTable} from '../../model/reserveModel.js'; 
import {hasVacancy} from '../../model/reserveModel.js'; 
import {insertReservation} from '../../model/reserveModel.js'; 
import {updateTableVacancy} from '../../model/reserveModel.js'; 
import {checkExistingReservation} from '../../model/reserveModel.js'; 
import {getWaitCount} from '../../model/reserveModel.js'; 




//order contrl

export async function reservationReserve(req, res) {
  try {
    const { restaurantId, headcount, name, gender, phone } = req.body;

    // Check if request body is missing
    if (!restaurantId || !headcount || !name || !gender || !phone||!phone.startsWith('09')) {
      return res.status(400).json({ error: 'Missing request body fields.' });
    }

    console.log(typeof phone); 

    const phoneNum = parseInt(phone, 10); // 轉換成整數
    console.log(phoneNum);
    console.log(typeof phoneNum);




   

    console.log(`restaurant is ${restaurantId}`);
    console.log(`headcount is ${headcount}`);
    console.log(`reservation name is ${name}`);
    console.log(`reservation gender is ${gender}`);
    console.log(`reservation phone is ${phoneNum}`);

    //check if reservaton is exist
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
    if (!isVacancy) {
      const reserveCount = await getWaitCount(restaurantId);
      const insertreservationId = await insertReservation(phone, headcount, restaurantId);
      console.log(`Sorry, you need to wait a while...${reserveCount}`);
      return res.status(200).json({data:{
        "tableId": null,
        "reservationId": insertreservationId,
        "waitCount": reserveCount
      }});
      //return res.status(200).json({ "message": 'successfully make a reservation' });
    }
    const updateTableId = await updateTableVacancy(phoneNum,headcount);
    console.log("Good, you already have a seat");

    return res.status(200).json({data:{
      "tableId": updateTableId,
      "reservationId": null,
      "waitCount": null
    }});

  } catch (error) {
    console.error('Error in reservationReserve:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
}


       //check if restaurant exist
    // const restaurant = await db.getRestaurantById(restaurantId); //query if restaurant is exist
    // if (!restaurant) {
    //   return res.status(404).json({ error: 'restaurant not found' });
    // }

