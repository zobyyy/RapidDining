import { getMenuDetail } from '../../model/dishdetailModel.js';
import { pictureForFrontend } from '../../util/util.js';

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * */
export async function dishDetail(req, res) {
  try {
    const dishId = +req.params.dishId;
    if(Number.isInteger(dishId) === false){
      return res.status(400).send({"error": "invalid dishId"});
    }
    const dish = await getMenuDetail(dishId);
    return res.status(200).json({
      data: {
        ...dish,
        "picture": pictureForFrontend(dish.picture)
      }
    });
  } catch (error) {
    console.error('Error in reservationReserve:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
}
