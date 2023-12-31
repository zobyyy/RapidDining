
import { pool } from './util.js';
export async function createOrder(orderData){
    try {
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
      INSERT INTO OrderDish (orderId, dishId,quantity)
      VALUES (?, ?, ?);
    `;

            const [insertDishResults] = await pool.query(insertDishQuery, [orderId, item.dishId, item.quantity]);
            const orderDishId = insertDishResults.insertId;
            console.log(`add dish ${item.dishId} to orderId...${orderId}`);

            //customized for certain dish
            for (const customization of item.customized) {
                const insertCustomizationQuery = `
        INSERT INTO OrderDishCustom (orderDishId, dishOptionId)
        VALUES (?, ?);
      `;

            console.log(`check dishOptionId =${customization}`);
            await pool.query(insertCustomizationQuery, [orderDishId, customization]);
            console.log(`orderDishId ${orderDishId} is customized with ${customization}`);
            }
         }
  
  console.log(`order id.. ${orderId} is successfully created`);
  return orderId;
} catch (error) {
    console.error('Error in createOrder:', error);
    throw error; 
}
}

