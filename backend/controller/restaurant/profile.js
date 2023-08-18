import { restaurantProfile as restProf } from "../../model/restaurant.js";
import { pictureForFrontend } from "../../util/util.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * */
export async function restaurantProfile(req, res, next) { // eslint-disable-line no-unused-vars
  const restaurantId = +req.params.id;
  if (Number.isNaN(restaurantId)) {
    return res.status(400).send({ "error": "Invalid restaurant id" });
  }
  try {
    const profile = await restProf(restaurantId);
    if (profile === undefined) {
      return res.status(404).send({ "error": "no such restaurant" });
    }
    return res.status(200).send({
      "data": {
        ...profile,
        "picture": pictureForFrontend(profile.picture)
      }
    });
  } catch (err) {
    console.error(`Error when getting restaurant profile of restaurant ${restaurantId}:`, err);
    return res.status(500).send({ "error": "internal server error" });
  }
}
