import { clientAxios } from "../../../api/ClientAxios";
import { getAllSales } from "../sales/thunks";
import { messageManager, newPay } from "./paySlice";



export const addNewPay = (pay) => {
    return async(dispatch, getState) => {     
        const updateSale = async (id, payload) => {
            try {
                console.log(payload)
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
        
        try {
            const { sales } = getState().sales
            const { data } = await clientAxios.post("/pay/newPay", pay)
            const payId = data.newPay._id
            let paid = data.newPay.pay;
            const salesFiltered = sales?.filter(sale => sale.customer._id === pay.customer && sale.paidComplete === false)
            console.log(salesFiltered)
            for (const sale of salesFiltered.reverse()) {
                if (paid > (sale.price - sale?.paid)) {
                    const payload = {
                        paid: sale.price,
                        paidComplete: true
                    }
                    console.log(payload, "1")
                    updateSale(sale._id, payload)
                    paid = paid - sale.price + sale?.paid
                } else if (paid < (sale.price - sale?.paid)) {
                    const payload = {
                        paid: paid + sale.paid
                    }
                    console.log(payload, "2")
                    updateSale(sale._id, payload)
                    paid = 0
                    updatePay(payId, { assigned: true })
                } else if (paid === (sale.price - sale?.paid)) {
                    const payload = {
                        paid: sale.price,
                        paidComplete: true
                    }
                    paid = 0
                    console.log(payload, "3")
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
            dispatch(getAllSales())

        } catch (error) {
            console.log(error)
            dispatch(messageManager({
                message: error.response.data.message,  
                type: "error"
        }))
    }
    }
}