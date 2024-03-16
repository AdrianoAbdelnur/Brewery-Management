import { clientAxios } from "../../../api/ClientAxios"
import { addSale } from "./salesSlice"



export const addNewSale = (startDate, endDate) => {
    return async(dispatch) => {
        try {
            let sales = []
            const {data} = await clientAxios("/sale/getSales", {params : {startDate, endDate}})
            sales = data.filteredSales.reverse()
            dispatch(addSale({sales}))
        } catch (error) {
            console.log(error)
        }
    }
}