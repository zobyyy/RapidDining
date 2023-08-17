
import { pool } from './util.js';
export async function createOrder(orderData){
    try {
        console.log(`restaurantId = ${orderData.restaurantId}`);
        console.log(`phone = ${orderData.phone}`);
        console.log(`reservationId = ${orderData.reservationId}`);
        console.log(`tableId = ${orderData.tableId}`);
        console.log(`total = ${orderData.total}`);

        const insertOrderQuery = `
    INSERT INTO OrderList (restaurantId, phone, reservationId, tableId, total)
    VALUES (?, ?, ?, ?, ?);
    `;

        const [insertOrderResults] = await pool.query(insertOrderQuery, [orderData.restaurantId, orderData.phone, orderData.reservationId, orderData.tableId, orderData.total ]);
        const orderId = insertOrderResults.insertId;
        console.log(`order is inserting to id...${orderId}`);


        //what dish is in this order
        for (const item of orderData.items) {
            const insertDishQuery = `
      INSERT INTO OrderDish (orderId, dishId)
      VALUES (?, ?);
    `;

            const [insertDishResults] = await pool.query(insertDishQuery, [orderId, item.dishId]);
            const orderDishId = insertDishResults.insertId;
            console.log(`add dish ${item.dishId} to orderId...${orderId}`);

            //customized for certain dish
            for (const customization of item.customized) {
                const insertCustomizationQuery = `
        INSERT INTO OrderDishCustom (orderDishId, dishOptionId)
        VALUES (?, ?);
      `;

            console.log(`check dishOptionId =${customization.dishoptionId}`);
            await pool.query(insertCustomizationQuery, [orderDishId, customization.dishoptionId]);
            console.log(`orderDishId ${orderDishId} is customized with ${customization.dishoptionId}`);
            }
         }
  
  console.log(`order id.. ${orderId} is successfully created`);
  return orderId;
} catch (error) {
    console.error('Error in createOrder:', error);
    throw error; 
}
}

