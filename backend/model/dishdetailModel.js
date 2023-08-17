import { pool } from './util.js';

export async function getMenuDetail(dishId) {
  try {
    const searchDish = `
      SELECT 
        d.id AS dish_id, d.name, d.price, d.picture, d.description,
        do.type, do.id AS option_id, do.taste
      FROM dish AS d
      LEFT JOIN dish_dishOption AS dd ON d.id = dd.dishId
      LEFT JOIN dishOption AS do ON dd.dishOptionId = do.id
      WHERE d.id = ?;
    `;
    const [results] = await pool.query(searchDish, [dishId]);

    const dish = {
      dish_id: results[0].dish_id,
      name: results[0].name,
      price: results[0].price,
      picture: results[0].picture,
      description: results[0].description,
      customized: [],
    };

    results.forEach((row) => {
      const option = {
        id: row.option_id,
        taste: row.taste,
      };

      const existingType = dish.customized.find((c) => c.type === row.type);
      if (existingType) {
        existingType.option.push(option);
      } else {
        dish.customized.push({
          type: row.type,
          option: [option],
        });
      }
    });

    return dish;
  } catch (error) {
    console.error('Error in getMenuDetail:', error);
    throw error;
  }
}




