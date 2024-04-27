import { clientAxios } from "../../../api/ClientAxios"
import { getSales } from "./salesSlice"



export const getAllSales = (startDate, endDate) => {
    return async(dispatch) => {
        try {
            let sales = []
            const {data} = await clientAxios("/sale/getSales", {params : {startDate, endDate}})
            sales = data.filteredSales.reverse()
            dispatch(getSales({sales}))
        } catch (error) {
            console.log(error)
        }
    }
}

export const updatePrice = (id, newPrice) => {
    return async(dispatch, getState) => {
        try {
            console.log(id, newPrice)
            const {data} = await clientAxios.patch('http://localhost:4000/api/sale/updatePrice', {id , price : newPrice})        
            console.log(data)
            if (data.message === 'Price updated') {        
                const {sales} = getState().sales
                const changedPrice = sales.map(sale => {
                    if (sale._id === id) {
                        return {...sale, price: newPrice}
                    }
                    return sale
                })
                dispatch(getSales({sales: changedPrice}))
            }
        } catch (error) {
            
        }
    }
}
