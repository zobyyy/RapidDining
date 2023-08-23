
import { hasOrder, changeOrdertoIn, changeOrdertoWait } from '../../model/reserveModel.js';

function ReqIsNumber(s) {
    return parseFloat(s).toString() !== "NaN";
}

export async function changeOrderStatus(req, res) {
    try {
        const { restaurantId, tableId, reservationId, phone } = req.body;
    
        if (!restaurantId || !phone || !phone.startsWith('09') || !ReqIsNumber(restaurantId)) {
            return res.status(400).json({ error: 'Wrong format in request body.' });
        }

        if ( ((!ReqIsNumber(tableId) && tableId !==null))) {
            return res.status(400).json({ error: 'Wrong format in tableId.' });
        }

        if ((!ReqIsNumber(reservationId) && reservationId !== null)) {
            return res.status(400).json({ error: 'Wrong format in reservationId.' });
        }
       
        const phoneNum = parseInt(phone, 10);

        if(phoneNum < 900000000 || phoneNum > 999999999) {
            return res.status(400).send({ "error": "invalid phone" });
          }
        
        const isOrdered = await hasOrder(restaurantId,phoneNum);

        if (!isOrdered) {
            return res.status(404).json({
                error: 'Phone not found in orderList.',
            });
        }

        if (tableId !== null) {
            const orderstatusIn = await changeOrdertoIn(restaurantId, phoneNum, tableId)
            console.log(orderstatusIn);
            if(orderstatusIn === null ){
                return res.status(404).json({ error: 'No data found' });
            }
            return res.status(200).json({ data: {orderId:orderstatusIn} })
        }

        if (reservationId !== null) {
            const orderstatusWait = await changeOrdertoWait(restaurantId, phoneNum, reservationId)
            console.log(orderstatusWait);
            if(orderstatusWait === null ){
                return res.status(404).json({ error: 'No data found' });
            }
            return res.status(200).json({ data: {orderId:orderstatusWait} })
        }

    } catch (error) {
        console.error('Error in tableCancel:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}