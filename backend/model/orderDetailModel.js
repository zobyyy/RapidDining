import { pool } from './util.js';

export async function searchOrderId(orderId) {
  try {
    const orderQuery = `
      SELECT EXISTS (
        SELECT 1
        FROM OrderList
        WHERE id = ?
      ) AS orderExists;
    `;
    const [result] = await pool.query(orderQuery, [orderId]);
    const orderExists = result[0]?.orderExists === 1;
    return orderExists;
  } catch (error) {
    console.error('Error in searchOrderId:', error);
    throw error;
  }
}




export async function getOrderDetails(orderId) {
    try {
      //const [orderList] = await pool.query('SELECT * FROM OrderList WHERE tableId = ?', [tableId]);
  
    //   if (orderList.length === 0) {
    //     return null;
    //   }
  
      //const orderId = orderList[0].id;
  
      const [orderDishes] = await pool.query('SELECT od.id AS orderDishId, od.dishId, od.quantity, d.name AS dishName, d.price FROM OrderDish od JOIN dish d ON od.dishId = d.id WHERE od.orderId = ?;', [orderId]);
  
      const orderDishIds = orderDishes.map(orderDish => orderDish.orderDishId);
  
      const [customizedOptions] = await pool.query(
        'SELECT odc.orderDishId, do.taste FROM OrderDishCustom odc INNER JOIN dishOption do ON odc.dishOptionId = do.id WHERE odc.orderDishId IN (?);',
        [orderDishIds]
      );
  
      const orderDishCustomMap = {};
      customizedOptions.forEach(option => {
        if (!orderDishCustomMap[option.orderDishId]) {
          orderDishCustomMap[option.orderDishId] = [];
        }
        orderDishCustomMap[option.orderDishId].push({ dishoption: option.taste });
      });
  
      const items = orderDishes.map(orderDish => {
        const customized = orderDishCustomMap[orderDish.orderDishId] || [];
        return {
          dishName: orderDish.dishName,
          quantity: orderDish.quantity,
          price: orderDish.price,
          customized,
        };
      });
  
      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
      return {
        orderId,
        items,
        total
      };
    } catch (error) {
      console.error('Error in getOrderDetails:', error);
      throw error;
    }
  }
  

// export async function getOrderDetails(tableId) {
//   try {
//     const [orderList] = await pool.query('SELECT * FROM OrderList WHERE tableId = ?', [tableId]);

//     if (orderList.length === 0) {
//       return null;
//     }

//     const orderId = orderList[0].id;

//     const [orderDishes] = await pool.query('SELECT * FROM OrderDish WHERE orderId = ?', [orderId]);

//     const items = await Promise.all(orderDishes.map(async (orderDish) => {
//       const dishId = orderDish.dishId;
//       const quantity = orderDish.quantity;

//       const [dishInfo] = await pool.query('SELECT name, price FROM dish WHERE id = ?', [dishId]);

//       const [customizedOptions] = await pool.query(
//         'SELECT dishOption.taste FROM OrderDishCustom INNER JOIN dishOption ON OrderDishCustom.dishOptionId = dishOption.id WHERE orderDishId = ?',
//         [orderDish.id]
//       );

//       return {
//         dishName: dishInfo[0].name,
//         quantity,
//         customized: customizedOptions.map(option => ({ dishoption: option.taste })),
//         price: dishInfo[0].price
//       };
//     }));

//     const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

//     return {
//       orderId,
//       items,
//       total
//     };
//   } catch (error) {
//     console.error('Error in getOrderDetails:', error);
//     throw error;
//   }
// }


// export async function getOrderDetails(tableId) {
//   try {
//     const [orderList] = await pool.query('SELECT * FROM OrderList WHERE tableId = ?', [tableId]);

//     if (orderList.length === 0) {
//       return null;
//     }

//     const orderId = orderList[0].id;

//     const [orderDishes] = await pool.query('SELECT * FROM OrderDish WHERE orderId = ?', [orderId]);

//     const items = await Promise.all(orderDishes.map(async (orderDish) => {
//       const dishId = orderDish.dishId;
//       const quantity = orderDish.quantity;

//       const [dishInfo] = await pool.query('SELECT name FROM dish WHERE id = ?', [dishId]);

//       const [customizedOptions] = await pool.query(
//         'SELECT dishOption.taste FROM OrderDishCustom INNER JOIN dishOption ON OrderDishCustom.dishOptionId = dishOption.id WHERE orderDishId = ?',
//         [orderDish.id]
//       );

//       return {
//         dishName: dishInfo[0].name,
//         quantity,
//         customized: customizedOptions.map(option => ({ dishoption: option.taste }))
//       };
//     }));

//     const total = orderDishes.reduce((sum, orderDish) => sum + orderDish.quantity, 0);

//     return {
//       orderId,
//       items,
//       total
//     };
//   } catch (error) {
//     console.error('Error in getOrderDetails:', error);
//     throw error;
//   }
// }
