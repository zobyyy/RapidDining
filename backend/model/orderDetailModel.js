import { pool } from './util.js';
import { pictureForFrontend } from '../util/util.js';


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
        
      const [orderDishes] = await pool.query('SELECT od.id AS orderDishId, od.dishId, od.quantity, d.name AS dishName, d.price, d.picture FROM OrderDish od JOIN dish d ON od.dishId = d.id WHERE od.orderId = ?;', [orderId]);
  
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
          picture: pictureForFrontend(orderDish.picture),
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
  

