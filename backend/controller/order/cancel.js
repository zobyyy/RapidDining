import { TargetNotEligible, TargetNotFound, deleteOrder } from '../../model/orderList.js';

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * */
export async function orderCancel(req, res) {
  const phone = function () {
    try {
      return parseInt(atob(req.body.phone), 10);
    } catch (err) {
      return res.status(400).send({ "error": "invalid phone" });
    }
  }();
  if (typeof phone !== "number") {
    return phone;
  }
  if(phone < 900000000 || phone > 999999999) {
    return res.status(400).send({ "error": "invalid phone" });
  }

  const orderId = +req.params.orderId;
  if (Number.isNaN(orderId)) {
    return res.status(400).send({ "error": "invalid orderId" });
  }

  try {
    await deleteOrder(orderId, phone);
    console.log(`order ${orderId} was removed by phone number ${phone}`);
    return res.status(200).send({ "data": { "orderId": orderId } });
  } catch (err) {
    if (err instanceof TargetNotFound) {
      return res.status(404).send({ "error": "order not found" });
    } else if (err instanceof TargetNotEligible) {
      return res.status(404).send({ "error": "order not found" });
    } else {
      console.error(`Error when canceling order ${orderId} with phone number ${phone}:`, err);
      return res.status(500).send({ "error": "internal server error" });
    }
  }
}
