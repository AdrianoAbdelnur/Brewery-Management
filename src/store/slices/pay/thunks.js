import { clientAxios } from "../../../api/ClientAxios";
import { messageManager, newPay } from "./paySlice";



export const addNewPay = (pay) => {
    return async(dispatch, getState) => {
        try {
            const { data } = await clientAxios.post("/pay/newPay", pay)
            const payId = data.newPay._id
            let paid = data.newPay.pay;
            const { sales } = getState().sales

            const updateSale = async (id, payload) => {
                try {
                    await clientAxios.put("http://localhost:4000/api/sale/updatePay/" + id, payload)
                } catch (error) {
                    console.log(error)
                    dispatch(messageManager({
                        message: error.response.data.message,  
                        type: "error"
                    }))
                }
            }
        
            const updatePay = async (id, payload) => {
                try {
                    const {data} = await clientAxios.put("http://localhost:4000/api/pay/updatePay/" + id, payload)
                } catch (error) {
                    dispatch(messageManager({
                        message: error.response.data.message, 
                        type: "error"
                    }))
                }
            }

            const salesFiltered = sales?.filter(sale => sale.customer._id === pay.customer && sale.paidComplete === false)
            for (const sale of salesFiltered.reverse()) {
                if (paid > (sale.price - sale?.paid)) {
                    const payload = {
                        paid: sale.price,
                        paidComplete: true
                    }
                    updateSale(sale._id, payload)
                    paid = paid - sale.price + sale?.paid
                } else if (paid < (sale.price - sale?.paid)) {
                    const payload = {
                        paid: paid + sale.paid
                    }
                    updateSale(sale._id, payload)
                    paid = 0
                    updatePay(payId, { assigned: true })
                } else if (paid === (sale.price - sale?.paid)) {
                    const payload = {
                        paid: sale.price,
                        paidComplete: true
                    }
                    paid = 0
                    updateSale(sale._id, payload)
                    updatePay(payId, { assigned: true })
                }
            }
            if (paid > 0) {
                updatePay(payId, { noAssignedPay: paid })
            }
        
            dispatch(newPay({pay}))
            dispatch(messageManager({
                message: data.message, 
                type: "success"
            }))
        } catch (error) {
            dispatch(messageManager({
                message: error.response.data.message,  
                type: "error"
        }))
    }
 
    }
}