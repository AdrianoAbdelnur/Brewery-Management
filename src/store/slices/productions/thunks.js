import { cleanDigitSectionValue } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils"
import { clientAxios } from "../../../api/ClientAxios"
import { addProduction, getProductions, productionsMsg } from "./productionsSlice"


export const getAllProductions = () => {
    return async(dispatch) => {
        try {
            const {data} = await clientAxios("/production/getProductions")
            const dataSorted = data.filteredProduction.sort((a, b) => new Date(b.date).getTime() -new Date(a.date).getTime())
            dispatch(getProductions({ productions:  dataSorted}))
        } catch (error) {
            
        }
    }
}

export const addNewProduction = (production) => {
    return async(dispatch) => {
        try {
           const {data} = await clientAxios.post("/production/newProduction", {style: production.style._id , date:production.date})
            dispatch(addProduction({production : {_id: data.newProduction._id, style: production.style, date: data.newProduction.date }}))
            dispatch(productionsMsg({
                message: data.message, 
                type: "success"
            }))
        } catch (error) {
            
        }
    }
}