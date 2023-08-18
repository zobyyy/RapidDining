import {getMenuDetail} from '../../model/dishdetailModel.js'; 

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * */
export async function dishDetail(req, res) {
  try {
    const dishId = req.params.dishId;
    const dish = await getMenuDetail(dishId); 
    return res.status(200).json({ data: dish });
  } catch (error) {
    console.error('Error in reservationReserve:', error);
    return res.status(500).json({ error: 'internal server error' });
  }
}


