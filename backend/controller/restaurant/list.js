import { selectAllRestaurantSortedByTime } from '../../model/restaurant.js';
import { pictureForFrontend } from '../../util/util.js';

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * */
export async function restaurantList(req, res) {
  const headcount = +req.query.headcount;
  if (Number.isNaN(headcount)) {
    return res.status(400).send({ "error": "invalid headcount" })
  }

  let restaurants;
  try {
    restaurants = await selectAllRestaurantSortedByTime(headcount);
  } catch (err) {
    console.error("Error occurred when getting restaurant list:", err);
    return res.status(500).send({ "error": "internal server error" });
  }
  res.status(200).send({
    "data": {
      "restaurants": restaurants.map(rest => {
        return {
          ...rest,
          "picture": pictureForFrontend(rest.picture),
          "waitTime": rest.waitTime === null ? 0 : Number(rest.waitTime),
          "availability": rest.availability === null ? false : true
        };
      })
    }
  });
}
