import { TargetNotEligible, TargetNotFound, deleteOrder } from "../../model/orderList.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * */
export async function orderCheckout(req, res) {
  const orderId = +req.params.orderId;
  if (Number.isNaN(orderId)) {
    return res.status(400).send({ "error": "invalid orderId" });
  }
  try {
    await deleteOrder(orderId);
  } catch (err) {
    console.error(err);
    if (err instanceof TargetNotFound) {
      return res.status(404).send({ "error": "order not found" });
    }
    if (err instanceof TargetNotEligible) {
      return res.status(403).send({ "error": "haven't finished eating yet" });
    }
    return res.status(500).send({ "error": "internal server error" });
  }
  return res.status(200).send({"data": {"orderId": orderId}});
}
