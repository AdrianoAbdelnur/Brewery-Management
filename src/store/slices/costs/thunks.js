import { clientAxios } from "../../../api/ClientAxios"
import { addCost, getCosts } from "./costsSlice"



export const getAllCosts = (startDate, endDate) => {
    return async(dispatch) => {
        try {
            let costs = []
            const {data} = await clientAxios("/cost/getCosts", {params : {startDate, endDate}})
            costs = data.filteredCosts.reverse()
            dispatch(getCosts({costs}))
        } catch (error) {
            console.log(error)
        }
    }
}

export const addNewCost = (costData) => {
    return async(dispatch) => {
        try {
            const {data} = await clientAxios.post('/cost/addNewCost', costData)
            console.log({...costData, date: data.newCost.date, _id: data.newCost._id})
            dispatch(addCost({newCost: {...costData, date: data.newCost.date, _id: data.newCost._id}}))
        } catch (error) {
            console.log(error)
        }
    }
}